/* Keyword lexicon shared by the Resume studio (browser) and scripts/update-jobs.js (Node).
   Entry format: "Canonical|alias|alias". A leading "!" makes the whole entry case-sensitive
   (needed for one-letter or ambiguous names such as C, R and Go). */
(function (root) {
  const CATEGORIES = [
    ['Languages', 'Languages', [
      'Java', 'Python', 'JavaScript|JS|ES6|ECMAScript', 'TypeScript', '!C|C programming|C language', 'C++|CPP', 'C#|C sharp',
      '!Go|Golang', 'Rust', 'Kotlin', '!Swift', 'PHP', 'Ruby', 'Scala', '!R|R programming|RStudio', 'SQL', 'PL/SQL|PLSQL', 'T-SQL|TSQL',
      'Bash|Shell scripting|shell script|shell scripts', 'PowerShell', 'MATLAB', 'Dart', 'Apex', 'ABAP', 'HTML|HTML5', 'CSS|CSS3', 'VBA', 'Solidity',
    ]],
    ['Frontend', 'Frameworks & libraries', [
      'React|React.js|ReactJS', 'Angular', 'AngularJS', 'Vue.js|Vue|VueJS', 'Next.js|NextJS', 'Redux', 'Tailwind CSS|Tailwind', 'Bootstrap', 'jQuery',
      'Sass|SCSS', 'Webpack', 'Vite', 'Material UI|MUI', 'Three.js', 'Responsive design|responsive web design|mobile-first',
    ]],
    ['Backend', 'Frameworks & libraries', [
      '!Node.js|Node|NodeJS|Node JS|NodeJs|node.js|nodejs', '!Express.js|Express|ExpressJS|express.js', 'Spring Boot|SpringBoot', '!Spring|Spring Framework|Spring MVC', 'Hibernate|JPA', 'Django', 'Flask', 'FastAPI',
      '.NET|dotnet|.NET Core', 'ASP.NET|ASP.NET Core', 'Laravel', 'Ruby on Rails|Rails', '!REST APIs|REST API|REST|RESTful|RESTful APIs|Rest API|Rest APIs|RESTful API', 'GraphQL', 'gRPC', 'Microservices|microservice',
      'SOAP', 'JSON', 'XML', 'Kafka|Apache Kafka', 'RabbitMQ', 'WebSockets|WebSocket', 'OAuth|JWT|OAuth2', 'Socket.IO',
    ]],
    ['Mobile', 'Frameworks & libraries', ['Android', 'iOS', 'Flutter', 'React Native', 'SwiftUI', 'Jetpack Compose', 'Firebase', 'Unity', 'Unreal Engine']],
    ['Databases', 'Databases', [
      'MySQL', 'PostgreSQL|Postgres', 'MongoDB|Mongo', 'Oracle Database|Oracle DB|Oracle SQL', 'SQL Server|MS SQL|MSSQL', 'Redis', 'Cassandra', 'DynamoDB', 'SQLite',
      'Elasticsearch', 'NoSQL', 'Snowflake', 'BigQuery', 'DBMS|database management|RDBMS', 'Database design|normalization|normalisation|data modelling|data modeling|ER diagrams',
    ]],
    ['Cloud & DevOps', 'Cloud & DevOps', [
      'AWS|Amazon Web Services|EC2|S3|AWS Lambda', 'Azure|Microsoft Azure', 'GCP|Google Cloud|Google Cloud Platform', 'Docker|containerisation|containerization', 'Kubernetes|K8s',
      'Jenkins', 'Terraform', 'Ansible', 'CI/CD|CI CD|continuous integration|continuous delivery|continuous deployment', 'GitHub Actions', 'Git|version control', 'GitHub', 'GitLab',
      'Bitbucket', 'Linux|Unix|Ubuntu', 'Nginx', 'Maven', 'Gradle', 'Prometheus', 'Grafana', 'Cloud computing', 'Serverless', 'Helm', 'MLOps|MLflow',
    ]],
    ['Data & AI', 'Data & AI', [
      'Machine Learning|ML', 'Deep Learning|neural networks', 'NLP|natural language processing', 'Computer Vision', 'OpenCV', 'Generative AI|GenAI|Gen AI',
      'LLMs|LLM|large language models|large language model', 'Prompt engineering', 'RAG|retrieval augmented generation|retrieval-augmented generation', 'TensorFlow', 'PyTorch', 'Keras',
      'scikit-learn|sklearn|scikit learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Hugging Face|HuggingFace', 'LangChain', 'Statistics|statistical analysis|hypothesis testing',
      'Data analysis|data analytics', 'Data visualization|data visualisation|dashboards|dashboarding', 'Data cleaning|data wrangling|data preprocessing', 'Power BI|PowerBI', 'Tableau',
      '!Excel|MS Excel|MS-Excel|Advanced Excel|Spreadsheets|spreadsheets|VLOOKUP|Pivot Tables|pivot tables|Google Sheets', 'Looker', 'Jupyter', '!Spark|PySpark|Apache Spark', 'Hadoop', 'Airflow|Apache Airflow', 'ETL|ELT|data pipelines|data pipeline',
      'Data warehousing|data warehouse', 'Databricks', 'A/B testing|AB testing|experimentation', 'Big Data', 'Feature engineering', 'Time series',
    ]],
    ['Testing', 'Testing & quality', [
      'Manual testing', 'Automation testing|test automation|automated testing', 'Selenium|Selenium WebDriver', 'Cypress', 'Playwright', 'JUnit', 'TestNG', 'PyTest', 'Jest',
      'Postman', 'API testing', 'Unit testing|unit tests', 'Cucumber|BDD', 'JMeter', 'Performance testing|load testing', 'STLC', 'Test cases|test case design|test scenarios',
      'Defect tracking|bug tracking|bug reports', 'Regression testing', 'Integration testing',
    ]],
    ['Enterprise platforms', 'Platforms & tools', [
      'ServiceNow', 'ITSM|IT service management', 'ITOM', 'ITIL', 'Flow Designer', 'Glide API|GlideRecord|GlideAjax|GlideSystem', 'Business Rules', 'Client Scripts', 'Script Includes',
      'UI Policies', 'Service Portal', 'IntegrationHub', 'Update Sets', 'ATF|Automated Test Framework', 'CMDB', 'Salesforce|SFDC', 'SOQL', 'SOSL', 'Lightning Web Components|LWC',
      'Aura Components|Aura', 'Visualforce', 'Salesforce Flow|Flow Builder|Process Builder', 'Sales Cloud', 'Service Cloud', 'Experience Cloud', 'Apex Triggers',
      'SAP', 'SAP S/4HANA|S/4HANA|S4HANA', 'CDS Views', 'OData', 'SAP Fiori|Fiori|SAPUI5|UI5', 'BAPI', 'IDoc|IDocs', 'SAP BTP|BTP', 'Smartforms|Adobe Forms', 'ALV Reports|ALV',
      'UiPath', 'Automation Anywhere', 'Blue Prism', 'Power Automate', 'Power Apps|PowerApps', 'RPA|robotic process automation', 'Pega', 'Workday', 'Dynamics 365',
      'Jira', 'Confluence', 'Figma', 'VS Code|Visual Studio Code', 'IntelliJ',
    ]],
    ['Security & networking', 'Security & networking', [
      'Cybersecurity|cyber security|information security', 'Network security', 'SIEM', 'Splunk', 'Penetration testing|pentesting|VAPT|ethical hacking', 'OWASP', 'Vulnerability assessment',
      'Firewalls|firewall', 'TCP/IP', 'Computer networks|networking|CCNA', 'DNS', 'Cryptography|encryption', 'IAM|identity and access management', 'SOC|security operations',
      'Wireshark', 'Burp Suite', 'Nmap', 'Kali Linux', 'Incident response',
    ]],
    ['CS fundamentals', 'Core concepts', [
      'Data Structures|DSA|data structures and algorithms', 'Algorithms', 'OOP|OOPS|OOPs|object oriented programming|object-oriented programming|object-oriented design', 'Operating Systems|OS',
      'System Design|low level design|high level design|LLD|HLD', 'Design patterns', 'MVC', 'Multithreading|concurrency', 'Competitive programming|LeetCode|CodeChef|Codeforces|HackerRank',
      'Blockchain|Web3|smart contracts', 'Game development',
    ]],
    ['Practices', 'Core concepts', [
      'Agile', 'Scrum', 'Kanban', 'SDLC|software development life cycle', 'Code review|code reviews', 'Debugging|troubleshooting', 'Documentation|technical documentation',
      'Requirements gathering|requirement analysis|requirements analysis|user stories', 'UML', 'Performance optimization|performance optimisation|optimization', 'Clean code|SOLID',
    ]],
    ['Design & marketing', 'Design, product & business', [
      'UI/UX|UX design|UI design|user experience|user interface design', 'Wireframing|wireframes|prototyping|prototypes', 'User research|usability testing', 'Design systems',
      'Product management|product roadmap|roadmapping', 'Market research|competitive analysis', 'SEO|search engine optimization|search engine optimisation', 'Google Analytics|GA4',
      'Digital marketing', 'Content writing|copywriting', 'Technical writing|API documentation', 'Adobe XD', 'Photoshop|Adobe Photoshop', 'Canva',
    ]],
    ['Business & finance', 'Design, product & business', [
      'Financial analysis|financial modelling|financial modeling', 'Accounting|bookkeeping', '!Tally|Tally ERP|Tally Prime|TallyPrime', 'GST|taxation', 'Valuation', 'Business analysis|business requirements',
      'Project management|project planning', 'MS Office|Microsoft Office', 'PowerPoint|MS PowerPoint', 'CRM', 'Risk management', 'KPIs|KPI', 'Customer support|customer service',
    ]],
    ['Soft skills', 'Soft skills', [
      'Communication|communication skills|written communication|verbal communication', 'Teamwork|team player|collaboration|cross-functional', 'Leadership', 'Problem solving|problem-solving',
      'Analytical thinking|analytical skills', 'Time management', 'Adaptability', 'Attention to detail', 'Presentation skills|presentations|public speaking', 'Critical thinking',
      'Stakeholder management', 'Mentoring',
    ]],
  ];

  // -ing / base form -> strong past-tense verb used to rewrite weak bullet openers
  const PAST = {
    achieve: 'Achieved', analyse: 'Analysed', analyze: 'Analyzed', architect: 'Architected', assist: 'Assisted', automate: 'Automated', build: 'Built', collaborate: 'Collaborated',
    conduct: 'Conducted', configure: 'Configured', contribute: 'Contributed', coordinate: 'Coordinated', create: 'Created', debug: 'Debugged', define: 'Defined', deliver: 'Delivered',
    deploy: 'Deployed', design: 'Designed', develop: 'Developed', document: 'Documented', drive: 'Drove', enhance: 'Enhanced', ensure: 'Ensured', establish: 'Established',
    evaluate: 'Evaluated', execute: 'Executed', fix: 'Fixed', handle: 'Handled', identify: 'Identified', implement: 'Implemented', improve: 'Improved', integrate: 'Integrated',
    lead: 'Led', learn: 'Learned', maintain: 'Maintained', manage: 'Managed', migrate: 'Migrated', monitor: 'Monitored', optimise: 'Optimised', optimize: 'Optimized',
    organise: 'Organised', organize: 'Organized', perform: 'Performed', plan: 'Planned', prepare: 'Prepared', present: 'Presented', resolve: 'Resolved', research: 'Researched',
    reduce: 'Reduced', refactor: 'Refactored', run: 'Ran', streamline: 'Streamlined', support: 'Supported', test: 'Tested', train: 'Trained', troubleshoot: 'Troubleshot',
    use: 'Used', write: 'Wrote', make: 'Made', set: 'Set', mentor: 'Mentored', launch: 'Launched', model: 'Modelled', clean: 'Cleaned', visualise: 'Visualised', visualize: 'Visualized',
    scrape: 'Scraped', host: 'Hosted', publish: 'Published', review: 'Reviewed', validate: 'Validated', gather: 'Gathered', report: 'Reported', track: 'Tracked', convert: 'Converted',
    customise: 'Customised', customize: 'Customized', engineer: 'Engineered', program: 'Programmed', code: 'Coded', script: 'Scripted',
  };
  const GERUND = {};
  for (const [base, past] of Object.entries(PAST)) {
    const ing = /[^aeiou]e$/.test(base) ? base.slice(0, -1) + 'ing' : /^(plan|run|set|debug|model|program)$/.test(base) ? base + base.slice(-1) + 'ing' : base + 'ing';
    GERUND[ing] = past;
  }
  GERUND.modeling = 'Modeled'; GERUND.programing = 'Programmed';

  const WEAK = [
    [/^(?:i\s+)?(?:was\s+)?responsible\s+for\s+/i, ''], [/^(?:i\s+)?worked\s+on\s+/i, ''], [/^(?:i\s+)?(?:was\s+)?involved\s+in\s+/i, ''],
    [/^(?:i\s+)?(?:was\s+)?(?:a\s+)?part\s+of\s+(?:a\s+|the\s+)?team\s+(?:that|which)\s+/i, ''], [/^(?:i\s+)?(?:have\s+|had\s+)?(?:successfully\s+)?/i, ''],
    [/^duties\s+included\s+/i, ''], [/^tasks?\s+included\s+/i, ''],
  ];

  const ACTION = new Set(('achieved accelerated adapted administered analysed analyzed architected assembled assessed assisted audited authored automated balanced benchmarked built calculated '
    + 'captured championed cleaned coached collaborated collected compiled completed composed computed conceived conducted configured consolidated constructed contributed converted coordinated '
    + 'created curated customised customized cut debugged decreased defined delivered demonstrated deployed designed detected developed devised diagnosed digitised directed discovered documented '
    + 'doubled drafted drove earned eliminated enabled engineered enhanced ensured established evaluated executed expanded explored extracted facilitated fixed formulated founded generated '
    + 'grew guided handled headed hosted identified implemented improved increased initiated innovated inspected installed integrated interpreted introduced investigated launched led learned '
    + 'leveraged maintained managed mapped mastered maximised maximized measured mentored migrated minimised minimized modelled modeled modernised modernized monitored negotiated optimised optimized '
    + 'orchestrated organised organized overhauled participated performed piloted pioneered planned prepared presented prioritised prioritized processed produced programmed prototyped proposed '
    + 'provided published ran rebuilt reduced re-engineered refactored refined reorganised reported represented researched resolved restructured revamped reviewed saved scaled scheduled scripted '
    + 'secured selected served shipped simplified solved spearheaded standardised standardized streamlined strengthened structured submitted supervised supported surpassed synthesised tested '
    + 'tracked trained transformed translated tripled troubleshot tuned upgraded utilised utilized validated visualised visualized volunteered won wrote').split(' '));

  // Certifications recruiters search for, per role (suggestions only — never added automatically)
  const CERTS = {
    'servicenow-developer': ['ServiceNow Certified System Administrator (CSA)', 'ServiceNow Certified Application Developer (CAD)', 'ITIL 4 Foundation'],
    'salesforce-developer': ['Salesforce Certified Platform Developer I (PD1)', 'Salesforce Certified Administrator', 'Salesforce Certified Platform App Builder', 'Trailhead Ranger badge'],
    'sap-abap-developer': ['SAP Certified Associate – Back-End Developer – ABAP Cloud', 'SAP Certified Associate – SAP S/4HANA'],
    'rpa-developer': ['UiPath Certified Professional – Automation Developer Associate', 'Automation Anywhere Certified Advanced RPA Professional', 'Microsoft Power Automate RPA Developer (PL-500)'],
    devops: ['AWS Certified Cloud Practitioner / Solutions Architect – Associate', 'Certified Kubernetes Administrator (CKA)', 'HashiCorp Terraform Associate', 'Microsoft Azure Fundamentals (AZ-900)'],
    devsecops: ['CompTIA Security+', 'Certified Kubernetes Security Specialist (CKS)', 'AWS Certified Security – Specialty'],
    'cyber-security': ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'Cisco CyberOps Associate', 'ISC2 Certified in Cybersecurity (CC)'],
    'network-engineer': ['Cisco CCNA', 'CompTIA Network+', 'Juniper JNCIA-Junos'],
    'data-analyst': ['Google Data Analytics Professional Certificate', 'Microsoft Power BI Data Analyst (PL-300)', 'Tableau Desktop Specialist'],
    'bi-analyst': ['Microsoft Power BI Data Analyst (PL-300)', 'Tableau Desktop Specialist', 'Google Data Analytics Professional Certificate'],
    'data-engineer': ['Google Cloud Professional Data Engineer', 'Databricks Certified Data Engineer Associate', 'Microsoft Azure Data Engineer (DP-203 / DP-700)', 'AWS Certified Data Engineer – Associate'],
    'ai-engineer': ['Microsoft Azure AI Engineer (AI-102)', 'AWS Certified AI Practitioner', 'DeepLearning.AI Generative AI with LLMs'],
    'ai-data-scientist': ['IBM Data Science Professional Certificate', 'Microsoft Azure Data Scientist (DP-100)', 'TensorFlow Developer Certificate'],
    'machine-learning': ['AWS Certified Machine Learning – Specialty', 'Google Cloud Professional ML Engineer', 'DeepLearning.AI Machine Learning Specialization'],
    mlops: ['Google Cloud Professional ML Engineer', 'AWS Certified Machine Learning Engineer – Associate', 'Certified Kubernetes Administrator (CKA)'],
    'postgresql-dba': ['EDB PostgreSQL Associate Certification', 'Oracle Database SQL Certified Associate'],
    qa: ['ISTQB Certified Tester Foundation Level (CTFL)', 'ISTQB Test Automation Engineer'],
    frontend: ['Meta Front-End Developer Professional Certificate', 'freeCodeCamp Responsive Web Design / JavaScript Algorithms'],
    backend: ['Oracle Certified Professional: Java SE Developer', 'AWS Certified Developer – Associate', 'MongoDB Associate Developer'],
    'full-stack': ['Meta Full-Stack / Back-End Developer Certificate', 'AWS Certified Developer – Associate', 'MongoDB Associate Developer'],
    android: ['Google Associate Android Developer', 'Meta Android Developer Professional Certificate'],
    ios: ['Meta iOS Developer Professional Certificate', 'Apple App Development with Swift Certified User'],
    'software-architect': ['AWS Certified Solutions Architect – Associate', 'TOGAF Foundation'],
    'product-manager': ['Google Project Management Certificate', 'Certified Scrum Product Owner (CSPO)', 'Pragmatic Institute Foundations'],
    'product-design': ['Google UX Design Professional Certificate', 'Interaction Design Foundation courses'],
    'ux-design': ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Certification'],
    seo: ['Google Analytics Certification', 'HubSpot SEO Certification', 'SEMrush SEO Fundamentals'],
    'technical-writer': ['Google Technical Writing One & Two', 'Certified Professional Technical Communicator (CPTC)'],
    blockchain: ['Certified Blockchain Developer (Blockchain Council)', 'Ethereum Developer Bootcamp (Alchemy University)'],
  };

  const L = { CATEGORIES, PAST, GERUND, WEAK, ACTION, CERTS };
  if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.RESUME_LEXICON = L;
})(typeof window !== 'undefined' ? window : globalThis);
