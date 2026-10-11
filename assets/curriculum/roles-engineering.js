Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
frontend: {
  about: "A frontend developer builds everything users see and interact with in a web application: layouts, components, forms, animations and the logic that connects the UI to back-end APIs.",
  does: "Turn designs into responsive, accessible pages; Build reusable UI components in React or another framework; Integrate REST/GraphQL APIs and manage client state; Optimise performance and Core Web Vitals; Write tests and fix cross-browser bugs",
  tools: "HTML, CSS, JavaScript, TypeScript, React / Next.js, Tailwind, Git, Vite, Jest / Playwright, Figma",
  career: "Frontend Intern → Junior Frontend Developer → Frontend Developer → Senior Frontend Engineer → Staff Engineer / Frontend Architect / Engineering Manager",
  plan: `
How the web works | Internet, HTTP and DNS; Browsers and how pages render; The frontend developer role; Developer environment setup
HTML essentials | Document structure; Semantic HTML; Forms; Accessibility basics
CSS essentials | Selectors, cascade and the box model; Typography and colour; Flexbox; CSS Grid
Responsive design | Mobile-first design; Media queries; Responsive images; CSS units
Version control | Git basics; Branching; GitHub; Pull requests
JavaScript fundamentals | Variables, types and operators; Functions and scope; Arrays and objects; Control flow
DOM and events | Selecting and changing elements; Events and delegation; Forms with JavaScript; Building dynamic UI
Async JavaScript | The event loop; Promises; async/await; fetch and APIs
Modern JavaScript | ES modules; Classes; Destructuring and spread; Error handling
Tooling | npm; Vite; ESLint and Prettier; Browser DevTools
React fundamentals | Components and JSX; Props and state; Events and lists; Forms
React in depth | Effects; Context; Custom hooks; Routing
State and data | State management; Data-fetching libraries; Caching; Form libraries
TypeScript | Types and interfaces; Generics; TypeScript with React; Typing APIs
Styling at scale | Tailwind CSS; CSS Modules; Component libraries; Design systems
Testing | Unit testing; Component testing; End-to-end testing; Accessibility testing
Performance | Core Web Vitals; Code splitting; Image optimisation; Rendering performance
Frameworks and SSR | Next.js; Server-side rendering; Static generation; SEO for single-page apps
Security and deployment | XSS and Content Security Policy; Authentication on the frontend; CI/CD; Hosting on Vercel and Netlify
Professional frontend | Portfolio walkthrough; Frontend architecture; Career path; Interview concepts`},

backend: {
  about: "A backend developer builds the server-side logic, APIs, databases and integrations that power applications, making sure they are correct, secure, fast and scalable.",
  does: "Design and build REST/GraphQL APIs; Model data and write efficient database queries; Implement authentication, authorisation and business rules; Integrate queues, caches and third-party services; Monitor, debug and scale services in production",
  tools: "Java / Python / Node.js / Go, Spring Boot / Django / Express, SQL & NoSQL databases, Redis, Docker, Git, Postman, cloud (AWS)",
  career: "Backend Intern → SDE I / Junior Backend Developer → Backend Engineer → Senior Backend Engineer → Staff Engineer / Architect / Engineering Manager",
  plan: `
Backend introduction | The backend developer role; Client-server architecture; How the internet and HTTP work; Choosing a backend language
Programming language | Language fundamentals; Data structures; Object-oriented programming; Error handling
Operating systems and terminal | The Linux command line; Processes and memory; File systems; Shell scripting
Version control | Git workflows; GitHub collaboration; Code reviews; Branching strategies
Relational databases | SQL fundamentals; Joins and aggregation; Database design; Normalisation
APIs | REST design; HTTP methods and status codes; JSON; API documentation with OpenAPI
Backend framework | Framework architecture: Express, Spring or Django; Routing and controllers; Middleware; Validation
Data access | ORMs; Migrations; Transactions; Query optimisation
Authentication | Sessions and cookies; JWT; OAuth 2.0; Password security
NoSQL | Document databases; Key-value stores; When to use NoSQL; NoSQL data modelling
Caching | Caching strategies; Redis; HTTP caching; CDNs
Testing | Unit testing; Integration testing; API testing; Test databases
Security | The OWASP Top 10; Input validation; Secrets management; HTTPS and CORS
Messaging | Message queues; Background jobs; Event-driven architecture; Kafka basics
Real-time | WebSockets; Server-sent events; Long polling; Real-time architecture
Architecture | Monolith vs microservices; Clean architecture; Design patterns; Domain-driven design
Scalability | Horizontal scaling; Load balancing; Database replication and sharding; Rate limiting
DevOps for backend | Docker; CI/CD; Cloud deployment; Infrastructure-as-code basics
Observability | Logging; Metrics; Tracing; Alerting
Professional backend | System design for backend developers; Portfolio walkthrough; Career path; Interview concepts`},

"full-stack": {
  about: "A full-stack developer works across the whole application: the user interface, the server and APIs, the database and deployment, delivering complete features end to end.",
  does: "Build UI features and the APIs behind them; Design database schemas and data flows; Handle authentication, payments and integrations; Deploy and maintain apps in the cloud; Debug issues anywhere in the stack",
  tools: "HTML/CSS, JavaScript/TypeScript, React / Next.js, Node.js / Express, PostgreSQL / MongoDB, Prisma, Docker, Git, Vercel / AWS",
  career: "Full-Stack Intern → Junior Full-Stack Developer → Full-Stack Engineer → Senior Engineer → Tech Lead / Architect / Founding Engineer",
  plan: `
Full-stack introduction | The full-stack developer role; Web architecture; Development environment; Git and GitHub
HTML and CSS | Semantic HTML; CSS layout with Flexbox and Grid; Responsive design; Accessibility
JavaScript | JavaScript fundamentals; DOM and events; Async JavaScript; Modern ES features
TypeScript | Types; Interfaces; Generics; Type-safe code across the stack
React | Components and state; Hooks; Routing; Data fetching
Node.js | The Node runtime; Modules and npm; File system and events; Async patterns
Express APIs | Express setup; REST endpoints; Middleware; Error handling
Databases | SQL with PostgreSQL; ORMs with Prisma; MongoDB; Data modelling
Authentication | Sessions vs JWT; OAuth; Authorisation; Security best practices
Connecting frontend and backend | Consuming APIs; State management; Forms and validation; File uploads
Full-stack frameworks | The Next.js App Router; Server components; Server actions; API routes
Testing | Unit tests; API tests; Component tests; End-to-end tests
Real-time and jobs | WebSockets; Background jobs; Email and notifications; Payments integration
Performance | Frontend performance; Backend performance; Caching with Redis; Database indexing
Security | The OWASP Top 10; XSS and CSRF; SQL injection; Secrets management
DevOps | Docker; CI/CD with GitHub Actions; Cloud hosting; Environment configuration
Cloud | AWS basics; Serverless; Object storage; Managed databases
Architecture | Monorepos; Clean architecture; Microservices overview; API design
Observability and maintenance | Logging and monitoring; Error tracking; Product analytics; Maintenance
Professional full-stack | Full-stack project walkthrough; System design basics; Career path; Interview concepts`},

android: {
  about: "An Android developer builds native apps for Android phones, tablets and wearables, today mainly with Kotlin and Jetpack Compose.",
  does: "Build screens with Jetpack Compose; Implement app architecture with ViewModels and repositories; Integrate REST APIs, databases and device features; Optimise performance and battery use; Publish and maintain apps on Google Play",
  tools: "Kotlin, Android Studio, Jetpack Compose, Coroutines & Flow, Room, Retrofit, Hilt, Firebase, Gradle",
  career: "Android Intern → Junior Android Developer → Android Developer → Senior Android Engineer → Mobile Lead / Mobile Architect",
  plan: `
Android introduction | The Android ecosystem and developer role; Android Studio setup; Project structure; Emulators and devices
Kotlin basics | Variables and types; Control flow and functions; Null safety; Collections
Kotlin OOP | Classes and data classes; Interfaces and inheritance; Lambdas and higher-order functions; Extension functions
Android fundamentals | Activities and the lifecycle; Intents; The manifest and permissions; Resources
Jetpack Compose basics | Composables; Layouts: Column, Row and Box; Modifiers; Previews
Compose state | State and remember; State hoisting; Recomposition; Side effects
Lists and UI | LazyColumn and LazyRow; Material 3; Theming; Images
Navigation | Navigation Compose; Passing arguments; The back stack; Bottom navigation
Architecture | MVVM; ViewModel; The repository pattern; Unidirectional data flow
Coroutines and Flow | Coroutines; Flow and StateFlow; Lifecycle-aware collection; Error handling
Networking | Retrofit; JSON with Kotlin serialization; OkHttp; Handling errors
Persistence | Room database; DataStore; Caching strategies; Offline-first design
Dependency injection | Hilt; Scopes; Modules; Testing with DI
Background work | WorkManager; Services; Notifications; Alarms
Device features | Camera; Location; Sensors; Runtime permissions
Testing | Unit tests; Compose UI tests; Instrumented tests; Mocking
Performance | Profiling; Memory leaks; Baseline profiles; App size
Security | Secure storage; Network security; ProGuard and R8; Authentication
Publishing | App signing; The Play Console; Release tracks; Play Store policies
Professional Android | Modular architecture; Firebase services; Career path; Interview concepts`},

ios: {
  about: "An iOS developer builds native apps for iPhone, iPad and other Apple platforms using Swift, SwiftUI and UIKit.",
  does: "Build user interfaces with SwiftUI and UIKit; Implement networking, persistence and app architecture; Integrate device features like camera, location and notifications; Profile and optimise performance; Ship builds through TestFlight and the App Store",
  tools: "Swift, Xcode, SwiftUI, UIKit, SwiftData / Core Data, Combine, XCTest, Instruments, TestFlight",
  career: "iOS Intern → Junior iOS Developer → iOS Developer → Senior iOS Engineer → Mobile Lead / Mobile Architect",
  plan: `
iOS introduction | The iOS ecosystem and developer role; Xcode setup; Project structure; Simulators
Swift basics | Variables and types; Control flow; Functions and closures; Optionals
Swift types | Structs and classes; Enums; Protocols; Generics
SwiftUI basics | Views and modifiers; Stacks; Text, images and buttons; Previews
Layout | Lists; Grids; ScrollView; Adaptive layouts
State | @State and @Binding; @Observable; The environment; Data flow
Navigation | NavigationStack; Sheets; TabView; Deep links
Networking | URLSession; Codable; async/await; Error handling
Persistence | SwiftData; Core Data; UserDefaults; Keychain
Architecture | MVVM; Dependency injection; Swift packages; Clean architecture
UIKit | UIKit fundamentals; View controllers; Auto Layout; UIKit and SwiftUI interoperability
Concurrency | Tasks; Actors; MainActor; Structured concurrency
Device features | Camera and photos; Location and maps; Notifications; HealthKit and sensors
Animations | SwiftUI animations; Transitions; Gestures; Haptics
Combine | Publishers; Subscribers; Operators; Combine vs async/await
Testing | XCTest; Swift Testing; UI tests; Mocking
Performance | Instruments; Memory management and ARC; Energy efficiency; App launch time
Accessibility | VoiceOver; Dynamic Type; Localisation; Inclusive design
Publishing | Certificates and provisioning; TestFlight; App Store Connect; App Review guidelines
Professional iOS | App architecture walkthrough; Widgets and extensions; Career path; Interview concepts`},

"game-developer": {
  about: "A game developer programs the gameplay, systems, physics, AI and tools that bring games to life, usually inside an engine such as Unity, Unreal or Godot.",
  does: "Implement gameplay mechanics and player controls; Build game systems like UI, audio, saving and AI; Work with artists and designers to integrate assets; Optimise frame rate and memory; Ship builds to PC, console or mobile",
  tools: "Unity (C#) / Unreal Engine (C++ / Blueprints) / Godot, Visual Studio / Rider, Git / Perforce, Blender basics",
  career: "Game Programming Intern → Junior Game Developer → Gameplay / Engine Programmer → Senior Game Developer → Lead Programmer / Technical Director",
  plan: `
Game development introduction | The game industry and roles; The game development lifecycle; Engines: Unity, Unreal and Godot; Setting up an engine
Maths for games | Vectors; Matrices and transforms; Trigonometry; Coordinate systems
Programming for games | C# for Unity; C++ for Unreal; The game loop; Object-oriented game code
Engine basics | Scenes and game objects; Components; Prefabs; Asset management
2D games | Sprites; Tilemaps; 2D physics; 2D animation
3D games | 3D models and meshes; Cameras; Lighting; Materials
Physics | Rigidbodies; Colliders; Raycasting; Physics materials
Input and controls | Input systems; Character controllers; Camera controllers; Controller support
Animation | Animation systems; Animation state machines; Blend trees; Inverse kinematics
Game UI | HUDs; Menus; UI systems; Responsive game UI
Game AI | Finite state machines; Pathfinding with A*; Navigation meshes; Behaviour trees
Audio | Sound effects; Music; 3D audio; Audio middleware
Graphics | The rendering pipeline; Shaders; Particle systems; Post-processing
Game design | Game mechanics; Level design; Game balance; Player experience
Data and saving | Save systems; Serialization; ScriptableObjects; Data-driven design
Multiplayer | Networking models; Client-server for games; Netcode frameworks; Lag compensation
Optimisation | Profiling; Draw calls and batching; Memory management; Level of detail
Platforms | PC, console and mobile; Input differences; Performance targets; Porting
Publishing | Builds; Steam and app stores; Monetisation; Live operations
Professional game development | Game portfolio walkthrough; Team pipelines; Career path; Interview concepts`},

"server-side-game-developer": {
  about: "A server-side game developer builds the online backbone of games: game servers, matchmaking, player accounts, economies and the infrastructure that keeps multiplayer fair, fast and stable.",
  does: "Build authoritative game servers and networking code; Implement matchmaking, lobbies and leaderboards; Design player data, inventory and economy services; Scale and monitor servers during live events; Defend against cheating and DDoS",
  tools: "C++ / C# / Go / Java, TCP/UDP sockets, Redis, PostgreSQL / NoSQL, Docker, Kubernetes / Agones, PlayFab / GameLift",
  career: "Backend Intern → Junior Game Server Developer → Game Server Engineer → Senior Online Engineer → Lead Online / Backend Architect",
  plan: `
Game servers introduction | The server-side game developer role; Online game architectures; Client-server vs peer-to-peer; Types of game servers
Networking fundamentals | TCP and UDP; Sockets; Latency, jitter and packet loss; Network protocols for games
Programming | C++, C# or Go for servers; Concurrency basics; Memory management; Serialization
Game state | Authoritative servers; Server game loops; Tick rates; State management
Synchronisation | State synchronisation; Snapshot interpolation; Client-side prediction; Server reconciliation
Lag compensation | Lag compensation techniques; Rollback netcode; Lockstep; Interest management
Matchmaking | Matchmaking systems; Skill ratings: Elo, Glicko and TrueSkill; Lobbies; Queues
Backend services | Player accounts; Authentication; Inventory and economy; Leaderboards
Databases | Player data storage; SQL vs NoSQL for games; Caching with Redis; Data consistency
APIs | REST for game services; WebSockets; gRPC; Real-time messaging
Scalability | Horizontal scaling of game servers; Sharding worlds; Load balancing; Session management
Cloud | Cloud hosting for games; Dedicated server orchestration; Agones; Managed services: GameLift and PlayFab
Security | Cheating and anti-cheat; Server-side validation; DDoS protection; Secure communication
Real-time systems | Event-driven architecture; Message queues; Pub/sub; Chat systems
Performance | Profiling servers; Optimising networking; Memory optimisation; Benchmarking
Observability | Logging; Metrics; Monitoring player experience; Alerting
Live operations | Deployments; Hotfixes; Feature flags; Live events
Analytics | Game telemetry; Player analytics; A/B testing; Data pipelines
MMO architecture | MMO server design; Zones and instances; Persistence; Economy design
Professional game backend | Case studies; Team practices; Career path; Interview concepts`},

blockchain: {
  about: "A blockchain developer builds decentralised applications and smart contracts on platforms like Ethereum, with a strong focus on cryptography, security and token economics.",
  does: "Write, test and deploy smart contracts; Build dApp front-ends that connect to wallets; Integrate oracles, storage and indexing services; Audit contracts for vulnerabilities; Optimise gas costs",
  tools: "Solidity, Hardhat / Foundry, ethers.js / viem, MetaMask, OpenZeppelin, IPFS, The Graph",
  career: "Web3 Intern → Junior Smart-Contract Developer → Blockchain Engineer → Senior Protocol Engineer → Smart-Contract Auditor / Protocol Architect",
  plan: `
Blockchain introduction | What blockchain is; Distributed ledgers; Bitcoin history; Use cases
Cryptography | Hash functions; Public-key cryptography; Digital signatures; Merkle trees
Consensus | Proof of work; Proof of stake; Byzantine fault tolerance; Finality
Blockchain architecture | Blocks and transactions; Nodes; Mining and validation; Forks
Ethereum | Ethereum overview; Accounts and gas; The EVM; Ethereum vs Bitcoin
Solidity basics | Solidity syntax; Data types; Functions; Contract structure
Solidity intermediate | Mappings and structs; Modifiers; Events; Inheritance
Tooling | Remix; Hardhat; Foundry; Testnets and faucets
Wallets | Wallets and keys; MetaMask; Seed phrases; Transaction signing
Token standards | ERC-20; ERC-721 NFTs; ERC-1155; Token economics
Smart contract testing | Unit testing contracts; Fuzz testing; Fork testing; Coverage
Security | Reentrancy; Integer overflow; Access control; Common vulnerabilities
dApp development | dApp architecture; ethers.js and viem; Connecting wallets; Frontend integration
Oracles and storage | Oracles such as Chainlink; IPFS; The Graph; Off-chain data
DeFi | DeFi concepts; DEXs and AMMs; Lending protocols; Stablecoins
Scaling | Layer 2 solutions; Rollups; Sidechains; Cross-chain bridges
Other chains | Solana; Polygon; Cosmos and Polkadot; Choosing a chain
Advanced Solidity | Gas optimisation; Upgradeable contracts; Proxy patterns; Inline assembly
Auditing | The audit process; Static analysis tools; Formal verification; Audit reporting
Professional blockchain | Web3 product walkthrough; Regulation; Career path; Interview concepts`},

"forward-deployed-engineer": {
  about: "A forward deployed engineer (FDE) is a software engineer embedded with customers who builds, integrates and deploys the company's platform to solve real customer problems, combining coding, data and communication skills.",
  does: "Understand customer workflows and requirements; Build integrations, data pipelines and custom features fast; Deploy and troubleshoot solutions in customer environments; Demo, train and hand off to customer teams; Feed customer insights back to product",
  tools: "Python, SQL, REST APIs, cloud platforms, Docker, data pipeline tools, LLM platforms, documentation tools",
  career: "Associate FDE / Solutions Engineer → Forward Deployed Engineer → Senior FDE → FDE Lead / Product Engineer / Engineering Manager",
  plan: `
Forward deployed engineering | What a forward deployed engineer does; FDE vs software engineer vs solutions engineer; The customer-facing engineering mindset; A day in the life
Programming foundations | Python for integration work; Scripting and automation; Data structures; Debugging
APIs and integration | HTTP APIs and JSON; Authentication with API keys and OAuth; SDKs; Rapid integration prototyping
Data fundamentals | SQL; Data formats; Data cleaning; Data access permissions
Translating workflows | Mapping customer workflows; Process diagrams; Identifying automation opportunities; Scoping solutions
Customer discovery | Stakeholder interviews; Asking good questions; Understanding business goals; Building trust
Requirements | Requirements and acceptance criteria; User stories; Edge-case discovery; Prioritisation
Data pipelines | ETL and data mapping; Pipeline tools; Batch vs streaming; Data quality
Systems design | Schema and system boundaries; Integration architecture; Scalability basics; Trade-offs
Testing integrations | API integration tests; Mocking external systems; Validation; Regression checks
Cloud and deployment | Cloud basics; Containers; Secure deployment concepts; Environment management
AI platforms | Working with LLM platforms; Prompting and RAG for customers; Evaluating AI solutions; Customising models
Reliability | Operational reliability; Observability and alerts; Error handling; SLAs
Troubleshooting | Troubleshooting production issues; Log analysis; Root-cause analysis; Incident communication
Security | Security reviews; Data privacy; Compliance requirements; Access control
Cost and performance | Cost and latency; Optimisation; Capacity planning; Trade-off conversations
Communication | Customer walkthroughs and demos; Technical writing; Presenting to executives; Managing expectations
Delivery | Project management basics; Handoff documentation; Training customers; Change management
Impact | Measuring impact; Feedback to product teams; Closing the feedback loop; Case studies
Professional FDE | FDE engagement walkthrough; Career growth; Companies hiring FDEs; Interview concepts`},

devops: {
  about: "A DevOps engineer automates how software is built, tested, deployed and run, bridging development and operations with CI/CD, cloud infrastructure, containers and monitoring.",
  does: "Build and maintain CI/CD pipelines; Provision cloud infrastructure as code; Containerise and orchestrate services with Docker and Kubernetes; Set up monitoring, logging and alerting; Improve reliability, security and deployment speed",
  tools: "Linux, Bash, Git, Docker, Kubernetes, Terraform, Ansible, GitHub Actions / Jenkins, AWS / Azure, Prometheus, Grafana",
  career: "Cloud / DevOps Intern → Junior DevOps Engineer → DevOps Engineer → Senior DevOps / SRE → Platform Engineering Lead / Cloud Architect",
  plan: `
DevOps introduction | DevOps culture and principles; The DevOps engineer role; The SDLC and DevOps lifecycle; Key metrics: DORA
Linux | Linux fundamentals; File system and permissions; Processes and services; Package management
Scripting | Bash scripting; Python for automation; Text processing; Automation tasks
Networking | TCP/IP and ports; DNS; HTTP and TLS; Load balancers and proxies
Version control | Git; Branching strategies; GitHub and GitLab; Code review workflows
Containers | Docker fundamentals; Dockerfiles; Docker Compose; Registries
CI/CD I | CI/CD concepts; GitHub Actions; Jenkins; GitLab CI
CI/CD II | Build and test pipelines; Artifact management; Deployment strategies: blue-green and canary; Release management
Cloud | Cloud fundamentals; AWS core services; Azure and GCP overview; Cloud networking
Infrastructure as code | IaC concepts; Terraform; CloudFormation; State management
Configuration management | Ansible; Playbooks; Roles; Idempotency
Kubernetes I | Kubernetes architecture; Pods and deployments; Services; ConfigMaps and secrets
Kubernetes II | Helm; Ingress; Autoscaling; Storage
Monitoring | Prometheus; Grafana; Alerting; SLIs and SLOs
Logging and tracing | Centralised logging with ELK and Loki; Distributed tracing; OpenTelemetry; Observability strategy
GitOps | GitOps principles; Argo CD; Flux; Environment promotion
Security | DevSecOps; Secrets management with Vault; Image scanning; Compliance
Reliability | SRE principles; Incident management; Postmortems; Chaos engineering
Platform engineering | Internal developer platforms; Backstage; Service mesh; FinOps cost management
Professional DevOps | DevOps pipeline walkthrough; Certifications; Career path; Interview concepts`},

devsecops: {
  about: "A DevSecOps engineer builds security into every stage of the software delivery pipeline, automating security testing, secrets management, compliance and cloud/container hardening.",
  does: "Integrate SAST, SCA, DAST and secret scanning into CI/CD; Harden containers, Kubernetes and cloud accounts; Threat-model applications with developers; Respond to vulnerabilities and incidents; Automate compliance evidence",
  tools: "Git, CI/CD, SonarQube / Semgrep, Snyk / Trivy, OWASP ZAP, HashiCorp Vault, Checkov, OPA, Falco, AWS security services",
  career: "Security / DevOps Intern → Junior DevSecOps Engineer → DevSecOps Engineer → Senior Application / Cloud Security Engineer → Security Architect",
  plan: `
DevSecOps introduction | DevSecOps principles; Shift-left security; The DevSecOps engineer role; Security in the SDLC
Security fundamentals | The CIA triad; Threats and vulnerabilities; Authentication and authorisation; Cryptography basics
Linux and network security | Linux hardening; Network security basics; Firewalls; TLS
DevOps foundations | CI/CD concepts; Git; Containers; Cloud basics
Threat modelling | STRIDE; Data flow diagrams; Attack trees; Threat modelling in agile teams
Secure coding | The OWASP Top 10; Input validation; Secure authentication; Secure error handling
SAST | Static analysis concepts; SonarQube; Semgrep; Managing false positives
SCA | Software composition analysis; Dependency vulnerabilities; SBOMs; Licence compliance
Secrets | Secret scanning; HashiCorp Vault; Cloud secret managers; Rotating secrets
DAST | Dynamic testing concepts; OWASP ZAP; Burp Suite; API security testing
Container security | Image scanning with Trivy; Minimal base images; Runtime security; Container signing
Kubernetes security | RBAC; Pod security; Network policies; Admission controllers
IaC security | Terraform security scanning; Checkov; Policy as code with OPA; Drift detection
Cloud security | Cloud IAM; Cloud security posture management; Encryption; Logging and audit
Supply chain security | The SLSA framework; Sigstore; Build provenance; Securing CI/CD pipelines
Monitoring and detection | SIEM; Security logging; Alerting; Runtime detection with Falco
Incident response | The incident response process; Playbooks; Forensics basics; Postmortems
Compliance | Frameworks: SOC 2, ISO 27001 and PCI DSS; Compliance as code; Audits; Evidence automation
Security culture | Security champions; Training developers; Security metrics; Risk management
Professional DevSecOps | Secure pipeline walkthrough; Certifications; Career path; Interview concepts`},

"cyber-security": {
  about: "A cybersecurity professional protects systems, networks and data from attacks by monitoring threats, finding vulnerabilities, responding to incidents and enforcing security controls.",
  does: "Monitor alerts and investigate incidents in a SOC; Scan for and help remediate vulnerabilities; Test systems through ethical hacking; Harden networks, endpoints and cloud accounts; Support policies, compliance and security awareness",
  tools: "Linux, Windows, Wireshark, Nmap, Burp Suite, Metasploit, SIEM (Splunk / Sentinel), Nessus, Python",
  career: "SOC Analyst L1 / Security Intern → Security Analyst → Penetration Tester / Security Engineer → Senior Security Engineer → Security Architect / CISO track",
  plan: `
Cybersecurity introduction | Cybersecurity domains and careers; The CIA triad; Threat actors; Security frameworks overview
Networking for security | The OSI and TCP/IP models; IP, ports and protocols; DNS and HTTP; Network devices
Operating systems | Windows fundamentals; Linux fundamentals; The command line for security; Permissions and users
Security fundamentals | Authentication and authorisation; Access control models; Defence in depth; Least privilege
Cryptography | Symmetric encryption; Asymmetric encryption; Hashing; PKI and certificates
Threats and attacks | Malware types; Social engineering and phishing; Denial of service; Common attack vectors
Network security | Firewalls; IDS and IPS; VPNs; Network segmentation
Web security | The OWASP Top 10; SQL injection; Cross-site scripting; Authentication flaws
Vulnerability management | Vulnerability scanning; CVEs and CVSS; Patch management; Nessus and OpenVAS
Security tools | Wireshark; Nmap; Burp Suite; Metasploit overview
Security operations | SOC roles; SIEM; Log analysis; Alert triage
Incident response | The incident response lifecycle; Containment; Eradication and recovery; Lessons learned
Digital forensics | The forensics process; Disk and memory forensics; Evidence handling; Forensic tools
Ethical hacking | Penetration testing phases; Reconnaissance; Exploitation; Reporting
Identity security | IAM; Active Directory security; MFA and SSO; Zero trust
Cloud security | The shared responsibility model; Cloud IAM; Cloud misconfigurations; Cloud security tools
Threat intelligence | Types of threat intelligence; MITRE ATT&CK; Threat hunting; Indicators of compromise
Governance and compliance | Risk management; Security policies; Compliance frameworks; Security awareness
Emerging security | AI security; IoT and OT security; Mobile security; Supply-chain security
Professional cybersecurity | Security career paths; Certifications: Security+, CEH and OSCP; Planning a home lab; Interview concepts`},

"network-engineer": {
  about: "A network engineer designs, configures, secures and troubleshoots the networks that connect offices, data centres and cloud environments.",
  does: "Configure routers, switches, firewalls and wireless; Design IP addressing, VLANs and routing; Monitor performance and troubleshoot outages; Implement VPNs, SD-WAN and cloud connectivity; Automate network tasks",
  tools: "Cisco IOS / Juniper, Packet Tracer / GNS3, Wireshark, SNMP tools, Python, Ansible, cloud networking consoles",
  career: "Network Support / NOC Engineer → Network Engineer → Senior Network Engineer → Network Architect / Network Automation Engineer",
  plan: `
Networking introduction | The network engineer role; Network types: LAN, WAN and MAN; Topologies; Network devices
Network models | The OSI model; The TCP/IP model; Encapsulation; Protocols overview
Physical layer | Cabling; Wireless basics; Ethernet; Network interface cards
IP addressing | IPv4 addressing; Subnetting; CIDR; IPv6
Transport layer | TCP; UDP; Ports; The three-way handshake
Switching | How switches work; VLANs; Trunking; Spanning Tree Protocol
Routing basics | Routing concepts; Static routing; Routing tables; Default routes
Dynamic routing | RIP; OSPF; EIGRP; BGP introduction
Network services | DHCP; DNS; NAT; NTP
Device configuration | Cisco IOS basics; Router configuration; Switch configuration; Configuration management
Wireless networking | Wi-Fi standards; Access points and controllers; Wireless security; Site surveys
WAN technologies | WAN concepts; MPLS; SD-WAN; VPNs
Network security | Access control lists; Firewalls; Port security; Network hardening
Troubleshooting | Troubleshooting methodology; ping and traceroute; Packet analysis with Wireshark; Common network issues
Network monitoring | SNMP; Syslog; NetFlow; Monitoring tools
Network automation | Network automation concepts; Python for networking; Ansible for networks; APIs and NETCONF
Cloud networking | VPCs; Hybrid connectivity; Cloud load balancers; Cloud DNS
Data centre networking | Data centre design; Spine-leaf architecture; Virtualisation networking; SDN
High availability | Redundancy protocols: HSRP and VRRP; Link aggregation; Load balancing; Disaster recovery
Professional networking | Network design walkthrough; Certifications: CCNA and CCNP; Career path; Interview concepts`},

"software-architect": {
  about: "A software architect makes the high-level structural decisions for software systems, choosing architectural styles, technologies and boundaries while balancing quality attributes, cost and team needs.",
  does: "Define system architecture and technology choices; Evaluate trade-offs for scalability, security and cost; Document decisions and guide teams; Review designs and code for architectural fitness; Plan modernisation of legacy systems",
  tools: "UML / C4 diagrams, ADRs, cloud platforms, design pattern catalogues, architecture review frameworks (ATAM)",
  career: "Software Engineer → Senior Engineer → Tech Lead → Software Architect → Principal / Enterprise Architect",
  plan: `
The architect role | What a software architect does; Architect vs senior engineer; Architectural thinking; Stakeholders
Programming foundations | Multiple paradigms; Clean code; Design principles; SOLID
Design patterns | Creational patterns; Structural patterns; Behavioural patterns; Anti-patterns
Architecture fundamentals | Architecture characteristics; Trade-off analysis; Modularity; Coupling and cohesion
Architectural styles I | Layered; Event-driven; Microkernel; Pipeline
Architectural styles II | Microservices; Service-based; Space-based; Serverless
Domain-driven design | Strategic DDD; Bounded contexts; Context mapping; Tactical patterns
Data architecture | Database selection; Data modelling; Polyglot persistence; Data consistency
Integration | API design; Messaging; Event streaming; Integration patterns
Distributed systems | The CAP theorem; Consistency models; Distributed transactions; Resilience patterns
Cloud architecture | Cloud-native design; Well-Architected frameworks; Multi-cloud; Cost-aware design
Security architecture | Security by design; Identity architecture; Zero trust; Threat modelling
Performance and scalability | Scalability patterns; Caching architecture; Performance engineering; Capacity planning
Reliability | High availability; Disaster recovery; Observability; SRE practices
DevOps and delivery | CI/CD architecture; Infrastructure as code; Deployment strategies; Platform engineering
Documentation | The C4 model; Architecture decision records; Diagrams; Documentation as code
Evaluation | ATAM; Fitness functions; Architecture reviews; Technical debt management
Leadership | Communicating architecture; Influencing without authority; Mentoring; Negotiation
Modernisation | Legacy systems; The strangler fig pattern; Migration strategies; Evolutionary architecture
Professional architecture | Architecture case studies; Certifications; Career path; Interview concepts`},

qa: {
  about: "A QA engineer ensures software works as intended by designing test strategies, writing manual and automated tests, finding and reporting defects and guarding quality through CI/CD.",
  does: "Analyse requirements and write test plans and cases; Execute manual, exploratory and regression testing; Automate UI and API tests; Report and track defects; Run tests in CI and report quality metrics",
  tools: "Jira, Postman, Selenium / Playwright / Cypress, Java / Python, TestNG / pytest, SQL, Git, Jenkins / GitHub Actions, JMeter",
  career: "QA Intern / Test Engineer → QA Engineer → SDET / Automation Engineer → Senior SDET → QA Lead / Test Architect / Quality Manager",
  plan: `
QA introduction | QA vs testing vs quality control; The QA engineer role; The SDLC and STLC; The seven testing principles
Testing fundamentals | Verification and validation; Test levels: unit, integration, system and acceptance; Functional and non-functional testing; Static vs dynamic testing
Test design | Equivalence partitioning; Boundary value analysis; Decision tables; State transition testing
Test documentation | Test plans; Test cases; Test scenarios; The traceability matrix
Defect management | The bug life cycle; Writing bug reports; Severity vs priority; Jira for QA
Manual testing | Exploratory testing; Regression testing; Smoke and sanity testing; Usability testing
Agile testing | Agile and Scrum for QA; Testing in sprints; BDD with Gherkin; Shift-left testing
Web testing | Browser DevTools for testers; Cross-browser testing; Responsive testing; Accessibility testing
API testing I | API concepts; Postman; Requests and assertions; Collections and environments
API testing II | REST Assured or Playwright API testing; Contract testing; Mocking; API automation
Programming for QA | Java or Python for testers; OOP for automation; Collections; Exceptions
UI automation I | Selenium WebDriver; Locators; Waits; Actions
UI automation II | Playwright; Cypress; The Page Object Model; Test data management
Test frameworks | TestNG, JUnit and pytest; Assertions; Reporting; Data-driven testing
SQL for QA | SQL queries for testing; Data validation; Joins; Database testing
CI/CD for QA | Running tests in CI; GitHub Actions and Jenkins; Parallel execution; Test reporting
Performance testing | Types of performance testing; JMeter; k6; Analysing results
Mobile testing | Mobile testing challenges; Appium; Emulators and real devices; Mobile-specific testing
Security testing | Security testing basics; OWASP for testers; OWASP ZAP; Vulnerability reporting
Professional QA | Test strategy walkthrough; ISTQB certification; Career path to SDET; Interview concepts`},
});
