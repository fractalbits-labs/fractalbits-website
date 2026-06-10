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
      "High-Performance S3-Compatible Object Storage. Up to 1 Million Object/s with P99 latency ~5ms.",
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
      "Up to <strong>1 Million Object/s</strong> with ~5 ms P99 latency and native <strong>atomic rename</strong>. Deploys to your own AWS account in <strong>under 5 minutes</strong>.",
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
    "features.iops.title": "~1M Object/s",
    "features.iops.description":
      "Achieve up to 1 Million 4 KiB object reads per second with P99 latency around 5ms. Built for demanding workloads like AI training and data analytics.",
    "features.atomic.title": "Atomic Rename",
    "features.atomic.description":
      "Native atomic rename support for both objects and directories. A capability standard S3 lacks, essential for managing datasets and checkpoints.",
    "features.storage.title": "Two-Tier Storage",
    "features.storage.description":
      "NVMe SSD tier for hot small objects with single-digit millisecond latency, S3 backend tier for larger objects to optimize costs.",
    "features.byoc.title": "5-Minute BYOC",
    "features.byoc.description":
      "Deploy to any AWS region with a single command. Bring Your Own Cloud deployment gets you running in under 5 minutes.",
    "features.powered": "Powered by",
    "features.rust": "Rust",
    "features.rust.desc": "Control Plane",
    "features.zig": "Zig",
    "features.zig.desc": "Data Plane",
    "features.iouring": "io_uring",
    "features.iouring.desc": "Async I/O",
    "features.art": "Fractal ART",
    "features.art.desc": "Metadata & Data Engine",

    // Benchmarks
    "benchmarks.eyebrow": "Benchmarks",
    "benchmarks.title": "Measured, Not Promised",
    "benchmarks.description":
      "Real numbers from a real AWS deployment — and you can reproduce every one of them with a BYOC deployment of your own.",
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
      "Deploy FractalBits to your AWS account in under 5 minutes and run your own benchmarks.",
    "cta.github": "View on GitHub",
    "cta.community": "Join the Community",
    "cta.enterprise": "Enterprise inquiries:",

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
    "footer.slack": "Slack",
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
      "面向 AI 时代的高速对象存储。高达 100 万 Object/s，P99 延迟约 5ms。",
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
      "高达 <strong>100 万 Object/s</strong>，P99 延迟约 5ms，原生支持 <strong>原子重命名</strong>。<strong>5 分钟</strong> 部署到您自己的 AWS 账户。",
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
    "features.iops.title": "~100 万 Object/s",
    "features.iops.description":
      "4 KiB 对象读取高达 100 万 Object/s，P99 延迟约 5ms。专为 AI 训练和数据分析等高要求工作负载而构建。",
    "features.atomic.title": "原子重命名",
    "features.atomic.description":
      "原生支持对象和目录的原子重命名操作。这是标准 S3 所缺乏的关键能力，对于管理数据集和检查点至关重要。",
    "features.storage.title": "分层存储",
    "features.storage.description":
      "NVMe SSD 层用于热点小文件对象，提供个位数毫秒延迟；S3 后端层用于大对象，优化成本。",
    "features.byoc.title": "5 分钟 BYOC",
    "features.byoc.description":
      "一条命令部署到任意 AWS 区域。自带云 (Bring Your Own Cloud) 部署让您 5 分钟内即可运行。",
    "features.powered": "技术栈",
    "features.rust": "Rust",
    "features.rust.desc": "控制平面",
    "features.zig": "Zig",
    "features.zig.desc": "数据平面",
    "features.iouring": "io_uring",
    "features.iouring.desc": "异步 I/O",
    "features.art": "Fractal ART",
    "features.art.desc": "元数据与数据引擎",

    // Benchmarks
    "benchmarks.eyebrow": "基准测试",
    "benchmarks.title": "性能基准测试",
    "benchmarks.description":
      "性能来自于真实云部署系统。您可以自行部署(BYOC)来验证这些结果。",
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
      "5 分钟内将 FractalBits 部署到您的 AWS 账户，亲自体验其性能。",
    "cta.github": "在 GitHub 上查看",
    "cta.community": "加入社区",
    "cta.enterprise": "企业合作咨询：",

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
    "footer.slack": "Slack",
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
