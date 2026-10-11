Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
"data-analyst": {
  about: "A data analyst collects, cleans and analyses data to answer business questions, turning numbers into dashboards, reports and recommendations that drive decisions.",
  does: "Gather and clean data from databases and spreadsheets; Write SQL queries to explore and aggregate data; Build dashboards and reports in Power BI or Tableau; Run statistical analyses and A/B test reads; Present insights and recommendations to stakeholders",
  tools: "Excel / Google Sheets, SQL, Python (pandas) / R, Power BI / Tableau / Looker, statistics, Jupyter",
  career: "Data Analyst Intern → Junior Data Analyst → Data Analyst → Senior Data Analyst → Analytics Lead / Analytics Manager / Data Scientist",
  plan: `
Data analysis introduction | The data analyst role; Types of analytics; The data analysis process; Data-driven decision making
Spreadsheets | Excel fundamentals; Formulas and functions; Lookups; Pivot tables
Spreadsheets advanced | Data cleaning in Excel; Conditional formatting; Charts; Power Query
Statistics I | Descriptive statistics; Distributions; Measures of spread; Probability basics
Statistics II | Sampling; Hypothesis testing; Confidence intervals; Correlation vs causation
SQL basics | Relational databases; SELECT and filtering; Sorting and aggregation; GROUP BY
SQL intermediate | Joins; Subqueries; CTEs; Window functions
Data cleaning | Data quality issues; Missing values; Outliers; Data transformation
Python basics | Python for analysts; Data types; Functions; Jupyter notebooks
pandas | DataFrames; Filtering and grouping; Merging data; Time series
Visualisation principles | Chart selection; Visual perception; Storytelling with data; Dashboard design
Visualisation tools | Matplotlib and Seaborn; Plotly; Visualisation best practices; Common mistakes
BI tools I | Power BI basics; Data modelling; DAX; Reports
BI tools II | Tableau basics; Calculated fields; Dashboards; Publishing and sharing
Business analytics | KPIs and metrics; Funnel analysis; Cohort analysis; Retention analysis
Experimentation | A/B testing; Experiment design; Statistical significance; Interpreting results
Advanced analytics | Regression analysis; Forecasting; Segmentation; Intro to machine learning
Data sources | Data warehouses; ETL basics; APIs and data collection; Data governance
Communication | Presenting insights; Writing reports; Stakeholder management; Business acumen
Professional data analysis | Analytics case studies; Domain knowledge; Career path; Interview concepts`},

"bi-analyst": {
  about: "A business intelligence (BI) analyst designs the data models, metrics and dashboards that let a whole organisation track performance and make decisions self-service.",
  does: "Gather reporting requirements from business teams; Model data in warehouses and semantic layers; Build and maintain dashboards and KPI reports; Ensure metric definitions and data quality are consistent; Train users and drive BI adoption",
  tools: "SQL, Power BI (DAX, Power Query) / Tableau / Looker, Excel, data warehouses (Snowflake / BigQuery), dbt basics",
  career: "Reporting Analyst → BI Analyst → Senior BI Analyst / BI Developer → BI Lead / Analytics Engineer / BI Manager",
  plan: `
BI introduction | What business intelligence is; The BI analyst role; The BI lifecycle; BI vs data analytics
Business fundamentals | Business processes; KPIs and metrics; Requirements gathering; Stakeholder needs
Excel for BI | Advanced Excel; Pivot tables; Power Query; Excel dashboards
Statistics for BI | Descriptive statistics; Trends and seasonality; Variance analysis; Basic forecasting
SQL I | SQL fundamentals; Joins; Aggregations; Filtering
SQL II | Window functions; CTEs; Query performance; Writing reporting queries
Data warehousing | Data warehouse concepts; OLTP vs OLAP; Star schema; Snowflake schema
Data modelling | Dimensional modelling; Facts and dimensions; Slowly changing dimensions; Semantic layers
ETL | ETL vs ELT; Data integration; Data quality; Scheduling refreshes
Power BI I | Power BI Desktop; Importing data; Power Query; Relationships
Power BI II | DAX basics; Measures vs calculated columns; Time intelligence; Advanced DAX
Power BI III | Report design; Interactivity; Row-level security; Power BI Service
Tableau | Tableau basics; Calculations; Level-of-detail expressions; Tableau dashboards
Dashboard design | Dashboard design principles; Visual hierarchy; Choosing charts; Usability
Metrics layer | Metric definitions; Single source of truth; Data catalogues; Looker and LookML
Cloud BI | Cloud data warehouses; Snowflake and BigQuery; Modern data stack; dbt for BI
Governance | Data governance; Data security; Data lineage; Compliance
Advanced analytics | Forecasting; What-if analysis; Self-service analytics; Embedded analytics
Communication | Data storytelling; Presenting to executives; Training users; Driving BI adoption
Professional BI | BI project walkthrough; Certifications: PL-300; Career path; Interview concepts`},

"data-engineer": {
  about: "A data engineer designs and builds the pipelines, warehouses and platforms that collect, store and transform data reliably so analysts, scientists and products can use it.",
  does: "Build batch and streaming data pipelines; Model data in warehouses and lakehouses; Orchestrate and monitor ETL/ELT jobs; Ensure data quality, governance and security; Optimise performance and cost of data platforms",
  tools: "Python, SQL, Apache Spark, Kafka, Airflow, dbt, Snowflake / BigQuery / Databricks, AWS / Azure / GCP, Docker",
  career: "Data Engineering Intern → Junior Data Engineer → Data Engineer → Senior Data Engineer → Staff / Principal Data Engineer / Data Architect",
  plan: `
Data engineering introduction | The data engineer role; The data lifecycle; The modern data stack; Data engineering vs data science
Python | Python fundamentals; Working with files; Data structures; Python for data engineering
SQL | Advanced SQL; Window functions; Query optimisation; SQL for transformations
Databases | Relational databases; Indexing; Transactions; NoSQL databases
Data modelling | Normalisation; Dimensional modelling; Data vault; Modelling for analytics
Linux and scripting | The Linux command line; Bash scripting; Cron jobs; Git
Data warehousing | Data warehouse architecture; Snowflake; BigQuery; Redshift
ETL and ELT | ETL vs ELT; Data ingestion; Data transformation; Incremental loads
Orchestration | Workflow orchestration; Apache Airflow; DAGs; Dagster and Prefect
dbt | dbt fundamentals; Models; Tests; Documentation
Big data | Distributed computing; Hadoop concepts; Apache Spark; PySpark
Spark advanced | Spark SQL; Spark optimisation; Partitioning; Spark Structured Streaming
Streaming | Streaming concepts; Apache Kafka; Stream processing; Flink basics
Data lakes | Data lake architecture; Lakehouse; Delta Lake and Iceberg; File formats: Parquet and Avro
Cloud data | AWS data services; Azure data services; GCP data services; Databricks
Data quality | Data quality dimensions; Data validation; Great Expectations; Data observability
Governance | Data governance; Data catalogues; Data lineage; Privacy and compliance
DevOps for data | Docker; CI/CD for data; Infrastructure as code; DataOps
Performance and cost | Pipeline optimisation; Storage optimisation; Cost management; Scaling
Professional data engineering | Data platform walkthrough; Certifications; Career path; Interview concepts`},

"ai-engineer": {
  about: "An AI engineer builds products and features on top of AI models, especially large language models, using APIs, retrieval, agents and evaluation to ship reliable AI systems.",
  does: "Integrate LLM APIs and open-source models into applications; Build RAG pipelines with embeddings and vector databases; Design agents, tools and prompts; Evaluate, monitor and improve model quality; Optimise latency, cost and safety",
  tools: "Python, OpenAI / Anthropic APIs, Hugging Face, LangChain / LlamaIndex, vector databases (pgvector, Pinecone), FastAPI, Docker, eval tools",
  career: "Software Engineer / ML Intern → AI Engineer → Senior AI Engineer → Staff AI Engineer / AI Architect / Applied AI Lead",
  plan: `
AI engineering introduction | The AI engineer role; AI vs ML vs deep learning; The AI product landscape; AI engineering workflow
Python for AI | Python essentials; Working with APIs; Async Python; Data handling
Machine learning basics | Supervised and unsupervised learning; Training and evaluation; Overfitting; Common algorithms
Deep learning basics | Neural networks; Backpropagation; CNNs and RNNs; Deep learning frameworks
Transformers and LLMs | The transformer architecture; Attention; Tokenisation; How LLMs are trained
Using LLM APIs | OpenAI and Anthropic APIs; Parameters: temperature and max tokens; Chat formats; Streaming
Prompt engineering | Prompt design; Few-shot prompting; Chain of thought; Structured outputs
Embeddings | What embeddings are; Embedding models; Semantic search; Similarity metrics
Vector databases | Vector database concepts; pgvector; Pinecone, Weaviate and Chroma; Indexing algorithms
RAG I | Retrieval-augmented generation; Document loading; Chunking strategies; Retrieval
RAG II | Advanced RAG; Reranking; Hybrid search; RAG evaluation
Frameworks | LangChain; LlamaIndex; Framework trade-offs; Building without frameworks
AI agents | Agent concepts; Tool calling; Agent loops; Multi-agent systems
Open-source models | Hugging Face; Running local models; Ollama; Model selection
Fine-tuning | When to fine-tune; Fine-tuning methods; LoRA and PEFT; Dataset preparation
Multimodal AI | Vision models; Speech-to-text and text-to-speech; Image generation; Multimodal applications
Evaluation | LLM evaluation; Evaluation metrics; LLM-as-judge; Evaluation frameworks
Safety | AI safety; Guardrails; Prompt injection; Responsible AI
Production AI | Deploying AI apps; Latency and cost optimisation; Caching; Monitoring and observability
Professional AI engineering | AI product walkthrough; AI system design; Career path; Interview concepts`},

"ai-data-scientist": {
  about: "An AI and data scientist uses statistics, machine learning and deep learning to extract insight from data and build predictive models that solve business problems.",
  does: "Frame business problems as data science questions; Explore, clean and engineer features from data; Train, tune and evaluate machine learning models; Design experiments and causal analyses; Communicate findings and deploy models with engineering teams",
  tools: "Python, pandas, NumPy, scikit-learn, PyTorch / TensorFlow, SQL, Jupyter, statistics, MLflow, cloud ML platforms",
  career: "Data Science Intern → Junior Data Scientist → Data Scientist → Senior Data Scientist → Lead / Principal Data Scientist / Head of Data Science",
  plan: `
Data science introduction | The data scientist role; The data science lifecycle; AI vs ML vs data science; Problem framing
Mathematics I | Linear algebra; Vectors and matrices; Eigenvalues; Matrix operations
Mathematics II | Calculus for ML; Derivatives and gradients; Optimisation; Gradient descent
Statistics | Probability; Distributions; Statistical inference; Bayesian thinking
Python | Python for data science; NumPy; pandas; Jupyter
Data wrangling | Data cleaning; Feature engineering; Handling missing data; Data transformation
Exploratory analysis | EDA techniques; Visualisation; Correlation; Insight generation
SQL | SQL for data science; Joins and aggregation; Window functions; Feature extraction
Machine learning I | Supervised learning; Linear regression; Logistic regression; Model evaluation
Machine learning II | Decision trees; Random forests; Gradient boosting; XGBoost
Machine learning III | Unsupervised learning; Clustering; PCA; Anomaly detection
Model evaluation | Cross-validation; Metrics; The bias-variance trade-off; Hyperparameter tuning
Deep learning I | Neural networks; PyTorch and TensorFlow; Training deep networks; Regularisation
Deep learning II | CNNs for vision; RNNs and LSTMs; Transfer learning; Transformers
NLP | Text preprocessing; Word embeddings; Transformers for NLP; LLMs
Experimentation | A/B testing; Causal inference; Experiment design; Uplift modelling
Time series | Time series analysis; ARIMA; Forecasting with ML; Evaluating forecasts
MLOps basics | Model deployment; MLflow; Model monitoring; Reproducibility
Communication | Data storytelling; Explaining models; Business impact; Ethics in AI
Professional data science | Data science case studies; Domain knowledge; Career path; Interview concepts`},

"machine-learning": {
  about: "A machine learning engineer designs, trains and deploys ML models at scale, combining strong software engineering with machine learning to put models into production.",
  does: "Build training pipelines and feature engineering; Train, tune and evaluate ML and deep learning models; Deploy models as scalable services; Monitor models for drift and retrain them; Optimise model performance, latency and cost",
  tools: "Python, NumPy, pandas, scikit-learn, PyTorch / TensorFlow, SQL, Spark, Docker, Kubernetes, MLflow, cloud ML platforms",
  career: "ML Intern → Junior ML Engineer → ML Engineer → Senior ML Engineer → Staff ML Engineer / ML Architect / Research Engineer",
  plan: `
Machine learning introduction | The ML engineer role; Types of machine learning; The ML project lifecycle; ML vs traditional programming
Mathematics | Linear algebra for ML; Calculus for ML; Probability; Statistics
Python for ML | NumPy; pandas; Visualisation; Efficient Python
Data preparation | Data collection; Data cleaning; Feature engineering; Feature selection
Regression | Linear regression; Polynomial regression; Regularisation; Regression metrics
Classification | Logistic regression; k-nearest neighbours; Support vector machines; Classification metrics
Tree methods | Decision trees; Random forests; Gradient boosting; LightGBM and XGBoost
Unsupervised learning | k-means; Hierarchical clustering; Dimensionality reduction; Anomaly detection
Model evaluation | Train, validation and test splits; Cross-validation; Hyperparameter tuning; The bias-variance trade-off
scikit-learn | The scikit-learn API; Pipelines; Model selection; Model persistence
Neural networks | Perceptrons; Activation functions; Backpropagation; Optimisers
Deep learning frameworks | PyTorch; TensorFlow and Keras; Training loops; GPUs
Computer vision | CNNs; Image classification; Object detection; Transfer learning
Sequence models | RNNs and LSTMs; Attention; Transformers; NLP applications
Advanced topics | Recommender systems; Reinforcement learning; Generative models; Large language models
ML system design | ML system design; Feature stores; Training pipelines; Batch vs real-time inference
Deployment | Model serving; REST APIs for models; Docker for ML; Cloud ML platforms
MLOps | Experiment tracking; Model registries; CI/CD for ML; Monitoring and drift
Responsible ML | Fairness; Explainability; Privacy; Model governance
Professional ML engineering | ML case studies; Research vs applied ML; Career path; Interview concepts`},

mlops: {
  about: "An MLOps engineer builds the infrastructure, automation and processes to train, deploy, monitor and govern machine learning models reliably in production.",
  does: "Automate training and deployment pipelines; Manage experiment tracking, model registries and feature stores; Serve models at scale on Kubernetes and the cloud; Monitor model performance, drift and data quality; Enforce reproducibility and governance",
  tools: "Python, Docker, Kubernetes, MLflow, Kubeflow, Airflow, DVC, Feast, BentoML / KServe, Prometheus, AWS SageMaker / Vertex AI",
  career: "DevOps / ML Intern → MLOps Engineer → Senior MLOps Engineer → ML Platform Lead / ML Infrastructure Architect",
  plan: `
MLOps introduction | What MLOps is; The MLOps engineer role; The ML lifecycle; MLOps maturity levels
ML fundamentals | ML basics for MLOps; The training process; Evaluation metrics; Model types
Programming | Python for MLOps; Software engineering for ML; Testing ML code; Packaging
DevOps foundations | Linux; Git; CI/CD concepts; Infrastructure basics
Containers | Docker for ML; GPU containers; Image optimisation; Registries
Kubernetes | Kubernetes for ML; GPU scheduling; Kubeflow; Helm
Data management | Data versioning with DVC; Data pipelines; Data validation; Feature stores
Experiment tracking | MLflow tracking; Weights & Biases; Reproducibility; Hyperparameter tuning
Training pipelines | Pipeline orchestration; Kubeflow Pipelines; Airflow for ML; Distributed training
Model registry | Model versioning; Model registries; Model metadata; Promotion workflows
Model serving I | Serving patterns; REST and gRPC serving; Batch inference; Streaming inference
Model serving II | Serving frameworks: BentoML, KServe and Triton; Autoscaling; Model optimisation; Edge deployment
CI/CD for ML | CI for ML; Continuous training; Continuous delivery of models; Testing models
Monitoring | Model monitoring; Data drift; Concept drift; Alerting
Observability | Logging for ML; Metrics with Prometheus; Dashboards; Performance tracking
Cloud ML | AWS SageMaker; Google Vertex AI; Azure ML; Choosing platforms
LLMOps | LLMOps concepts; Prompt management; LLM evaluation; LLM monitoring
Governance | Model governance; Explainability; Compliance; Responsible AI
Cost and scale | GPU cost optimisation; Infrastructure scaling; Resource management; Platform engineering for ML
Professional MLOps | ML platform walkthrough; Certifications; Career path; Interview concepts`},

"inference-engineering": {
  about: "An inference engineer makes trained AI models, especially LLMs, run fast, cheaply and reliably in production by optimising serving systems, GPUs, batching and model compression.",
  does: "Deploy and serve models with high-performance inference engines; Optimise latency and throughput with batching, caching and quantisation; Profile GPU utilisation and memory; Scale serving infrastructure and manage cost; Benchmark and select hardware and runtimes",
  tools: "Python, PyTorch, CUDA basics, vLLM, TensorRT-LLM, Triton Inference Server, ONNX Runtime, Kubernetes, profiling tools",
  career: "ML / Systems Engineer → Inference Engineer → Senior Inference Engineer → Staff ML Systems Engineer / AI Infrastructure Architect",
  plan: `
Inference introduction | What inference engineering is; Training vs inference; The inference engineer role; Inference metrics: latency, throughput and cost
Model fundamentals | Neural network inference; The transformer architecture; LLM generation; Tokenisation
Hardware | CPU vs GPU vs TPU; GPU architecture; Memory hierarchy; Accelerators
GPU programming basics | The CUDA programming model; Kernels; Memory management; GPU profiling
PyTorch for inference | PyTorch inference mode; TorchScript; torch.compile; Exporting models
Model formats | ONNX; ONNX Runtime; TensorRT; Model conversion
LLM inference | Autoregressive decoding; The KV cache; Prefill vs decode; Sampling strategies
Batching | Static batching; Dynamic batching; Continuous batching; Scheduling
Memory optimisation | PagedAttention; KV cache management; Memory planning; Offloading
Quantisation | Quantisation basics; INT8 and FP8; GPTQ and AWQ; Quantisation trade-offs
Model compression | Pruning; Distillation; Sparsity; Low-rank methods
Attention optimisation | FlashAttention; Multi-query and grouped-query attention; Attention kernels; Long context
Serving engines | vLLM; TensorRT-LLM; Text Generation Inference; SGLang
Serving infrastructure | Triton Inference Server; Model servers; API gateways; Streaming responses
Speculative decoding | Speculative decoding; Draft models; Medusa and EAGLE; Lookahead decoding
Distributed inference | Tensor parallelism; Pipeline parallelism; Multi-GPU serving; Multi-node inference
Scaling | Autoscaling; Load balancing; Kubernetes for inference; Serverless inference
Benchmarking | Benchmarking methodology; Profiling tools; Performance analysis; Hardware selection
Cost optimisation | Cost per token; GPU utilisation; Spot instances; Caching strategies
Professional inference engineering | Inference system walkthrough; Edge inference; Career path; Interview concepts`},

"postgresql-dba": {
  about: "A PostgreSQL DBA installs, configures, secures, tunes and maintains PostgreSQL databases, ensuring data is available, consistent, backed up and fast.",
  does: "Install, configure and upgrade PostgreSQL clusters; Tune queries, indexes and server parameters; Set up backups, replication and high availability; Monitor health, capacity and security; Support developers with schema design and migrations",
  tools: "PostgreSQL, psql, pgAdmin, pg_dump / pgBackRest, Patroni, PgBouncer, pg_stat_statements, Linux, Prometheus / Grafana",
  career: "Junior DBA / Database Support → PostgreSQL DBA → Senior DBA → Database Reliability Engineer / Database Architect",
  plan: `
DBA introduction | The PostgreSQL DBA role; Relational database concepts; PostgreSQL history and features; PostgreSQL vs other databases
Installation | Installing PostgreSQL; Directory structure; Initialising clusters; Client tools: psql and pgAdmin
SQL fundamentals | SQL basics; DDL and DML; Joins; Aggregation
Advanced SQL | CTEs; Window functions; JSON and JSONB; Full-text search
Database objects | Schemas; Tables and constraints; Views; Sequences
Data types | Numeric and text types; Date and time; Arrays; Custom types
Architecture | Process architecture; Memory architecture; Storage layout; Write-ahead log
MVCC | Multi-version concurrency control; Transactions; Isolation levels; Locking
Maintenance | VACUUM; Autovacuum; ANALYZE; Bloat
Indexing | B-tree indexes; GIN and GiST; BRIN; Index strategies
Query optimisation | EXPLAIN and EXPLAIN ANALYZE; The query planner; Statistics; Query tuning
Configuration | postgresql.conf; Memory settings; Checkpoints; Connection settings
Security | Roles and privileges; pg_hba.conf; SSL; Row-level security
Backup and recovery | Logical backups with pg_dump; Physical backups; Point-in-time recovery; pgBackRest
Replication | Streaming replication; Logical replication; Replication slots; Replication monitoring
High availability | HA architecture; Patroni; Failover; Connection pooling with PgBouncer
Monitoring | pg_stat views; pg_stat_statements; Monitoring tools; Logging
Scaling | Partitioning; Sharding with Citus; Read replicas; Capacity planning
Operations | Upgrades; Extensions; Migrations; Cloud PostgreSQL: RDS and Cloud SQL
Professional DBA | Database incident walkthrough; Automation; Career path; Interview concepts`},

"product-design": {
  about: "A product designer shapes how a digital product works and feels end to end, from user research and flows to interaction design, visual UI and design systems, in close partnership with product and engineering.",
  does: "Understand users and problems through research; Define flows, information architecture and wireframes; Design high-fidelity UI and interactive prototypes; Test designs with users and iterate; Collaborate with PMs and engineers and maintain design systems",
  tools: "Figma, FigJam, Maze / UserTesting, Notion, design systems, prototyping tools, basic HTML/CSS knowledge",
  career: "Design Intern → Junior Product Designer → Product Designer → Senior Product Designer → Lead / Principal Designer / Design Manager",
  plan: `
Product design introduction | The product designer role; Product design vs UX vs UI; The design process; Design thinking
Design principles | Visual hierarchy; Gestalt principles; Contrast and alignment; Consistency
User research I | Research methods; User interviews; Surveys; Contextual inquiry
User research II | Personas; Journey maps; Jobs to be done; Synthesising research
Problem definition | Problem statements; How-might-we questions; Design goals; Success metrics
Information architecture | IA principles; Card sorting; Sitemaps; Navigation design
Ideation | Sketching; Brainstorming methods; Design studios; Concept selection
Wireframing | Low-fidelity wireframes; User flows; Task flows; Wireframe tools
Figma | Figma basics; Frames and auto layout; Components; Variants
Visual design I | Typography; Colour theory; Grids and layout; Spacing
Visual design II | Iconography; Imagery; Visual style; Brand in UI
Interaction design | Interaction principles; Micro-interactions; Motion design; Feedback and states
Prototyping | Prototyping fidelity; Interactive prototypes; Prototyping tools; Prototype testing
Usability testing | Usability testing methods; Running tests; Analysing results; Iterating designs
Accessibility | WCAG; Inclusive design; Accessible colour and typography; Accessibility testing
Design systems | Design system foundations; Component libraries; Design tokens; Documentation
Platform design | Mobile design patterns; Web design patterns; Responsive design; Platform guidelines
Product thinking | Product strategy; Metrics and analytics; Experimentation; Business goals
Collaboration | Working with PMs; Design handoff; Design critiques; Presenting design
Professional product design | Portfolio and case studies; AI in design; Career path; Interview concepts`},

"ux-design": {
  about: "A UX designer focuses on making products useful, usable and enjoyable by researching users, structuring information and designing and testing flows and interfaces.",
  does: "Conduct user research and usability studies; Create personas, journey maps and user flows; Design wireframes and prototypes; Run usability tests and analyse results; Advocate for user needs and accessibility",
  tools: "Figma, FigJam / Miro, Maze, Optimal Workshop, Hotjar, Google Analytics, survey tools",
  career: "UX Intern → Junior UX Designer → UX Designer → Senior UX Designer → Lead UX / UX Researcher / UX Manager",
  plan: `
UX introduction | What UX design is; The UX designer role; UX vs UI; The UX process
Psychology of UX | Cognitive psychology; Mental models; Cognitive load; Behavioural design
UX principles | Nielsen's heuristics; Laws of UX; Usability principles; Affordances and signifiers
Research planning | Research goals; Research methods overview; Recruiting participants; Research ethics
Qualitative research | User interviews; Contextual inquiry; Diary studies; Ethnography
Quantitative research | Surveys; Analytics; A/B testing; Metrics
Synthesis | Affinity mapping; Personas; Empathy maps; Insights
Journeys | Customer journey maps; Service blueprints; Experience maps; Pain points
Information architecture | IA fundamentals; Card sorting; Tree testing; Navigation systems
User flows | User flows; Task analysis; Scenarios; Storyboards
Wireframing | Sketching; Low-fidelity wireframes; Wireframing tools; Content-first design
Prototyping | Prototype fidelity; Figma prototyping; Interactive prototypes; Rapid iteration
Usability testing | Moderated testing; Unmoderated testing; Writing tasks; Analysing findings
UI basics for UX | Visual design basics; Typography and colour; Layout; UI patterns
Interaction design | Interaction patterns; Forms design; Error states; Feedback
Accessibility | Accessibility principles; WCAG guidelines; Assistive technologies; Inclusive research
UX writing | UX writing principles; Microcopy; Voice and tone; Content design
Specialised UX | Mobile UX; Voice UX; Designing for AI; Enterprise UX
UX strategy | UX metrics; UX maturity; Stakeholder management; Design ops
Professional UX | UX case studies; Portfolio storytelling; Career path; Interview concepts`},

"product-manager": {
  about: "A product manager decides what to build and why, aligning customer needs, business goals and technology, and leads cross-functional teams from discovery to launch and growth.",
  does: "Discover customer problems and market opportunities; Define product vision, strategy and roadmap; Write requirements and prioritise the backlog; Coordinate design, engineering and go-to-market; Measure outcomes with metrics and experiments",
  tools: "Jira / Linear, Notion / Confluence, Figma, Amplitude / Mixpanel, SQL basics, Miro, Productboard",
  career: "Associate PM / APM → Product Manager → Senior PM → Group PM / Principal PM → Director / VP of Product / CPO",
  plan: `
Product management introduction | The product manager role; PM vs project manager vs product owner; The product lifecycle; PM skills overview
Product thinking | Customer problems; Value propositions; Product-market fit; Product sense
Customer discovery | Customer interviews; Jobs to be done; Opportunity solution trees; Validating problems
Market analysis | Market research; Competitive analysis; Market sizing: TAM, SAM and SOM; Positioning
Product strategy | Product vision; Product strategy; Strategic frameworks; North star metric
Roadmapping | Roadmap types; Outcome-based roadmaps; Communicating roadmaps; Roadmap tools
Prioritisation | RICE; MoSCoW; Kano model; Opportunity scoring
Requirements | PRDs; User stories; Acceptance criteria; Specs for AI features
Agile | Scrum; Kanban; Sprint planning; The product owner role
Working with design | UX for PMs; Design collaboration; Prototyping; Usability testing
Working with engineering | Technical concepts for PMs; APIs and architecture basics; Estimation; Technical debt
Metrics | Product metrics; AARRR pirate metrics; KPIs and OKRs; Dashboards
Analytics | Product analytics tools; Funnels and cohorts; SQL for PMs; Data-driven decisions
Experimentation | A/B testing; Hypothesis-driven development; Experiment analysis; Feature flags
Growth | Growth loops; Onboarding; Retention; Monetisation and pricing
Go-to-market | Launch planning; Go-to-market strategy; Product marketing collaboration; Sales enablement
Stakeholder management | Stakeholder mapping; Influence without authority; Communication; Executive updates
Leadership | Leading teams; Decision making; Handling conflict; PM ethics
AI products | AI product management; Evaluating AI features; AI risks; AI product metrics
Professional product management | Product case studies; Domain specialisation; Career path; Interview concepts`},

"technical-writer": {
  about: "A technical writer creates clear documentation such as API references, guides, tutorials and help content that helps users and developers understand and use products.",
  does: "Plan and write user guides, tutorials and API docs; Interview engineers and SMEs to gather information; Maintain docs-as-code repositories; Structure information and style guides; Measure and improve documentation quality",
  tools: "Markdown, Git / GitHub, docs-as-code (Docusaurus, MkDocs), OpenAPI / Swagger, Confluence, DITA basics, diagramming tools",
  career: "Documentation Intern → Technical Writer → Senior Technical Writer → Lead / Staff Technical Writer / Documentation Manager / Developer Educator",
  plan: `
Technical writing introduction | The technical writer role; Types of technical documentation; Audiences; The documentation lifecycle
Writing fundamentals | Clarity and conciseness; Active voice; Plain language; Grammar for technical writing
Style | Style guides; Voice and tone; Terminology; Inclusive language
Audience analysis | Audience personas; User needs; Task analysis; Content goals
Information architecture | Structuring documentation; Topic-based authoring; Navigation; Findability
Document types I | User guides; How-to guides; Tutorials; Reference docs
Document types II | Release notes; Troubleshooting guides; FAQs; Knowledge bases
The Diátaxis framework | Tutorials; How-to guides; Explanation; Reference
Research | Interviewing SMEs; Learning products; Gathering information; Testing products
Technical foundations | How software works; APIs basics; Command line basics; Programming concepts for writers
Docs as code | Markdown; Git and GitHub; Static site generators; Documentation CI
API documentation | REST API docs; OpenAPI and Swagger; Code samples; Developer portals
Visual communication | Diagrams; Screenshots; Video documentation; Information graphics
Tools | Docusaurus; MkDocs; Confluence; DITA and structured authoring
Editing | Self-editing; Peer review; Technical review; Editing checklists
Localisation | Writing for translation; Localisation processes; Global audiences; Accessibility in docs
Documentation metrics | Measuring documentation; Analytics; User feedback; Content audits
Developer experience | Developer docs strategy; Quickstarts; SDK documentation; Developer journeys
AI and documentation | AI-assisted writing; Docs for AI products; Content for LLMs; AI ethics in writing
Professional technical writing | Portfolio samples; Collaboration with teams; Career path; Interview concepts`},

devrel: {
  about: "A developer relations (DevRel) engineer or advocate builds bridges between a company and developers through content, community, demos, docs and feedback, driving adoption of developer products.",
  does: "Create tutorials, sample apps, videos and blog posts; Speak at conferences, meetups and livestreams; Grow and support developer communities; Gather developer feedback for product teams; Improve onboarding, docs and developer experience",
  tools: "A programming language and the company's SDKs, GitHub, Markdown / blogging platforms, video and streaming tools, Discord / Slack, analytics",
  career: "Developer / Community Intern → Developer Advocate → Senior Developer Advocate → DevRel Lead / Head of Developer Relations",
  plan: `
DevRel introduction | What developer relations is; DevRel roles: advocate, evangelist and community manager; DevRel in the company; The DevRel mindset
Developer audience | Understanding developers; Developer personas; Developer journeys; Developer pain points
Technical foundations | Software development basics; APIs and SDKs; Git and GitHub; Cloud basics
Developer experience | What developer experience is; Onboarding; Time to first hello world; DX audits
Content strategy | Content strategy for developers; Content types; Content calendars; SEO for developers
Technical writing | Writing tutorials; Blog posts; Documentation collaboration; Code samples
Video content | Video tutorials; Livestreaming; Video production basics; YouTube for DevRel
Public speaking I | Conference talks; Writing proposals; Structuring talks; Storytelling
Public speaking II | Delivery skills; Live demos; Handling Q&A; Workshops
Community I | Community building; Community platforms: Discord and forums; Moderation; Community programmes
Community II | Meetups and events; Hackathons; Ambassador programmes; Open-source communities
Open source | Open-source basics; Maintaining projects; Contributor experience; Licences
Social media | Social media for developers; Building a personal brand; Developer influencers; Social engagement
Sample apps and demos | Building sample apps; Demo design; Starter kits; Integrations
Feedback loops | Collecting developer feedback; Advocating internally; Product collaboration; Roadmap influence
Metrics | DevRel metrics; Measuring community health; Content analytics; Attribution
Programmes | Developer programmes; Partner programmes; Education programmes; Certifications
Strategy | DevRel strategy; Aligning with business goals; Budgeting; DevRel team structure
Events | Event strategy; Booth and sponsorship; Event logistics; Post-event follow-up
Professional DevRel | DevRel portfolio; Avoiding burnout; Career path; Interview concepts`},

"engineering-manager": {
  about: "An engineering manager leads a team of software engineers, responsible for people, delivery and technical health: hiring, growing and supporting engineers while delivering business outcomes.",
  does: "Hire, onboard, coach and grow engineers; Run 1:1s, feedback and performance reviews; Plan, prioritise and deliver projects with product; Ensure engineering quality, reliability and process health; Represent the team and manage stakeholders",
  tools: "Jira / Linear, Confluence / Notion, engineering metrics (DORA), OKRs, hiring pipelines, 1:1 and feedback frameworks",
  career: "Senior Engineer / Tech Lead → Engineering Manager → Senior EM → Director of Engineering → VP Engineering / CTO",
  plan: `
Engineering management introduction | The engineering manager role; From engineer to manager; Manager vs tech lead; Management styles
Self-management | Time management; Priorities; Delegation; Managing energy
One-on-ones | Running effective 1:1s; Building trust; Active listening; Coaching conversations
Feedback | Giving feedback; Receiving feedback; Recognition; Difficult conversations
Team building | Team formation; Psychological safety; Team culture; Team norms
Hiring I | Hiring strategy; Job descriptions; Sourcing; Interview design
Hiring II | Structured interviews; Evaluating candidates; Making offers; Diversity in hiring
Onboarding | Onboarding plans; Ramp-up; Mentoring; 30-60-90-day plans
Career development | Career ladders; Growth plans; Promotions; Sponsorship
Performance | Performance reviews; Goal setting; Managing underperformance; Performance improvement plans
Delivery I | Project planning; Estimation; Agile practices; Execution
Delivery II | Managing risk; Dependencies; Release management; Delivery metrics
Technical leadership | Technical strategy; Architecture decisions; Technical debt; Code quality
Engineering excellence | Engineering processes; DORA metrics; Developer experience; Reliability and incidents
Product partnership | Working with product managers; Roadmap planning; Prioritisation; Saying no
Stakeholder management | Managing up; Cross-team collaboration; Communication; Executive reporting
Strategy | OKRs; Team strategy; Budgeting and headcount; Organisational design
Change and conflict | Change management; Conflict resolution; Reorganisations; Crisis management
Wellbeing and culture | Preventing burnout; Remote and hybrid teams; Inclusion; Retention
Professional engineering management | Management case studies; Manager of managers; Career path; Interview concepts`},

seo: {
  about: "An SEO specialist improves a website's visibility in search engines by optimising technical health, content and authority, bringing in qualified organic traffic.",
  does: "Research keywords and search intent; Optimise on-page content and metadata; Audit and fix technical SEO issues; Build authority through links and digital PR; Track rankings and traffic and report results",
  tools: "Google Search Console, Google Analytics 4, Ahrefs / Semrush, Screaming Frog, PageSpeed Insights, Google Tag Manager, WordPress / CMS",
  career: "SEO Intern / Executive → SEO Specialist → Senior SEO Specialist → SEO Manager / Technical SEO Lead → Head of SEO / Growth",
  plan: `
SEO introduction | What SEO is; How search engines work; The SEO specialist role; SEO vs SEM
Search engines | Crawling; Indexing; Ranking; Google algorithm updates
Search intent | Types of search intent; Search results features; User behaviour; Matching intent
Keyword research I | Keyword research basics; Keyword metrics; Long-tail keywords; Keyword tools
Keyword research II | Competitor keyword analysis; Keyword clustering; Topic research; Keyword mapping
On-page SEO I | Title tags; Meta descriptions; Header tags; URL structure
On-page SEO II | Content optimisation; Internal linking; Image SEO; Structured content
Content strategy | SEO content strategy; Topic clusters; Content calendars; E-E-A-T
Content creation | Writing for SEO; Content briefs; Content quality; Content refresh
Technical SEO I | Site architecture; Crawlability; robots.txt; XML sitemaps
Technical SEO II | Indexation control; Canonical tags; Redirects; Duplicate content
Technical SEO III | Page speed; Core Web Vitals; Mobile-first indexing; JavaScript SEO
Structured data | Schema markup; Rich results; JSON-LD; Testing structured data
Link building I | Backlinks basics; Link quality; Link-building strategies; Digital PR
Link building II | Outreach; Guest posting; Broken link building; Toxic links
Local SEO | Google Business Profile; Local citations; Reviews; Local ranking factors
International and e-commerce | International SEO; hreflang; E-commerce SEO; Product pages
Analytics | Google Search Console; Google Analytics 4; Rank tracking; SEO reporting
Advanced SEO | SEO audits; Log file analysis; AI search and generative engine optimisation; Programmatic SEO
Professional SEO | SEO case studies; Client and stakeholder management; Career path; Interview concepts`},
});
