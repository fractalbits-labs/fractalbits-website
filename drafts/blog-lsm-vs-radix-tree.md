# Hierarchical Paths Don't Belong in LSM Trees

Every S3 API call begins the same way: you hand the system a path like `/bucket/datasets/2024/train/batch_001.parquet`, and somewhere, a metadata engine must locate that object among billions. Simple in concept. Surprisingly hard to do well.

Most modern object storage systems use distributed key-value stores backed by RocksDB. Some newer systems avoid this problem by offloading metadata to external databases like FoundationDB (3FS and Tigris Data do this).

There are two common approaches to organizing metadata in LSM-backed stores, and both break down with path-structured keys. The **traditional full-path approach** stores complete paths as keys but wastes CPU comparing the same prefixes over and over. Directory renames are impossible—systems like CalvinFS just don't support them. The **inode-like approach** uses unique IDs for directories and files, which sounds better, but requires multiple sequential lookups per path and distributed transactions that kill scalability.

This post explains why LSM trees struggle with path-structured data, and how Fractal ART—our Adaptive Radix Tree—fixes these problems while keeping the full-path model.

---

## How LSM Trees Work

LSM trees organize data in a multi-level structure optimized for write-heavy workloads:

```
┌─────────────────────────────────────────────────────────────────┐
│                      LSM TREE STRUCTURE                         │
└─────────────────────────────────────────────────────────────────┘

  Memory:    ┌─────────────────────────────────────┐
             │            MemTable                 │  ← Active writes
             │    (Red-Black Tree / Skip List)     │
             └─────────────────────────────────────┘
                              │ flush
                              ▼
  Level 0:   ┌────────┐ ┌────────┐ ┌────────┐      ← Unsorted SSTables
             │SST-0-1 │ │SST-0-2 │ │SST-0-3 │        (may overlap)
             └────────┘ └────────┘ └────────┘
                              │ compaction
                              ▼
  Level 1:   ┌─────────────────────────────────┐   ← Sorted, non-overlapping
             │           SST-1-1               │
             └─────────────────────────────────┘
                              │ compaction
                              ▼
  Level 2:   ┌──────────────────────────────────────────────────┐
             │                    SST-2-1                       │
             └──────────────────────────────────────────────────┘

  Each level is ~10x larger than the previous
```

**Write path:** New writes go to an in-memory MemTable, then flush to Level 0 SSTables on disk. Background compaction merges and sorts SSTables into lower levels.

**Read path:** Queries check MemTable first, then each level's SSTables until the key is found. Bloom filters help skip files that don't contain the key. For each comparison, LSM trees must process keys byte-by-byte.

---

## Two Approaches to Object Storage Metadata

### Approach 1: Traditional Full-Path Indexing

In this model, each object is stored with its complete path as the key:

```
Key                           → Value (metadata + data location)
────────────────────────────────────────────────────────────────
/bucket/images/2024/photo.jpg → {size: 2MB, etag: "abc123", ...}
/bucket/images/2024/video.mp4 → {size: 50MB, etag: "def456", ...}
/bucket/images/2025/doc.pdf   → {size: 1MB, etag: "ghi789", ...}
```

**Why this breaks down in LSM trees:**

1. **Redundant prefix comparisons**: LSM trees compare entire path strings, byte by byte. Looking up `/bucket/images/2024/photo.jpg` means comparing it against `/bucket/images/2024/video.mp4`, re-processing the `/bucket/images/2024/` prefix every single time. Prefix compression helps storage, but doesn't help the CPU cost of comparisons during lookups.

2. **No atomic renames**: Renaming `/bucket/images/` to `/bucket/photos/` means rewriting every key with that prefix—potentially millions of objects. LSM trees can't do this atomically without rebuilding the tree. CalvinFS, a well-known distributed filesystem using full-path keys, just doesn't support atomic directory renames. You either can't rename directories, or you copy everything then delete the original.

**Pros:** Simple model, single lookup per object  
**Cons:** Inefficient key comparisons (must compare entire path), atomic directory rename nearly impossible

### Approach 2: Inode-Like (Node-Based) Indexing

This approach borrows from traditional filesystems—assign unique IDs (inodes) to directories and files:

```
Inode Table:
────────────────────────────────────────────────────────
inode=1 (dir)  : name="bucket",  parent=0,    children=[2]
inode=2 (dir)  : name="images",  parent=1,    children=[3,4]
inode=3 (dir)  : name="2024",    parent=2,    children=[5,6]
inode=4 (dir)  : name="2025",    parent=2,    children=[7]
inode=5 (file) : name="photo.jpg", parent=3,  data_loc=...
inode=6 (file) : name="video.mp4", parent=3,  data_loc=...
inode=7 (file) : name="doc.pdf",   parent=4,  data_loc=...
```

**Pros:** Natural directory operations, supports atomic renames (but expensive due to distributed transactions)  
**Cons:** Multiple lookups per path traversal, distributed transactions required for file creation and cross-directory renames

---

## Problem 1: Traditional Full-Path Approach + LSM Tree

### Inefficient Key Comparisons

With full paths as keys, every operation requires comparing potentially long strings:

```
┌─────────────────────────────────────────────────────────────────┐
│           KEY COMPARISON OVERHEAD IN LSM TREE                   │
└─────────────────────────────────────────────────────────────────┘

Typical object path: /production/data/2024/Q1/analytics/user_events/
                     region=us-west/date=2024-01-15/part-00001.parquet
                     ────────────────────────────────────────────────
                     ~90 bytes of path!

For a single point lookup:
┌────────────┐
│  MemTable  │  Binary search: O(log n) comparisons
│   10K keys │  Each comparison: up to 90 bytes
└────────────┘  
       ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│  L0 SST-1  │  │  L0 SST-2  │  │  L0 SST-3  │  
│   1K keys  │  │   1K keys  │  │   1K keys  │  
└────────────┘  └────────────┘  └────────────┘
  Each: O(log 1K) comparisons × 90 bytes
       ↓
┌─────────────────────────────────────────────┐
│              Level 1 (10K keys)             │
└─────────────────────────────────────────────┘
  O(log 10K) comparisons × 90 bytes
       ↓
     ... more levels ...

Total comparison bytes: O(path_length × log(n) × num_levels)
```

### Atomic Rename is Nearly Impossible

Consider renaming a directory `/bucket/old_name/` to `/bucket/new_name/`:

```
┌─────────────────────────────────────────────────────────────────┐
│              ATOMIC RENAME PROBLEM (Full-Path)                  │
└─────────────────────────────────────────────────────────────────┘

Before rename:
────────────────────────────────────────────────
/bucket/old_name/file1.txt    → metadata1
/bucket/old_name/file2.txt    → metadata2
/bucket/old_name/sub/file3.txt → metadata3
... (potentially millions of objects)

Required operations for rename:
────────────────────────────────────────────────
DELETE /bucket/old_name/file1.txt
INSERT /bucket/new_name/file1.txt → metadata1
DELETE /bucket/old_name/file2.txt
INSERT /bucket/new_name/file2.txt → metadata2
DELETE /bucket/old_name/sub/file3.txt
INSERT /bucket/new_name/sub/file3.txt → metadata3
... (millions of DELETEs + INSERTs)

Problems:
1. Cannot be atomic across distributed KV stores
2. O(n) operations where n = number of objects
3. Concurrent access during rename causes inconsistency
4. Rollback on failure is complex
```

---

## Problem 2: Inode-Like Approach + LSM Tree

The inode approach borrows from traditional filesystems. Each directory and file gets a unique ID (inode), with parent-child relationships maintaining the tree structure. This makes directory operations natural—but creates three major problems: **multi-round lookups** for path resolution, **distributed transactions** for file creation and renames, and **directory contention** under concurrent writes.

### Path Resolution Requires Multiple Lookups

```
┌─────────────────────────────────────────────────────────────────┐
│           PATH RESOLUTION IN INODE MODEL                        │
└─────────────────────────────────────────────────────────────────┘

Resolving: /bucket/images/2024/photo.jpg

Step 1: Lookup "bucket" in root
        ┌─────────┐
        │ KV GET  │ → inode=1
        └─────────┘

Step 2: Lookup "images" in inode=1's children  
        ┌─────────┐
        │ KV GET  │ → inode=2
        └─────────┘

Step 3: Lookup "2024" in inode=2's children
        ┌─────────┐
        │ KV GET  │ → inode=3
        └─────────┘

Step 4: Lookup "photo.jpg" in inode=3's children
        ┌─────────┐
        │ KV GET  │ → inode=5 (file metadata)
        └─────────┘

Total: 4 sequential KV lookups for a 4-level path!
```

### Directory Contention and Distributed Transactions

Directory contention is perhaps the most insidious problem. Modern cloud workloads—particularly ML training and analytics pipelines—frequently access deep object paths and update metadata concurrently. When thousands of workers write checkpoint files to the same directory, the inode holding that directory's metadata becomes a serialization point.

Worse, file creation requires updating two inodes atomically: the new file's inode and the parent directory's entry list. This means distributed transactions, with all the coordination overhead and failure complexity they bring.

```
┌─────────────────────────────────────────────────────────────────┐
│              CONCURRENCY PROBLEM (Inode Model)                  │
└─────────────────────────────────────────────────────────────────┘

Scenario: Hot directory /bucket/uploads/ receiving 10K writes/sec

                    ┌─────────────────┐
                    │  inode=100      │
                    │  "uploads" dir  │
                    │  children=[...] │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌─────────┐         ┌─────────┐         ┌─────────┐
   │ PUT f1  │         │ PUT f2  │         │ PUT f3  │
   └─────────┘         └─────────┘         └─────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
                    ┌─────────────────┐
                    │  UPDATE inode   │  ← Serialization point!
                    │    =100         │
                    │  (contention)   │
                    └─────────────────┘

Problems:
1. All writes to same directory contend for one inode
2. Each file creation = distributed transaction (file inode + dir entry)
3. Coordination overhead limits throughput
```

---

## The Solution: Fractal ART (Path-Based Splitting)

Here's our approach: Fractal ART, an on-disk radix tree that splits data based on path structure. It builds on the Adaptive Radix Tree (ART), originally designed for memory-efficient in-memory indexing.

### How Radix Trees Work

```
┌─────────────────────────────────────────────────────────────────┐
│                    RADIX TREE BASICS                            │
└─────────────────────────────────────────────────────────────────┘

Instead of comparing entire keys, traverse character-by-character:

Keys: /bucket/images/photo.jpg
      /bucket/images/video.mp4
      /bucket/docs/report.pdf

                        (root)
                           │
                      /bucket/
                           │
              ┌────────────┴────────────┐
              │                         │
           images/                    docs/
              │                         │
      ┌───────┴───────┐            report.pdf
      │               │                 │
   photo.jpg      video.mp4        [metadata]
      │               │
  [metadata]     [metadata]

Key insight: Common prefixes are stored ONCE, not repeated!
```

### Adaptive Radix Tree (ART) Node Types

ART uses different node sizes to balance memory efficiency and performance:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ART NODE TYPES                               │
└─────────────────────────────────────────────────────────────────┘

Node4:   For 1-4 children (most nodes!)
         ┌─────────────────────────────────────────┐
         │ keys:     [a][b][c][_]                  │  4 bytes
         │ children: [→][→][→][_]                  │  4 pointers
         └─────────────────────────────────────────┘

Node16:  For 5-16 children
         ┌─────────────────────────────────────────┐
         │ keys:     [a][b][c][d]...[p]            │  16 bytes
         │ children: [→][→][→][→]...[→]            │  16 pointers
         └─────────────────────────────────────────┘
         (Uses SIMD for parallel key comparison)

Node48:  For 17-48 children
         ┌─────────────────────────────────────────┐
         │ index:    [_][_][2][_][_][1]...[0]...   │  256 bytes
         │ children: [→][→][→]...                  │  48 pointers
         └─────────────────────────────────────────┘
         (index[char] gives child slot)

Node256: For 49-256 children
         ┌─────────────────────────────────────────┐
         │ children: [→][→][_][→]...               │  256 pointers
         └─────────────────────────────────────────┘
         (Direct indexing: children[char])
```

### Our Solution: Fractal ART (Adaptive Radix Tree)

Fractal ART is also a full-path approach—we store complete paths as keys—but the tree structure exploits hierarchical data to eliminate redundant prefix processing and enable atomic renames.

The key idea: split the tree into disk-resident blobs based on path structure. Each blob can contain both **leaf nodes** (object metadata) and **references to child blobs** for subtrees that have grown large:

```
┌─────────────────────────────────────────────────────────────────┐
│              PATH-BASED BLOB SPLITTING                          │
└─────────────────────────────────────────────────────────────────┘

Tree Structure (logical):
                        (root)
                           │
                      /bucket/
                           │
              ┌────────────┴────────────┬──────────────┐
              │                         │              │
           images/                    docs/         logs/
              │                         │              │
      ┌───────┴───────┐            report.pdf      app.log
      │               │
    2024/           2025/
      │               │
   [files]         [files]


Blob Layout (physical) - 2 blobs:

┌─────────────────────────────────────────────────────────────────┐
│ BLOB 1: Root blob                                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ (root) ─── /bucket/ ─┬─ images/ ──→ [BLOB_REF: blob_2]      │ │
│ │                      │                                      │ │
│ │                      ├─ docs/ ───→ report.pdf → [metadata]  │ │
│ │                      │                                      │ │
│ │                      └─ logs/ ───→ app.log ───→ [metadata]  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Note: docs/ and logs/ are small, so they stay in root blob     │
│        images/ is large, so it splits into its own blob         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BLOB 2: /bucket/images/ subtree (split out when it grew large)  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ (root) ───┬─ 2024/ ─┬─ photo1.jpg ──→ [metadata]            │ │
│ │           │         ├─ photo2.jpg ──→ [metadata]            │ │
│ │           │         └─ video.mp4 ───→ [metadata]            │ │
│ │           │                                                 │ │
│ │           └─ 2025/ ─┬─ img001.png ──→ [metadata]            │ │
│ │                     └─ img002.png ──→ [metadata]            │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Key insight: Blobs split adaptively based on size, keeping related 
paths together while bounding I/O per operation.
```

### Why This Solves Both Problems

#### Advantage 1: Efficient Key Processing (vs Full-Path)

```
┌─────────────────────────────────────────────────────────────────┐
│           LOOKUP: /bucket/images/2024/photo.jpg                 │
└─────────────────────────────────────────────────────────────────┘

LSM Tree (Full-Path):
────────────────────────────────────────────────
  Compare "/bucket/images/2024/photo.jpg" with each key
  → O(path_length) per comparison
  → O(path_length × log(n)) total

On-Disk Radix Tree:
────────────────────────────────────────────────
  1. Read root blob, traverse: /bucket/ → images/
     Single byte comparisons, find BLOB_REF to blob_2
     
  2. Read blob_2, traverse: 2024/ → photo.jpg
     Direct node indexing, find metadata
     
  Total: 2 blob reads, O(path_length) character traversals
  
  Key insight: Just byte lookups via node indexing!
```

#### Advantage 2: Atomic Rename (vs Full-Path)

```
┌─────────────────────────────────────────────────────────────────┐
│              ATOMIC RENAME WITH RADIX TREE                      │
└─────────────────────────────────────────────────────────────────┘

Rename /bucket/old_name/ to /bucket/new_name/:

Before:
                    (root blob)
                         │
                    /bucket/
                         │
         ┌───────────────┼───────────────┐
         │               │               │
     old_name/        other/         another/
         │
    [BLOB_REF: blob_X]  ← Points to entire subtree!


After (SINGLE POINTER UPDATE):
                    (root blob)
                         │
                    /bucket/
                         │
         ┌───────────────┼───────────────┐
         │               │               │
     new_name/        other/         another/
         │
    [BLOB_REF: blob_X]  ← Same blob, just renamed edge!


Total operations: 1 (update edge label in parent blob)
Atomicity: Single blob write = atomic!

Compare to LSM: millions of DELETE + INSERT operations
```

#### Advantage 3: Scalable Directory Operations (vs Inode)

```
┌─────────────────────────────────────────────────────────────────┐
│              SCALABLE DIRECTORY OPERATIONS                      │
└─────────────────────────────────────────────────────────────────┘

Hot directory: /bucket/uploads/ with 10K writes/sec

Inode Model:
────────────────────────────────────────────────
  All writes contend for directory inode lock
  → Serialization point, max throughput limited

Radix Tree Model:
────────────────────────────────────────────────
  When /bucket/uploads/ blob grows large, it splits:
  
     uploads/ ─┬─ a-m/ ──→ [BLOB_REF: blob_A]
               └─ n-z/ ──→ [BLOB_REF: blob_B]
     
  Writes to "apple.txt" and "zebra.txt" now go to different blobs.
  Each blob can be updated independently—no global lock needed.
```

#### Advantage 4: Fewer I/O Operations for Path Resolution

In inode systems, inodes are typically range-partitioned and may be distributed across different servers, requiring network round-trips. In Fractal ART, blobs are prefix-partitioned—so related blobs are likely on the same server, and paths with common prefixes stay together, and this gives excellent locality.

```
┌─────────────────────────────────────────────────────────────────┐
│              OPTIMIZED PATH RESOLUTION                          │
└─────────────────────────────────────────────────────────────────┘

Path: /bucket/images/2024/january/photo.jpg

Inode Model: 5 KV lookups (one per path component)
────────────────────────────────────────────────

Radix Tree:
────────────────────────────────────────────────

  Blob 1 (root): /bucket/ → images/ → [BLOB_REF: blob_2]
  
  Blob 2: 2024/ → january/ → photo.jpg → [metadata]
  
  Total: 2 blob reads!
  
  Key insight: Blob boundaries follow path structure,
               so related data stays together.
```

---

## Summary: Why Radix Trees Win for Object Storage

| Operation | Traditional Full-Path + LSM | Inode + LSM | Fractal ART |
|-----------|-----------------|-------------|---------------------|
| Point Lookup | Compares full path strings repeatedly | Multiple sequential lookups per path | Single traversal, byte-level indexing |
| Directory Rename | Must rewrite all keys—not atomic | Needs distributed transaction | Single atomic pointer update |
| List Prefix | Range scan with iterator merging | Multiple lookups, potential contention | Direct child enumeration |
| Hot Directory | N/A (no directory concept) | All writes serialize on one inode | Splits into multiple blobs |
| Write Scalability | Good | Poor (needs transactions) | Good (independent blobs) |

---

## Conclusion

LSM trees are great general-purpose data structures, but they're a bad fit for object storage paths. The problem: LSM trees treat keys as opaque byte strings, but object paths have hierarchical structure.

Fractal ART uses this structure. By splitting blobs along path boundaries, we get:

1. **Efficient lookups** without full-key comparisons
2. **Atomic renames** with single-pointer updates  
3. **Scalable concurrency** without contention on hot directories
4. **Natural directory operations** without multiple round-trips

If you're building object storage that needs to handle hierarchical paths at scale, consider path-aware data structures instead of LSM trees.

**Want to see atomic renames in action?** Check out our [atomic rename demo](https://github.com/fractalbits-labs/fractalbits/blob/main/crates/fractal-s3/demo/atomic_rename_demo.sh) showing how directory renames work at any scale without rewriting keys.

---

*This describes the metadata engine behind FractalBits, our S3-compatible object storage system. More technical details on Fractal ART coming soon.*
