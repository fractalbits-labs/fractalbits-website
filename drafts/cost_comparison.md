# Cost Evaluation for High-Performance Workloads

## Executive Summary

FractalBits delivers **S3-compatible object storage** optimized for **small object workloads**, where per-request pricing models like S3 Express One Zone become prohibitively expensive at scale. By using a fixed infrastructure model, FractalBits provides predictable costs with performance that matches or exceeds S3 Express One Zone. The system scales horizontally by adding metadata and data nodes as needed.

**Key Advantages (for 4KB object workloads):**
- Up to **~150X cost reduction** for PUT-intensive workloads
- Up to **~15X cost reduction** for GET-intensive workloads
- **250K PUT IOPS / 1M GET IOPS** for 4KB objects
- ~5ms average latency
- Native directory rename support (unavailable in S3)

---

## The Numbers: Real Cost Comparison

### Infrastructure Investment

| Component | Instance Type | Monthly Cost | Key Metrics |
|-----------|---------------|--------------|-------------|
| Data Layer (BSS) | i8g.2xlarge | $345* | 1,875 GB raw NVMe, ~625 GB effective (3x replication) |
| Metadata Layer (NSS) | m7gd.4xlarge + EBS Journal | $1,040* | 64 GiB memory, 950 GB NVMe cache + EBS Journal for metadata |
| API Layer | c8g.xlarge | $75* | 4 vCPUs, Graviton4 |

*Based on 1-year reserved instance pricing (us-west-2). For instance types without reserved pricing, we use ~70% of on-demand price as approximation.*

---

### Reference Architecture: 6-Node BSS Cluster

A typical production deployment with 6 BSS instances delivers exceptional performance at predictable cost:

| Component | Count | Instance Type | Monthly Cost |
|-----------|-------|---------------|--------------|
| Data Layer (BSS) | 6 | i8g.2xlarge | $2,070 |
| Metadata Layer (NSS) | 1 | m7gd.4xlarge + EBS Journal | $1,040 |
| API Layer | 14 | c8g.xlarge | $1,050 |
| **Total** | | | **~$4,160** |

**Performance Delivered:**
- **250,000 PUT IOPS** (4KB objects)
- **1,000,000 GET IOPS** (4KB objects)  
- **Average latency: ~5ms**

---

### Performance Cost Analysis

For sustained **4KB object** workloads at 10K IOPS (where FractalBits excels):

| Metric | S3 Express One Zone | FractalBits | Reduction |
|--------|---------------------|-------------|-----------|
| Monthly Cost for 10K PUT/s (4KB) | ~$29,290 | ~$166 | **~150X** |
| Monthly Cost for 10K GET/s (4KB) | ~$778 | ~$42 | **~15X** |
| Storage (1 TB/month) | ~$110 | $0 (included) | **Bundled** |

**S3 Express One Zone pricing (as of April 2025):**
- PUT: $0.00113 per 1,000 requests
- GET: $0.00003 per 1,000 requests
- Storage: $0.11 per GB/month
- Data upload: $0.0032 per GB (not included in comparison)
- Data retrieval: $0.0006 per GB (not included in comparison)

*FractalBits costs estimated using 1-year reserved instance pricing for required compute. Your savings will vary based on workload, but the magnitude is indicative. Note: S3 Express One Zone data upload and retrieval fees are not counted in the comparison above, making the actual cost difference even larger.*

---

### Cost Calculation Methodology

*All calculations based on 4KB object workloads*

**S3 Express One Zone (per-request model):**
```
Requests per month at 10,000/s = 10,000 × 86,400 × 30 = 25,920,000,000

PUT cost: 25,920,000,000 ÷ 1,000 × $0.00113 = $29,289.60/month
GET cost: 25,920,000,000 ÷ 1,000 × $0.00003 = $777.60/month
```

**FractalBits (IOPS-based model):**
```
6-BSS cluster: ~$4,160/month
Performance: 250K PUT IOPS, 1M GET IOPS

Cost for 10K PUT/s: $4,160 × (10K / 250K) = ~$166/month
Cost for 10K GET/s: $4,160 × (10K / 1M) = ~$42/month
```
