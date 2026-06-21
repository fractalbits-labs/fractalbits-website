export const languages = {
  en: "English",
  zh: "中文",
};

export const defaultLang = "en";

export const ui = {
  en: {
    // Site
    "site.title": "FractalBits - High-Performance S3-Compatible Object Storage",
    "site.description":
      "High-Performance S3-Compatible Object Storage. Over 1.3 Million Object/s with P99 latency ~3ms.",
    "site.brand": "FractalBits",
    "site.tagline":
      "High-performance, S3-compatible object storage for the AI era.",

    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.docs": "Docs",
    "nav.github": "GitHub",

    // Hero
    "hero.badge": "GitHub",
    "hero.title.prefix": "High-performance",
    "hero.title.highlight": "S3-compatible",
    "hero.title.suffix": "object storage",
    "hero.description":
      "Over <strong>1.3 Million Object/s</strong> with ~3 ms P99 latency and native <strong>atomic rename</strong>. Deploys to your own AWS or GCP account in <strong>under 5 minutes</strong>.",
    "hero.stat.iops": "Object/s (4 KiB GET)",
    "hero.stat.latency": "P99 latency",
    "hero.stat.deploy": "BYOC deploy",
    "hero.cta.start": "Get Started",
    "hero.cta.docs": "Read the Docs",

    // Features
    "features.eyebrow": "Why FractalBits",
    "features.title": "Built for Performance",
    "features.description":
      "FractalBits pairs a modern storage architecture with low-level systems engineering to outperform AWS S3 Express One Zone — at a much lower cost.",
    "features.iops.title": "1.3M+ Object/s",
    "features.iops.description":
      "Over 1.3M 4 KiB reads/s at ~3ms P99 — built for AI training and data analytics.",
    "features.atomic.title": "Fractal ART Metadata Engine",
    "features.atomic.description":
      "Full-path design skips the distributed transactions of inode-based systems — scalable, with full directory semantics and atomic rename.",
    "features.protocol.title": "Multi-Protocol Access",
    "features.protocol.description":
      "One backend, many interfaces — the same data over S3 object API and POSIX file system, with more protocols coming.",
    "features.storage.title": "NVMe-Native Data Engine",
    "features.storage.description":
      "SSD-optimized data engine with a low-overhead I/O path that scales directly with your NVMe hardware — no EBS required.",
    "features.scale.title": "Linear Scale-Out",
    "features.scale.description":
      "Outgrow a single node? Add metadata and data nodes to scale throughput and capacity near-linearly — no re-architecting.",
    "features.byoc.title": "5-Minute BYOC",
    "features.byoc.description":
      "Deploy to any AWS or GCP region with a single command — running in under 5 minutes.",
    "features.powered": "Powered by",
    "features.rust": "Rust",
    "features.rust.desc": "Protocol & Control Plane",
    "features.iouring": "io_uring",
    "features.iouring.desc": "Async I/O & Data Plane",
    "features.art": "Fractal ART",
    "features.art.desc": "Metadata & Data Engine",

    // Use Cases
    "usecases.eyebrow": "Use Cases",
    "usecases.title": "Built for Demanding Workloads",
    "usecases.description":
      "Wherever small objects, low latency, and atomic operations decide whether infrastructure keeps up — FractalBits is designed for it.",
    "usecases.ai.title": "AI / ML Training & Checkpointing",
    "usecases.ai.problem":
      "GPUs sit idle when data loaders can't keep up, and non-atomic checkpoint writes risk corrupt restarts.",
    "usecases.ai.solution":
      "Millions of small reads per second keep accelerators fed, while native atomic rename commits checkpoints and swaps dataset versions instantly — reachable over S3 or POSIX.",
    "usecases.ai.stat1": "1.3M",
    "usecases.ai.stat1label": "reads/s for data loaders",
    "usecases.ai.stat2": "Atomic",
    "usecases.ai.stat2label": "checkpoint & dataset commits",
    "usecases.analytics.title": "Data Analytics & Lakehouse",
    "usecases.analytics.problem":
      "Query engines over Parquet and Iceberg-style tables fire huge numbers of small ranged GETs — object-store latency becomes the bottleneck.",
    "usecases.analytics.solution":
      "~3 ms P99 on 4 KiB objects with deep concurrency cuts scan times, and atomic directory rename makes table compaction and commits safe.",
    "usecases.analytics.stat1": "~3ms",
    "usecases.analytics.stat1label": "P99 on 4 KiB objects",
    "usecases.analytics.stat2": "Atomic",
    "usecases.analytics.stat2label": "table compaction & commits",
    "usecases.metadata.title": "Metadata-Heavy & Small-Object Workloads",
    "usecases.metadata.problem":
      "Billions of tiny objects and deep prefixes overwhelm inode-based metadata with heavy distributed transactions.",
    "usecases.metadata.solution":
      "The full-path Fractal ART metadata engine does single-pass lookups — millions of operations per second from a single metadata node, with real directory semantics.",
    "usecases.metadata.stat1": "1.3M",
    "usecases.metadata.stat1label": "ops/s from one metadata node",
    "usecases.metadata.stat2": "Full-path",
    "usecases.metadata.stat2label": "single-pass, real directories",
    "usecases.cost.title": "Cost-Efficient S3 Express Alternative",
    "usecases.cost.problem":
      "S3 Express One Zone delivers low latency, but at high cost and locked to AWS.",
    "usecases.cost.solution":
      "Match or beat that performance at a fraction of the cost — over 100× lower cost per small-object write — deployed into your own AWS or GCP account in minutes, with no EBS.",
    "usecases.cost.stat1": "100×",
    "usecases.cost.stat1label": "lower small-object write cost vs S3 Express One Zone",
    "usecases.cost.stat2": "<5 min",
    "usecases.cost.stat2label": "BYOC to your AWS / GCP",

    // Benchmarks
    "benchmarks.eyebrow": "Benchmarks",
    "benchmarks.title": "Measured, Not Promised",
    "benchmarks.description":
      "Real numbers from a real cloud deployment — and you can reproduce every one of them with a BYOC deployment of your own.",
    "benchmarks.get": "GET Workload",
    "benchmarks.put": "PUT Workload",
    "benchmarks.iops": "Object/s",
    "benchmarks.throughput": "Throughput",
    "benchmarks.avgLatency": "Avg Latency",
    "benchmarks.p99Latency": "P99 Latency",
    "benchmarks.config": "Benchmark Configuration",
    "benchmarks.objectSize": "Object Size",
    "benchmarks.apiServers": "API Servers",
    "benchmarks.bssNodes": "BSS Nodes",
    "benchmarks.nssNode": "NSS Node",
    "benchmarks.region": "Region",
    "benchmarks.replication": "Replication",
    "benchmarks.singleNode":
      "All of the above is served by a single metadata node holding hundreds of millions of objects — a direct measure of the Fractal ART engine's efficiency. Need more? Scale out horizontally by adding metadata and data nodes.",
    "benchmarks.cta": "Run your own benchmarks with BYOC",

    // Documentation Section
    "docs.eyebrow": "Resources",
    "docs.title": "Documentation",
    "docs.description":
      "Everything you need to get started and understand how FractalBits works.",
    "docs.architecture": "Architecture",
    "docs.architecture.desc":
      "Deep dive into the system architecture, components, and design decisions.",
    "docs.s3api": "S3 API Compatibility",
    "docs.s3api.desc":
      "Supported operations, extensions, authentication, and limitations.",
    "docs.roadmap": "Roadmap",
    "docs.roadmap.desc": "Planned features and future development direction.",

    // CTA Section
    "cta.title": "See the performance for yourself",
    "cta.description":
      "Deploy FractalBits to your AWS or GCP account in under 5 minutes and run your own benchmarks.",
    "cta.github": "View on GitHub",
    "cta.community": "Join the Community",
    "cta.enterprise": "Contact us:",

    // Footer
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.benchmarks": "Benchmarks",
    "footer.blog": "Blog",
    "footer.resources": "Resources",
    "footer.documentation": "Documentation",
    "footer.architecture": "Architecture",
    "footer.s3api": "S3 API Compatibility",
    "footer.roadmap": "Roadmap",
    "footer.community": "Community",
    "footer.github": "GitHub",
    "footer.discord": "Discord",
    "footer.discussions": "Discussions",
    "footer.copyright": "FractalBits.",

    // Blog
    "blog.title": "Blog",
    "blog.pageTitle": "Blog | FractalBits",
    "blog.description":
      "Technical articles about high-performance object storage, system design, and engineering insights from the FractalBits team.",
    "blog.empty": "No posts yet. Check back soon!",
    "blog.readMore": "Read more",
  },
  zh: {
    // Site
    "site.title": "分形智存 - 面向 AI 时代的高速对象存储",
    "site.description":
      "面向 AI 时代的高速对象存储。超过 130 万 Object/s，P99 延迟约 3ms。",
    "site.brand": "分形智存",
    "site.tagline": "面向 AI 时代的高速对象存储。",

    // Navigation
    "nav.home": "首页",
    "nav.blog": "博客",
    "nav.docs": "文档",
    "nav.github": "GitHub",

    // Hero
    "hero.badge": "GitHub",
    "hero.title.prefix": "面向 AI 时代的",
    "hero.title.highlight": "高性能",
    "hero.title.suffix": "对象存储",
    "hero.description":
      "超过 <strong>130 万 Object/s</strong>，P99 延迟约 3ms，原生支持 <strong>原子重命名</strong>。<strong>5 分钟</strong> 部署到您自己的 AWS 或 GCP 账户。",
    "hero.stat.iops": "Object/s (4 KiB GET)",
    "hero.stat.latency": "P99 延迟",
    "hero.stat.deploy": "BYOC 部署",
    "hero.cta.start": "快速开始",
    "hero.cta.docs": "查看文档",

    // Features
    "features.eyebrow": "为什么选择分形智存",
    "features.title": "为性能而生",
    "features.description":
      "FractalBits 融合前沿技术，提供超越 AWS S3 Express One Zone 的卓越性能，同时成本更低。",
    "features.iops.title": "130 万+ Object/s",
    "features.iops.description":
      "4 KiB 对象读取超过 130 万/秒，P99 延迟约 3ms——专为 AI 训练与数据分析而生。",
    "features.atomic.title": "Fractal ART 元数据引擎",
    "features.atomic.description":
      "全路径设计避免了传统 inode 系统的繁重分布式事务——高可扩展，且具备完整目录语义与原子重命名。",
    "features.protocol.title": "多协议访问",
    "features.protocol.description":
      "一套后端，多种接口——同一份数据可经 S3 对象 API 与 POSIX 文件系统访问，更多协议正在路上。",
    "features.storage.title": "NVMe 原生数据引擎",
    "features.storage.description":
      "针对 SSD 优化的数据引擎，I/O 路径开销极低，性能随 NVMe 硬件线性扩展——无需 EBS。",
    "features.scale.title": "线性横向扩展",
    "features.scale.description":
      "超出单节点？增加元数据与数据节点即可近线性扩展吞吐与容量——无需重构架构。",
    "features.byoc.title": "5 分钟 BYOC",
    "features.byoc.description":
      "一条命令部署到任意 AWS 或 GCP 区域——5 分钟内即可运行。",
    "features.powered": "技术栈",
    "features.rust": "Rust",
    "features.rust.desc": "协议与控制平面",
    "features.iouring": "io_uring",
    "features.iouring.desc": "异步 I/O 与数据平面",
    "features.art": "Fractal ART",
    "features.art.desc": "元数据与数据引擎",

    // Use Cases
    "usecases.eyebrow": "应用场景",
    "usecases.title": "为高要求工作负载而生",
    "usecases.description":
      "凡是由小对象、低延迟与原子操作决定基础设施能否跟得上的场景，正是 FractalBits 的用武之地。",
    "usecases.ai.title": "AI / ML 训练与检查点",
    "usecases.ai.problem":
      "数据加载跟不上时 GPU 闲置，而非原子的检查点写入则可能导致恢复时数据损坏。",
    "usecases.ai.solution":
      "每秒数百万次小对象读取持续喂饱加速器；原生原子重命名可瞬间提交检查点、切换数据集版本——并可经 S3 或 POSIX 访问。",
    "usecases.ai.stat1": "1.3M",
    "usecases.ai.stat1label": "数据加载读取/秒",
    "usecases.ai.stat2": "原子",
    "usecases.ai.stat2label": "检查点与数据集提交",
    "usecases.analytics.title": "数据分析与湖仓",
    "usecases.analytics.problem":
      "针对 Parquet、Iceberg 类表格的查询引擎会发起海量小范围 GET——对象存储延迟成为瓶颈。",
    "usecases.analytics.solution":
      "4 KiB 对象 ~3ms P99 配合高并发显著缩短扫描时间，原子目录重命名让表压缩与提交更安全。",
    "usecases.analytics.stat1": "~3ms",
    "usecases.analytics.stat1label": "4 KiB 对象 P99",
    "usecases.analytics.stat2": "原子",
    "usecases.analytics.stat2label": "表压缩与提交",
    "usecases.metadata.title": "元数据密集与小对象负载",
    "usecases.metadata.problem":
      "数十亿微小对象与深层路径，让基于 inode 的元数据陷入繁重的分布式事务。",
    "usecases.metadata.solution":
      "全路径 Fractal ART 元数据引擎采用单次查找——单个元数据节点即可支撑每秒数百万次操作，并具备真正的目录语义。",
    "usecases.metadata.stat1": "1.3M",
    "usecases.metadata.stat1label": "单元数据节点 ops/秒",
    "usecases.metadata.stat2": "全路径",
    "usecases.metadata.stat2label": "单次查找，真实目录",
    "usecases.cost.title": "高性价比的 S3 Express 替代方案",
    "usecases.cost.problem":
      "S3 Express One Zone 虽延迟低，但成本高且绑定 AWS。",
    "usecases.cost.solution":
      "以一小部分成本媲美甚至超越其性能——小对象写入成本低 100 倍以上——数分钟内部署到您自己的 AWS 或 GCP 账户，且无需 EBS。",
    "usecases.cost.stat1": "100×",
    "usecases.cost.stat1label": "小对象写入成本 vs S3 Express One Zone",
    "usecases.cost.stat2": "<5 分钟",
    "usecases.cost.stat2label": "BYOC 部署到 AWS / GCP",

    // Benchmarks
    "benchmarks.eyebrow": "基准测试",
    "benchmarks.title": "性能基准测试",
    "benchmarks.description":
      "性能来自于真实云部署系统（AWS/GCP）。您可以自行部署(BYOC)来验证这些结果。",
    "benchmarks.get": "GET 工作负载",
    "benchmarks.put": "PUT 工作负载",
    "benchmarks.iops": "Object/s",
    "benchmarks.throughput": "吞吐量",
    "benchmarks.avgLatency": "平均延迟",
    "benchmarks.p99Latency": "P99 延迟",
    "benchmarks.config": "基准测试配置",
    "benchmarks.objectSize": "对象大小",
    "benchmarks.apiServers": "API 服务器",
    "benchmarks.bssNodes": "BSS 节点",
    "benchmarks.nssNode": "NSS 节点",
    "benchmarks.region": "区域",
    "benchmarks.replication": "复制策略",
    "benchmarks.singleNode":
      "以上全部由单个承载数亿对象的元数据节点提供——这正是 Fractal ART 引擎效率的直接体现。需要更高规模？增加元数据与数据节点即可横向扩展。",
    "benchmarks.cta": "使用 BYOC 运行您自己的基准测试",

    // Documentation Section
    "docs.eyebrow": "资源",
    "docs.title": "文档",
    "docs.description": "开始使用和了解 FractalBits 工作原理所需的一切。",
    "docs.architecture": "系统架构",
    "docs.architecture.desc": "深入了解系统架构、组件和设计决策。",
    "docs.s3api": "S3 API 兼容性",
    "docs.s3api.desc": "支持的操作、扩展、认证和限制。",
    "docs.roadmap": "路线图",
    "docs.roadmap.desc": "计划中的功能和未来发展方向。",

    // CTA Section
    "cta.title": "准备体验超快对象存储？",
    "cta.description":
      "5 分钟内将 FractalBits 部署到您的 AWS 或 GCP 账户，亲自体验其性能。",
    "cta.github": "在 GitHub 上查看",
    "cta.community": "加入社区",
    "cta.enterprise": "联系我们：",

    // Footer
    "footer.product": "产品",
    "footer.features": "功能特性",
    "footer.benchmarks": "性能测试",
    "footer.blog": "博客",
    "footer.resources": "资源",
    "footer.documentation": "文档",
    "footer.architecture": "系统架构",
    "footer.s3api": "S3 API 兼容性",
    "footer.roadmap": "路线图",
    "footer.community": "社区",
    "footer.github": "GitHub",
    "footer.discord": "Discord",
    "footer.discussions": "讨论区",
    "footer.copyright": "分形智存",

    // Blog
    "blog.title": "博客",
    "blog.pageTitle": "博客 | 分形智存",
    "blog.description":
      "来自 FractalBits 团队的高性能对象存储、系统设计和工程洞察的技术文章。",
    "blog.empty": "暂无文章，请稍后再来！",
    "blog.readMore": "阅读更多",
  },
} as const;
