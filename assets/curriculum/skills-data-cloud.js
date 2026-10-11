Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
sql: {
  about: "SQL (Structured Query Language) is the standard language for storing, querying and managing data in relational databases. It is the single most-requested skill across developer, analyst, QA and data roles in the directory.",
  prereq: "None. Basic logic and spreadsheet familiarity help.",
  tools: "PostgreSQL / MySQL, DBeaver / pgAdmin / MySQL Workbench, SQLite",
  plan: `
Databases introduction | What databases and DBMSs are; The relational model: tables, rows and columns; Installing PostgreSQL or MySQL and a client; SQL language categories: DDL, DML, DCL, TCL
Basic queries | SELECT and FROM; WHERE and comparison operators; AND, OR, NOT, IN, BETWEEN and LIKE; ORDER BY and LIMIT
Functions | String functions; Numeric functions; Date functions; NULL handling with COALESCE
Aggregation | COUNT, SUM, AVG, MIN and MAX; GROUP BY; HAVING; DISTINCT
Creating tables | Data types; CREATE and ALTER TABLE; Constraints: PRIMARY KEY, NOT NULL, UNIQUE, CHECK; INSERT, UPDATE and DELETE
Joins I | Why joins exist; INNER JOIN; LEFT and RIGHT JOIN; FULL OUTER JOIN
Joins II | Self joins; CROSS JOIN; Joining multiple tables; Join performance basics
Subqueries | Scalar subqueries; Subqueries in WHERE; Correlated subqueries; EXISTS and NOT EXISTS
Set operations and CASE | UNION and UNION ALL; INTERSECT and EXCEPT; CASE expressions; Conditional aggregation
Relationships and keys | Foreign keys; One-to-many and many-to-many relationships; Referential integrity; ER diagrams
Normalisation | Update, insert and delete anomalies; 1NF, 2NF and 3NF; BCNF; Denormalisation trade-offs
Window functions I | OVER and PARTITION BY; ROW_NUMBER, RANK and DENSE_RANK; Running totals; Moving averages
Window functions II | LAG and LEAD; FIRST_VALUE and LAST_VALUE; NTILE and percentiles; Frame clauses
CTEs | Common table expressions; Multiple CTEs; Recursive CTEs; CTEs vs subqueries
Views and indexes | Views; Materialised views; Index types including B-tree; When indexes help and hurt
Transactions | ACID properties; BEGIN, COMMIT and ROLLBACK; Isolation levels; Locks and deadlocks
Query optimisation | EXPLAIN and query plans; Index strategies; Rewriting slow queries; Table statistics
Programmability | Stored procedures; User-defined functions; Triggers; Security: users, roles and GRANT
Advanced SQL | JSON in SQL; Pivoting data; Full-text search; Gaps-and-islands and date-series problems
Professional SQL | SQL for analytics; SQL dialects compared; Database design walkthrough; Interview concepts and career roadmap`},

mongodb: {
  about: "MongoDB is the most popular document-oriented NoSQL database, storing flexible JSON-like documents. It is widely used with Node.js (MERN stack), in startups and for content, catalogue and IoT workloads.",
  prereq: "Basic programming and JSON familiarity.",
  tools: "MongoDB Community / Atlas, mongosh, MongoDB Compass, Mongoose / PyMongo",
  plan: `
NoSQL introduction | SQL vs NoSQL; Document databases; MongoDB architecture; Installing MongoDB and creating an Atlas cluster
Documents and collections | BSON and documents; Databases and collections; The mongosh shell; The Compass GUI
CRUD I | insertOne and insertMany; find and projections; Query operators; Sorting, limit and skip
CRUD II | updateOne and updateMany; Update operators; Upserts; Deleting documents
Arrays and nested data | Querying arrays; Array update operators; Embedded documents; Dot notation
Data modelling | Embedding vs referencing; One-to-many patterns; Many-to-many patterns; Schema design patterns
Schema validation | JSON Schema validation; Required fields; Data types; Evolving schemas
Indexes | Single-field indexes; Compound indexes; Multikey and text indexes; explain()
Aggregation I | The aggregation pipeline; $match, $project and $group; $sort and $limit; $unwind
Aggregation II | $lookup joins; $facet; $bucket; Expression operators
MongoDB with Node.js | The Node.js driver; The Mongoose ODM; Schemas and models; Middleware
MongoDB with Python | PyMongo; Motor for async; ODMs for Python; Data analysis with MongoDB
Transactions | Multi-document transactions; Read and write concerns; Consistency; Sessions
Replication | Replica sets; Elections; Read preferences; Failover
Sharding | Sharding concepts; Choosing shard keys; Balancing; Zones
Performance | Query optimisation; Index strategies; The profiler; The working set
Security | Authentication; Role-based access control; Encryption; Network security
Atlas features | Atlas Search; Vector search; Triggers and functions; Charts
Operations | Backups; Monitoring; Upgrades; Change streams
Professional MongoDB | Data modelling walkthrough; Best practices; Careers and certification; Interview concepts and career roadmap`},

redis: {
  about: "Redis is an in-memory data store used as a cache, message broker, session store and real-time database. It is a standard part of high-performance backend and system-design architectures.",
  prereq: "Backend programming basics.",
  tools: "Redis / Valkey, redis-cli, RedisInsight, a client library (ioredis, redis-py)",
  plan: `
Redis introduction | What Redis is: an in-memory data store; Common use cases; Installing Redis; redis-cli
Strings and keys | Strings; Key naming conventions; Expiry and TTL; Atomic counters
Lists and sets | Lists; Sets; Sorted sets; Use cases for each
Hashes and more | Hashes; Bitmaps; HyperLogLog; Geospatial indexes
Clients | Redis with Node.js; Redis with Python; Connection management; Pipelining
Caching | The cache-aside pattern; Write-through and write-behind; Eviction policies; Cache invalidation
Sessions and rate limiting | Session storage; Rate-limiting algorithms; Distributed locks; Leaderboards
Pub/Sub | Publish and subscribe; Channels and patterns; Use cases; Limitations
Streams | Redis Streams; Consumer groups; Message processing; Streams vs Kafka
Transactions and scripting | MULTI and EXEC; WATCH; Lua scripting; Redis Functions
Persistence | RDB snapshots; AOF; Hybrid persistence; Backups
Replication | Primary-replica replication; Sentinel; Failover; Read scaling
Clustering | Redis Cluster; Hash slots; Resharding; Client support
Redis Stack modules | JSON documents; Search and query; Time series; Probabilistic structures
Vector search | Vector embeddings; Vector similarity search; Redis for AI apps; Semantic caching
Performance | Memory optimisation; Latency; Big keys and hot keys; Benchmarking
Security | Authentication and ACLs; TLS; Network security; Dangerous commands
Operations | Monitoring; Configuration tuning; Upgrades; Managed Redis services
Architecture | Redis in microservices; Queues with Redis; Job systems; Patterns and anti-patterns
Professional Redis | Case studies; Best practices; Careers; Interview concepts and career roadmap`},

elasticsearch: {
  about: "Elasticsearch is a distributed search and analytics engine for full-text search, log analytics and observability. With Kibana and Logstash it forms the Elastic (ELK) Stack.",
  prereq: "JSON, REST APIs and basic Linux.",
  tools: "Elasticsearch, Kibana, Logstash / Beats, Docker, Elasticsearch clients",
  plan: `
Search introduction | What Elasticsearch is; Full-text search concepts; The Elastic Stack; Installing Elasticsearch and Kibana
Core concepts | Documents and indices; Shards and replicas; Clusters and nodes; The REST API
Indexing | Creating indices; Indexing documents; The Bulk API; Updating and deleting
Mappings | Dynamic vs explicit mappings; Field types; text vs keyword; Multi-fields
Search basics | The Query DSL; match queries; term queries; bool queries
Text analysis | Analyzers; Tokenizers; Token filters; Custom analyzers
Relevance | Scoring and BM25; Boosting; Function score; The Explain API
Advanced queries | Phrase and proximity search; Fuzzy queries; Wildcard and regex queries; Nested queries
Aggregations I | Metrics aggregations; Bucket aggregations; Terms and histograms; Date histograms
Aggregations II | Pipeline aggregations; Nested aggregations; Significant terms; Aggregation performance
Kibana | Discover; Visualisations; Dashboards; Dev Tools
Logstash and Beats | Logstash pipelines; Filebeat; Ingest pipelines; Log analytics
Search features | Autocomplete; Suggesters; Highlighting; Pagination
Clients | Elasticsearch with Python; Elasticsearch with Node.js; The Java client; Spring Data Elasticsearch
Vector search | Dense vectors; kNN search; Semantic search; Hybrid search
Cluster management | Node roles; Shard allocation; Index lifecycle management; Snapshots
Performance | Indexing performance; Search performance; Caching; Hardware sizing
Security | Authentication; Role-based access; TLS; Audit logging
Observability | APM; Metrics; Alerting; Elastic Observability
Professional Elasticsearch | Search architecture walkthrough; OpenSearch comparison; Careers and certification; Interview concepts and career roadmap`},

"python-data-analysis": {
  about: "Python for data analysis uses NumPy, pandas and visualisation libraries to clean, explore, analyse and present data. It is the core toolkit for data analyst, business analyst and data science roles.",
  prereq: "Python basics.",
  tools: "Anaconda / uv, Jupyter, NumPy, pandas, Matplotlib, Seaborn, Plotly, scikit-learn",
  plan: `
Data analysis introduction | The data analysis workflow; Python for data: Anaconda and Jupyter; Notebook essentials; Python refresher for analysts
NumPy I | Arrays and dtypes; Indexing and slicing; Vectorised operations; Broadcasting
NumPy II | Aggregations; Reshaping; Random numbers; Linear algebra basics
pandas basics | Series and DataFrames; Reading CSV and Excel; Inspecting data; Selecting with loc and iloc
Filtering and sorting | Boolean filtering; Sorting; Adding and removing columns; Renaming and changing types
Data cleaning I | Missing values; Duplicates; Data type conversion; String cleaning
Data cleaning II | Outliers; Date and time handling; Categorical data; Data validation
Grouping and aggregation | groupby; Aggregation functions; Pivot tables; Crosstabs
Combining data | merge and joins; concat; Reshaping with melt and pivot; MultiIndex
Visualisation with Matplotlib | Figures and axes; Line, bar and scatter plots; Histograms; Customising charts
Visualisation with Seaborn | Distribution plots; Categorical plots; Relationship plots; Heatmaps
Exploratory data analysis | The EDA workflow; Univariate analysis; Bivariate analysis; Communicating findings
Statistics for analysis | Descriptive statistics; Probability distributions; Correlation; Sampling
Hypothesis testing | Hypotheses and p-values; t-tests; Chi-square tests; A/B testing
Time series | The datetime index; Resampling; Rolling windows; Trends and seasonality
Interactive visualisation | Plotly; Dashboards with Streamlit; Interactive charts; Sharing notebooks
Data sources | SQL with pandas; APIs and JSON; Web scraping; Excel automation
Performance | Efficient pandas; Vectorisation; Polars introduction; Working with large datasets
Introduction to machine learning | Regression with scikit-learn; Classification basics; Model evaluation; Feature engineering
Professional data analysis | Storytelling with data; Analysis case-study walkthrough; Careers; Interview concepts and career roadmap`},

"power-bi": {
  about: "Power BI is Microsoft's business-intelligence platform for connecting data, modelling it, writing DAX measures and publishing interactive dashboards. It is the most-requested BI tool for analyst roles in India.",
  prereq: "Excel basics; SQL helps.",
  tools: "Power BI Desktop, Power BI Service, Excel, DAX Studio, Microsoft Fabric",
  plan: `
Power BI introduction | Business intelligence concepts; Power BI Desktop, Service and Mobile; Installing and touring the interface; The Power BI workflow
Getting data | Data sources; Importing Excel and CSV; Connecting databases; Import vs DirectQuery
Power Query I | The Power Query editor; Cleaning data; Transforming columns; Data types
Power Query II | Merging queries; Appending queries; Pivot and unpivot; Parameters
Data modelling basics | Fact and dimension tables; Relationships; Cardinality and filter direction; The star schema
Visualisation I | Building a report; Bar, line and pie charts; Tables and matrices; Cards and KPIs
Visualisation II | Maps; Slicers; Formatting; Themes
DAX basics | What DAX is; Calculated columns vs measures; Basic aggregations; Evaluation context
DAX filter functions | CALCULATE; FILTER; ALL and REMOVEFILTERS; Context transition
Time intelligence | Date tables; YTD, QTD and MTD; Previous-period comparisons; Rolling averages
Advanced DAX | Iterators: SUMX and AVERAGEX; Variables; RANKX; Advanced DAX patterns
Interactivity | Drill-down and drill-through; Bookmarks; Tooltips; Buttons and navigation
Advanced visuals | Custom visuals; Decomposition tree; Key influencers; The Q&A visual
Report design | Design principles; Layout and storytelling; Accessibility; Mobile layouts
Power BI Service | Publishing reports; Workspaces; Dashboards; Apps
Sharing and security | Sharing and permissions; Row-level security; Data refresh; Gateways
Performance | Performance Analyzer; Model optimisation; DAX optimisation; Incremental refresh
Integration | Power BI with Excel; Power Automate; Python and R visuals; Embedding reports
Microsoft Fabric | Fabric overview; Dataflows; Lakehouse; Semantic models
Professional Power BI | Dashboard case-study walkthrough; PL-300 certification overview; Careers; Interview concepts and career roadmap`},

linux: {
  about: "Linux is the operating system that runs most servers, cloud infrastructure, containers and embedded devices. Command-line and administration skills are essential for DevOps, cloud, backend, security and support roles.",
  prereq: "None. A Linux machine, VM or WSL is needed.",
  tools: "Ubuntu / RHEL / WSL, Bash, vim / nano, systemd, SSH",
  plan: `
Linux introduction | What Linux is: kernel and distributions; Installing Linux or WSL; Desktop vs server; The terminal and the shell
File system | The filesystem hierarchy; Navigating directories; Absolute vs relative paths; File types
File operations | Creating, copying, moving and deleting; Viewing files; Finding files with find and locate; Archives: tar, gzip, zip
Text editing and processing | nano and vim basics; grep; sort, uniq and cut; Pipes and redirection
Users and permissions | Users and groups; File permissions; chmod and chown; sudo and root
Processes | Process concepts; ps, top and htop; Signals and kill; Foreground and background jobs
Package management | apt and dpkg; yum, dnf and rpm; Repositories; Snap and Flatpak
Services | systemd; systemctl; Unit files; The boot process
Logs | Log files in /var/log; journalctl; Log rotation; Troubleshooting with logs
Networking I | IP addresses and interfaces; ip and ifconfig; ping, traceroute and DNS tools; Ports with ss and netstat
Networking II | SSH and keys; scp and rsync; Firewalls: ufw and firewalld; Network configuration
Storage | Disks and partitions; Filesystems and mounting; LVM; Disk usage tools
Shell scripting | Bash scripts; Variables and conditions; Loops and functions; Cron jobs
Security | Hardening basics; SELinux and AppArmor; Fail2ban; Auditing
Performance | CPU and memory monitoring; I/O monitoring; Load average; Tuning
Web servers | Nginx; Apache; Reverse proxies; TLS certificates
Containers on Linux | Namespaces and cgroups; Docker on Linux; Podman; Container security
Automation | Ansible basics; Configuration management; Infrastructure scripts; Backups
Kernel and internals | Kernel modules; /proc and /sys; Boot loaders; Compiling software
Professional Linux | Linux administration case study; Certifications: LFCS and RHCSA; Careers; Interview concepts and career roadmap`},

docker: {
  about: "Docker packages applications and their dependencies into portable containers that run the same everywhere. It is a baseline skill for DevOps, cloud, backend and MLOps engineers.",
  prereq: "Linux command-line basics.",
  tools: "Docker Engine / Docker Desktop, Docker Compose, Docker Hub, BuildKit, Trivy",
  plan: `
Containers introduction | Why containers; Containers vs virtual machines; Docker architecture; Installing Docker
Images and containers | Running containers; Images and registries; The container lifecycle; Basic commands
Dockerfiles I | Writing a Dockerfile; FROM, RUN, COPY and CMD; Building images; Tags
Dockerfiles II | ENTRYPOINT vs CMD; ENV and ARG; WORKDIR and USER; .dockerignore
Image layers | Layer caching; Multi-stage builds; Image size optimisation; Choosing base images
Volumes | Data persistence; Named volumes; Bind mounts; tmpfs mounts
Networking | Network drivers; Bridge networks; Port mapping; Container DNS
Docker Compose I | Compose file structure; Services; Networks and volumes in Compose; Environment variables
Docker Compose II | Multi-container apps; depends_on and healthchecks; Profiles; Compose for development
Registries | Docker Hub; Private registries; Pushing and pulling; Image scanning
Containerising applications | Containerising Node.js; Containerising Python; Containerising Java; Running databases in containers
Security | Running as non-root; Secrets; Image vulnerabilities; Least privilege
Debugging | Logs; exec into containers; docker inspect; Resource limits
Docker in CI/CD | Building in CI; Caching in CI; Pushing images; Testing with containers
BuildKit and advanced builds | BuildKit; Buildx and multi-platform images; Build secrets; Build caching strategies
Orchestration introduction | Why orchestration; Docker Swarm; Kubernetes overview; Choosing an orchestrator
Production | Logging drivers; Monitoring containers; Restart policies; Resource management
Internals | Namespaces; cgroups; Union filesystems; OCI standards
Ecosystem | Podman; containerd; Dev containers; Docker Desktop alternatives
Professional Docker | Containerisation case-study walkthrough; Best practices; Careers and certification; Interview concepts and career roadmap`},

kubernetes: {
  about: "Kubernetes is the industry-standard platform for orchestrating containers: deploying, scaling, healing and networking applications across clusters. It is central to DevOps, SRE and platform engineering roles.",
  prereq: "Docker and Linux basics.",
  tools: "kubectl, minikube / kind, Helm, k9s, Argo CD, Prometheus",
  plan: `
Kubernetes introduction | What Kubernetes is; Cluster architecture; The control plane and nodes; Local clusters: minikube and kind
kubectl and Pods | kubectl basics; Pods; The pod lifecycle; Multi-container pods
Workloads | ReplicaSets; Deployments; Rolling updates; Rollbacks
Services | Service types; ClusterIP and NodePort; LoadBalancer; DNS in Kubernetes
Configuration | ConfigMaps; Secrets; Environment variables; Namespaces
Storage | Volumes; PersistentVolumes; PersistentVolumeClaims; StorageClasses
Other workloads | StatefulSets; DaemonSets; Jobs; CronJobs
Ingress | Ingress resources; Ingress controllers; TLS; The Gateway API
Health and resources | Liveness and readiness probes; Resource requests and limits; QoS classes; LimitRanges and quotas
Scheduling | Node selectors; Affinity and anti-affinity; Taints and tolerations; Priority classes
Helm | Helm charts; Templates and values; Releases; Chart repositories
Security | RBAC; Service accounts; Security contexts; Pod security standards
Networking | CNI plugins; Network policies; Service mesh overview; Istio basics
Autoscaling | Horizontal Pod Autoscaler; Vertical Pod Autoscaler; Cluster autoscaler; KEDA
Observability | Logging; Prometheus; Grafana; Tracing
GitOps | GitOps principles; Argo CD; Flux; Kustomize
Operators | Custom resources; Operators; Controllers; Operator frameworks
Managed Kubernetes | Amazon EKS; Google GKE; Azure AKS; Cost management
Operations | Cluster upgrades; Backups with Velero; Troubleshooting; Multi-cluster management
Professional Kubernetes | Production-readiness walkthrough; CKA and CKAD certifications; Careers; Interview concepts and career roadmap`},

aws: {
  about: "Amazon Web Services is the largest cloud platform, offering compute, storage, databases, networking, serverless and AI services. AWS knowledge is requested for cloud, DevOps, backend and data roles.",
  prereq: "Basic networking and Linux awareness.",
  tools: "AWS Console, AWS CLI, AWS free tier, CloudFormation / CDK, Terraform",
  plan: `
Cloud introduction | Cloud computing concepts; IaaS, PaaS and SaaS; AWS global infrastructure; Creating an account and the free tier
IAM | Users, groups and roles; Policies; MFA and best practices; IAM Identity Center
EC2 I | EC2 instances; Instance types; AMIs; Key pairs and connecting
EC2 II | Security groups; EBS volumes; Elastic IPs; User data
S3 | Buckets and objects; Storage classes; Bucket policies; Static website hosting
Networking | VPC; Subnets; Route tables and gateways; NAT gateways
Load balancing and scaling | Elastic Load Balancing; Auto Scaling groups; Health checks; Launch templates
Databases | RDS; Aurora; DynamoDB; ElastiCache
DNS and CDN | Route 53; CloudFront; Certificate Manager; Global Accelerator
Monitoring | CloudWatch metrics and logs; Alarms; CloudTrail; AWS Config
Serverless | Lambda; API Gateway; Event sources; Step Functions
Containers | ECR; ECS; Fargate; EKS
Messaging | SQS; SNS; EventBridge; Kinesis
Infrastructure as code | CloudFormation; AWS CDK; Terraform on AWS; SAM
DevOps on AWS | CodePipeline; CodeBuild; CodeDeploy; Deployment strategies
Security | KMS; Secrets Manager; WAF and Shield; GuardDuty
Data and analytics | Athena; Glue; Redshift; EMR
AI services | SageMaker; Bedrock; Rekognition and Comprehend; Choosing AI services
Architecture | The Well-Architected Framework; High availability; Disaster recovery; Cost optimisation
Professional AWS | Architecture case-study walkthrough; Certifications: Cloud Practitioner and Solutions Architect Associate; Careers; Interview concepts and career roadmap`},

terraform: {
  about: "Terraform is the leading infrastructure-as-code tool for defining cloud resources in declarative HCL and provisioning them repeatably across AWS, Azure, GCP and more.",
  prereq: "Cloud basics (AWS preferred) and command-line comfort.",
  tools: "Terraform / OpenTofu, AWS CLI, VS Code with HCL extension, tflint, Checkov",
  plan: `
Infrastructure as code | What IaC is; Terraform vs other tools; Installing Terraform; HCL syntax
Terraform workflow | init, plan, apply and destroy; Providers; Resources; The Terraform Registry
Variables and outputs | Input variables; Variable types; Outputs; Locals
State | What state is; Local state; Remote backends; State locking
Data sources and dependencies | Data sources; Implicit dependencies; depends_on; The resource lifecycle
Expressions | Built-in functions; Conditionals; for expressions; Dynamic blocks
Loops | count; for_each; Splat expressions; Iterating maps
Modules I | The module concept; Writing modules; Using registry modules; Module inputs and outputs
Modules II | Module composition; Versioning modules; Module structure; Module best practices
AWS with Terraform | VPC; EC2; S3; IAM
Workspaces and environments | Workspaces; Environment separation; Directory structure; Terragrunt
State management | terraform state commands; Import; moved blocks; Refactoring
Provisioners and templates | Provisioners; templatefile; cloud-init; null resources
Testing | terraform validate and fmt; tflint; terraform test; Terratest
Security | Secrets in Terraform; Checkov and tfsec; Policy as code with Sentinel and OPA; Least privilege
CI/CD | Terraform in pipelines; Plan reviews; Atlantis; GitHub Actions
Multi-cloud | Azure with Terraform; GCP with Terraform; The Kubernetes provider; Multi-provider configurations
HCP Terraform | Terraform Cloud; Remote runs; Private registry; Team workflows
Advanced | Custom providers; OpenTofu; CDK for Terraform; Large-scale patterns
Professional Terraform | IaC case-study walkthrough; Terraform Associate certification; Careers; Interview concepts and career roadmap`},

cloudflare: {
  about: "Cloudflare runs a global edge network providing DNS, CDN, security (WAF, DDoS), Zero Trust access and a developer platform (Workers, R2, D1) for building apps at the edge.",
  prereq: "DNS/HTTP basics and JavaScript for the developer platform.",
  tools: "Cloudflare dashboard, Wrangler CLI, Workers, Pages, R2, D1, Terraform provider",
  plan: `
Cloudflare introduction | What Cloudflare does; The global network and the edge; Adding a domain; Dashboard tour
DNS | DNS basics; Cloudflare DNS records; Proxied vs DNS-only; DNSSEC
CDN and caching | How the CDN works; Cache rules; Cache purging; Tiered caching
SSL/TLS | SSL modes; Edge certificates; Origin certificates; HSTS
Performance | Speed features; Image optimisation; Argo Smart Routing; Analytics
Security I | DDoS protection; The Web Application Firewall; Managed rules; Custom rules
Security II | Rate limiting; Bot management; Turnstile; Page Shield
Rules | Page rules; Transform rules; Redirect rules; Origin rules
Workers I | The Workers concept; The Wrangler CLI; Request handling; Deploying Workers
Workers II | Routing; Environment variables and secrets; Cron triggers; Debugging
Storage | Workers KV; Durable Objects; R2 object storage; Queues
Databases | D1 SQL database; Hyperdrive; Data modelling at the edge; Consistency
Pages | Cloudflare Pages; Git integration; Pages Functions; Full-stack apps
Zero Trust | Zero Trust concepts; Cloudflare Access; Tunnels; Gateway
AI at the edge | Workers AI; Vectorize; AI Gateway; Building AI apps
Frameworks | Hono; Next.js on Cloudflare; Remix and Astro; Static sites
Observability | Logs; Analytics; Tail Workers; Alerts
Email and networking | Email routing; Spectrum; Load balancing; Magic Transit overview
Infrastructure as code | The Terraform provider; API tokens; Automation; Wrangler configuration
Professional Cloudflare | Edge architecture case study; Best practices; Careers; Interview concepts and career roadmap`},

"git-github": {
  about: "Git is the distributed version-control system every software team uses; GitHub hosts Git repositories with pull requests, issues and CI/CD (Actions). Git is the second most-requested preparation item in the directory.",
  prereq: "None.",
  tools: "Git, GitHub account, VS Code / GitHub Desktop, GitHub CLI",
  plan: `
Version control | What version control is; Git vs GitHub; Installing and configuring Git; Creating a repository
Basic workflow | Working directory, staging area and commits; git add and git commit; git status and git log; Writing good commit messages
Undoing changes | git diff; git restore and git reset; git revert; .gitignore
Branching | The branch concept; Creating and switching branches; Merging; Merge conflicts
Remotes | Remote repositories; Pushing and pulling; Cloning; Fetch vs pull
GitHub basics | GitHub account and profile; Creating repositories; README files and Markdown; SSH keys and authentication
Collaboration | Forks; Pull requests; Code reviews; Merge strategies
Branching strategies | Feature branches; Git Flow; GitHub Flow; Trunk-based development
Rebasing | git rebase; Interactive rebase; Squashing commits; Rebase vs merge
GitHub features | Issues; Projects; Discussions; Wikis and GitHub Pages
Advanced Git | Stash; Cherry-pick; Tags and releases; reflog
History investigation | git blame; git bisect; Searching history; Rewriting history safely
GitHub Actions I | CI/CD concepts; Workflows and triggers; Jobs and steps; Marketplace actions
GitHub Actions II | Secrets and environments; Matrix builds; Caching; Deployments
Repository management | Branch protection; CODEOWNERS; Templates; Dependabot
Git internals | Objects: blobs, trees and commits; Refs and HEAD; Packfiles; How merges work
Large repositories | Git LFS; Submodules; Monorepos; Sparse checkout
Security | Signed commits; Secret scanning; Security advisories; Code scanning
Open source | Contributing to open source; Licences; Maintaining projects; Community health files
Professional Git | Team workflow walkthrough; GitHub Copilot and related tools; Careers; Interview concepts and career roadmap`},
});
