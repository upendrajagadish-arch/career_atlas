Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
"computer-science": {
  about: "Computer science fundamentals explain how computers, programs, operating systems, networks and databases actually work. These core subjects (OS, DBMS, CN, OOP, DSA) are tested in nearly every campus placement technical round.",
  prereq: "Basic programming in any language.",
  tools: "Any programming language (C / Java / Python), a Linux shell, Wireshark, SQL database",
  plan: `
Computing foundations | What computer science is; How computers work: hardware and software; Binary and number systems; Boolean logic and logic gates
Data representation | Integers and two's complement; Floating-point numbers; Characters, ASCII and Unicode; Images and sound as data
Programming fundamentals | Algorithms and pseudocode; Variables, control flow and functions; Programming paradigms; Compiled vs interpreted languages
Computer architecture | The CPU, registers and the instruction cycle; Memory hierarchy and caches; Assembly language basics; Buses and I/O
Complexity | Asymptotic notation; Time complexity; Space complexity; Analysing algorithms
Data structures I | Arrays; Linked lists; Stacks; Queues
Data structures II | Hash tables; Trees; Heaps; Graphs
Algorithms I | Searching; Sorting algorithms; Recursion; Divide and conquer
Algorithms II | Greedy algorithms; Dynamic programming; Graph traversal; Shortest paths
Discrete mathematics | Sets and logic; Proof techniques; Combinatorics; Graph theory
Operating systems I | The role of an OS; Processes and threads; CPU scheduling; System calls
Operating systems II | Memory management; Virtual memory and paging; File systems; Concurrency and deadlocks
Computer networks I | Network models: OSI and TCP/IP; IP addressing; TCP and UDP; Routing
Computer networks II | DNS; HTTP and HTTPS; Network security; Sockets
Databases | The relational model; SQL; Normalisation; Transactions and indexing
Software engineering | SDLC models; Requirements and design; Software testing; Version control
Theory of computation | Finite automata; Regular expressions and grammars; Turing machines; Computability and P vs NP
Compilers | Compiler phases; Lexing and parsing; Code generation; Optimisation
Security and distributed systems | Cryptography basics; Authentication; Distributed systems concepts; The CAP theorem
Professional computer science | AI and machine learning overview; Emerging areas: quantum computing and blockchain; Computer science careers; Interview concepts and career roadmap`},

"datastructures-and-algorithms": {
  about: "Data structures and algorithms (DSA) is the study of organising data and solving problems efficiently. DSA is the main filter in online assessments and technical interviews for software roles.",
  prereq: "One programming language (C++, Java or Python).",
  tools: "C++ / Java / Python, VS Code, LeetCode / GeeksforGeeks / Codeforces for reference",
  plan: `
DSA foundations | Why DSA matters; Complexity analysis with Big O; Best, average and worst case; Space complexity
Arrays | Array operations; The two-pointer technique; Sliding window; Prefix sums
Strings | String operations; String matching; Palindromes and anagrams; String-building patterns
Recursion | Recursion basics; Recursion trees; Introduction to backtracking; Tail recursion
Sorting | Bubble, selection and insertion sort; Merge sort; Quick sort; Counting and radix sort
Searching | Linear search; Binary search; Binary search on the answer; Searching rotated arrays
Linked lists | Singly linked lists; Doubly and circular lists; Fast and slow pointers; Reversal and merging
Stacks and queues | Stack implementation; Queues and deques; Monotonic stacks; Expression evaluation
Hashing | Hash tables; Collision handling; Hash maps and hash sets; Hashing problems
Trees I | Binary trees; Traversals; Height and diameter; Level-order traversal
Trees II | Binary search trees; BST operations; Balanced trees: AVL and Red-Black; Lowest common ancestor
Heaps | Binary heaps; Heap operations; Priority queues; Top-K problems
Graphs I | Graph representations; Breadth-first search; Depth-first search; Connected components
Graphs II | Topological sort; Dijkstra's shortest path; Bellman-Ford and Floyd-Warshall; Minimum spanning trees
Greedy algorithms | The greedy strategy; Interval scheduling; Huffman coding; Proving greedy choices
Dynamic programming I | Memoisation and tabulation; 1D DP; Knapsack problems; Longest common subsequence
Dynamic programming II | 2D grid DP; DP on strings; DP on trees; Bitmask DP
Advanced structures | Tries; Union-Find; Segment trees; Fenwick trees
Advanced algorithms | Backtracking problems; Bit manipulation; String algorithms: KMP and Rabin-Karp; Maths and number theory
Professional DSA | A problem-solving framework; Pattern recognition; Competitive programming; Interview concepts and career roadmap`},

leetcode: {
  about: "LeetCode-style preparation focuses on the coding-interview problem patterns asked by product companies and in online assessments, organised as a pattern-by-pattern study path.",
  prereq: "DSA fundamentals and one interview language.",
  tools: "LeetCode, a C++ / Java / Python environment, a whiteboard or notebook",
  plan: `
Interview problem solving | How coding interviews work; Understanding problem statements; A problem-solving framework; Complexity analysis in interviews
Arrays and hashing | Frequency counting; Hash map patterns; Prefix sums; Classic problems: two sum and group anagrams
Two pointers | Opposite-direction pointers; Same-direction pointers; Sorting plus two pointers; Classic problems: 3Sum and container with most water
Sliding window | Fixed-size windows; Variable-size windows; Windows with hash maps; Classic problem: longest substring without repeats
Stack | Stack patterns; Monotonic stacks; Parentheses problems; Classic problem: daily temperatures
Binary search | The binary search template; Searching the answer space; Rotated arrays; Classic problem: median of two sorted arrays
Linked lists | Reversal patterns; Fast and slow pointers; Merging lists; Classic problem: LRU cache
Trees | DFS patterns; BFS patterns; BST problems; Classic problem: serialise and deserialise a tree
Tries | Trie implementation; Word search; Autocomplete; Classic problem: word dictionary
Heaps | Top-K patterns; Two heaps; K-way merge; Classic problem: median from a data stream
Backtracking | Subsets; Permutations; Combination sum; N-Queens
Graphs I | Grid BFS and DFS; Number-of-islands problems; Clone graph; Cycle detection
Graphs II | Topological sort; Union-Find; Dijkstra; Classic problem: course schedule
1D dynamic programming | The climbing-stairs pattern; The house-robber pattern; Coin change; Longest increasing subsequence
2D dynamic programming | Grid paths; Edit distance; Longest common subsequence; Interval DP
Greedy and intervals | Greedy patterns; Merge intervals; Meeting rooms; Jump game
Maths and bits | Bit-manipulation tricks; Maths problems; Matrix problems; Geometry basics
Advanced topics | Segment trees in interviews; Advanced graph problems; String algorithms; Design problems
Interview communication | Thinking aloud; Clarifying questions; Testing your code; Handling hints
Interview strategy | Company-specific preparation; Time management in contests; Revision strategy; Behavioural interviews and offers`},

"system-design": {
  about: "System design is the skill of architecting scalable, reliable distributed systems: choosing databases, caches, queues and service boundaries and explaining the trade-offs. It is asked in SDE interviews from fresher-plus levels upward.",
  prereq: "Backend fundamentals, databases and networking basics.",
  tools: "Excalidraw / draw.io, a whiteboard, cloud architecture references",
  plan: `
System design introduction | What system design is; Functional vs non-functional requirements; Approaching design interviews; Back-of-the-envelope estimation
Networking basics | The client-server model; DNS; HTTP, TCP and UDP; REST, RPC and GraphQL
Scalability | Vertical vs horizontal scaling; Stateless services; Load balancing; Load-balancing algorithms
Databases I | SQL vs NoSQL; ACID and BASE; Indexing; Choosing a database
Databases II | Replication; Sharding and partitioning; Consistent hashing; Federation
Caching | Caching layers; Cache strategies; Eviction policies; Content delivery networks
Consistency | The CAP theorem; PACELC; Consistency models; Consensus: Raft and Paxos overview
Messaging | Message queues; Publish/subscribe; Kafka; Event-driven architecture
Architecture styles | Monolith vs microservices; Service-oriented architecture; Serverless; API gateways
Reliability | Availability and SLAs; Redundancy and failover; Circuit breakers; Rate limiting
Storage | Block, file and object storage; Blob storage; Data lakes; Search engines
Observability | Logging; Metrics; Tracing; Alerting
Security | Authentication and authorisation; Encryption; OAuth and SSO; DDoS protection
Distributed patterns | Idempotency; The saga pattern; CQRS and event sourcing; Distributed transactions
Design: URL shortener and rate limiter | URL shortener requirements; URL shortener design; Rate limiter design; Discussing trade-offs
Design: social and messaging | News feed design; Chat system design; Notification system design; Presence systems
Design: media and search | Video streaming platform; Search autocomplete; Web crawler; File storage service like Dropbox
Design: marketplaces | Ride-sharing service; E-commerce checkout; Payment system; Ticket booking
Low-level design | Object-oriented design; Design patterns in LLD; Parking lot design; The LLD interview approach
Professional system design | Real-world architecture case studies; Design reviews; Career growth; Interview concepts and career roadmap`},

"software-design-architecture": {
  about: "Software design and architecture covers clean code, OOP, SOLID, design patterns and architectural styles that make software maintainable and scalable. OOP and design-pattern questions appear in most developer interviews.",
  prereq: "Programming in an object-oriented language.",
  tools: "Java / C# / TypeScript / Python, UML and C4 diagram tools, an IDE with refactoring support",
  plan: `
Software design introduction | What software design and architecture are; Clean code principles; Naming and functions; Comments and formatting
Programming paradigms | Structured programming; Object-oriented programming; Functional programming; Choosing a paradigm
OOP principles | Abstraction; Encapsulation; Inheritance; Polymorphism
Design principles | DRY, KISS and YAGNI; Composition over inheritance; The Law of Demeter; Tell, don't ask
SOLID | Single responsibility; Open/closed; Liskov substitution; Interface segregation and dependency inversion
Creational patterns | Singleton; Factory method; Abstract factory; Builder and prototype
Structural patterns | Adapter; Decorator; Facade; Composite and proxy
Behavioural patterns I | Strategy; Observer; Command; Template method
Behavioural patterns II | State; Iterator; Chain of responsibility; Mediator and visitor
Refactoring | Code smells; Refactoring techniques; Testing for safe refactoring; Technical debt
Domain-driven design | Ubiquitous language; Entities and value objects; Aggregates; Bounded contexts
Architectural styles I | Layered architecture; Client-server; Pipe and filter; Event-driven
Architectural styles II | Hexagonal architecture; Clean architecture; Onion architecture; Microkernel
Distributed architecture | Microservices; Service-oriented architecture; Serverless; The modular monolith
Enterprise patterns | Repository; Unit of work; CQRS; Event sourcing
Quality attributes | Performance; Scalability; Maintainability; Security
Architecture documentation | The C4 model; UML diagrams; Architecture decision records; Views and viewpoints
Testing architecture | The test pyramid; Testing strategies; Contract testing; Architecture fitness functions
Integration patterns | Messaging patterns; API design; Data integration; Legacy modernisation
Professional architecture | Architecture case-study walkthrough; The role of an architect; Careers; Interview concepts and career roadmap`},

"code-review": {
  about: "Code review is the practice of examining code changes before they merge to catch defects, share knowledge and keep quality high. Knowing how to give and receive reviews is expected from day one in any engineering team.",
  prereq: "Git and basic programming.",
  tools: "GitHub / GitLab pull requests, linters, static analysis (SonarQube, Semgrep), AI review tools",
  plan: `
Code review introduction | Why code review matters; Goals: quality, knowledge sharing and mentoring; Types of review: pull requests and pair review; The cost of defects
The review process | The pull request lifecycle; Roles: author and reviewer; Review checklists; Turnaround expectations
Preparing code for review | Small, focused changes; Writing pull request descriptions; Self-review; Commit hygiene
What to look for I | Correctness; Readability and naming; Design and structure; Simplicity
What to look for II | Tests; Error handling; Edge cases; Documentation
Giving feedback | Constructive comments; Asking questions; Prioritising feedback; Comment labels: nit, suggestion, blocking
Receiving feedback | Responding to comments; Handling disagreement; Learning from reviews; Avoiding defensiveness
Readability | Clean code in reviews; Function size; Duplication; Consistency with codebase conventions
Design review | Architecture concerns; SOLID in reviews; Coupling and cohesion; API design review
Testing review | Test coverage; Test quality; Testability; Flaky tests
Security review | The OWASP Top 10 in reviews; Input validation; Authentication and secrets; Dependency risks
Performance review | Algorithmic complexity; Database queries; Memory usage; Concurrency issues
Automation | Linters and formatters; Static analysis; CI checks; Bots and automated reviews
Tools | GitHub pull requests; GitLab merge requests; Gerrit; Review analytics
AI-assisted review | AI code review tools; Reviewing AI-generated code; Limits of AI review; Combining human and AI review
Team practices | Review culture; Review guidelines; Reviewer rotation; Remote reviews
Metrics | Review time; Review depth; Defect detection; Avoiding harmful metrics
Scaling reviews | Large pull requests; Monorepos; CODEOWNERS; Cross-team reviews
Special cases | Reviewing infrastructure code; Reviewing database migrations; Reviewing UI changes; Reviewing documentation
Professional code review | Code review case studies; Mentoring through review; Career impact; Interview concepts and career roadmap`},

"claude-code": {
  about: "Claude Code is Anthropic's agentic coding tool that works in the terminal and IDE, reading a repository, planning changes, editing files and running commands. Using such AI coding agents safely and productively is now a valued engineering skill.",
  prereq: "Programming basics, Git and terminal comfort.",
  tools: "Claude Code CLI, Git, a terminal, VS Code / JetBrains, test runners and linters",
  plan: `
AI coding assistants | The AI coding tools landscape; What Claude Code is; How agentic coding works; Benefits and risks
Installation and setup | Installing Claude Code in the terminal; Authentication and accounts; Project permissions; Configuration files
Context | Repository context files (CLAUDE.md); How context windows work; Providing relevant files; Managing context size
Basic workflows | Asking questions about a codebase; Explaining code; Making small edits; Running commands
Prompting for code | Writing clear task instructions; Specifying constraints; Examples and acceptance criteria; Iterating on output
Task decomposition | Planning bounded edits; Breaking features into steps; Plan mode; Checkpoints
Reviewing generated code | Reading diffs; Spotting hallucinated APIs; Verifying logic; Rejecting unsafe changes
Testing with AI | Running tests and linters; Generating tests; Test-driven prompts; Fixing failing tests
Git workflows | Working with branches; Commits and messages; Pull requests; Resolving conflicts
Debugging | Reproducing bugs; Reading logs and stack traces; Root-cause analysis; Verifying fixes
Tools and MCP | The Model Context Protocol; Connecting tools; Custom slash commands; Hooks
Subagents and automation | Subagents; Headless mode; Scripting Claude Code; CI integration
Security I | Prompt-injection defence; Untrusted content; Secrets handling; Permission modes
Security II | Reverting unsafe edits; Sandboxing; Auditing actions; Compliance considerations
Large codebases | Navigating monorepos; Refactoring at scale; Migration tasks; Documentation generation
Team usage | Shared configuration; Team conventions; Human approval workflows; Code review of AI changes
Quality | Verified pull requests; Measuring AI impact; Avoiding over-reliance; Maintaining code quality
Advanced patterns | Multi-step agentic workflows; Parallel sessions; Custom agents; Using the SDK
Comparisons | Claude Code vs Cursor vs Copilot; Choosing the right tool; Cost management; Model selection
Professional AI-assisted development | Real-world workflow walkthrough; Ethics and responsibility; Careers; Interview concepts and career roadmap`},

"vibe-coding": {
  about: "Vibe coding means building software by describing what you want in natural language and iterating with AI tools, while still reviewing, testing and securing what gets generated. It is increasingly used for rapid prototyping and MVPs.",
  prereq: "Basic computer skills; programming basics strongly recommended.",
  tools: "Cursor, Replit, Lovable, Bolt, v0, Git, Supabase / Firebase, Vercel",
  plan: `
Vibe coding introduction | What vibe coding is; Natural-language programming; Tools: Cursor, Replit, Lovable, Bolt and v0; Strengths and limits
Problem framing | Defining a user story; Sketching user flows; Writing a product brief; Choosing a minimal stack
Prompting for apps | Describing features clearly; Iterative prompting; Providing examples and screenshots; Constraining output
First prototype | Generating a starter app; Understanding project structure; Running locally; Building in small increments
Reading generated code | Code-reading basics; Understanding components and files; What each part does; Asking the AI to explain code
Inspecting changes | Reviewing every file diff; Version control with Git; Undoing bad changes; Checkpoints
Dependencies | Checking dependencies; Package managers; Avoiding risky packages; Licences
UI building | Building UI prototypes; Styling with Tailwind; Responsive design; Design consistency
Data and backends | Databases with Supabase or Firebase; APIs; Authentication; Storage
Validation | Validating input data; Error handling; Edge cases; Form validation
Testing | Writing automated tests with AI; Manual testing checklists; Regression testing; Test-driven prompting
Debugging | Reading error messages; Debugging with AI; Breaking loops of failed fixes; Asking for root causes
Security | Security review; Secrets and API keys; Authentication pitfalls; Common vulnerabilities in AI-generated code
Accessibility and quality | Accessibility review; Performance basics; Code quality; Refactoring
Integrations | Payments; Email; AI APIs; Third-party services
Deployment | Deploying a staging build; Vercel and Netlify; Environment variables; Custom domains
Maintenance | Maintaining and refactoring; Documentation; Handling growth; When to rewrite
Collaboration | Working with developers; Handoff; Code ownership; Team workflows
Responsible vibe coding | Limits of AI; Technical debt; Ethics; Learning fundamentals alongside AI
Professional vibe coding | Case studies of shipped apps; Product thinking; Careers; Interview concepts and career roadmap`},

openclaw: {
  about: "OpenClaw is an open-source, self-hosted personal AI agent that connects a language model to messaging apps, email, calendars, files and tools so it can carry out tasks autonomously. Running such agents safely requires strong permissions, auditing and security discipline.",
  prereq: "Terminal comfort, basic networking and an understanding of LLMs.",
  tools: "OpenClaw, an LLM provider API key or local model, Docker / a VPS, messaging app connectors",
  plan: `
Personal AI agents | What OpenClaw is: a self-hosted personal AI agent; How autonomous agents differ from chatbots; Use cases and limits; Architecture overview
Installation | System requirements; Local installation; Choosing and connecting an LLM provider; Install boundaries and isolation
Threat model | Agent threat modelling; Attack surfaces; Prompt-injection risks; Trust boundaries
Authentication and access | Authentication; Access permissions; Least privilege; Account separation
Connectors | Messaging connectors: WhatsApp, Telegram and Slack; Email and calendar connectors; Connector scopes; Revoking access
Skills and tools | Built-in skills; Installing community skills; Reviewing skill code; Skill permissions
Tasks and triggers | Defining tasks; Triggers and schedules; Heartbeats and proactive tasks; Task boundaries
Memory | Agent memory; Context persistence; Memory privacy; Clearing memory
Workflow simulation | Dry runs; Simulating workflows; Sandboxed execution; Validating outcomes
Tool invocation auditing | Logging tool calls; Reviewing actions; Audit trails; Alerting on risky actions
Workflow automation | Multi-step automations; Chaining tools; Browser automation; File-system actions
Error handling | Failure modes; Retries; Fallbacks; Recovering from bad actions
Secrets | Secret storage; Environment variables; Rotating keys; Avoiding secret leakage
Untrusted input | Untrusted input boundaries; Content from email and the web; Sanitisation; Isolation strategies
Custom skills | Writing a custom skill; Skill structure; Testing skills; Sharing skills safely
Human-in-the-loop | Approval workflows; Confirmation prompts; Risk tiers; Escalation
Observability | Logs; Monitoring; Usage and cost tracking; Debugging agent behaviour
Safe operations | Safe teardown; Backups; Updates; Incident response
Deployment options | Running on a home server; Running on a VPS; Containers; Remote-access security
Professional agent operations | Agent use-case walkthrough; Governance and policy; Careers in AI automation; Interview concepts and career roadmap`},

"ai-product-builder": {
  about: "AI product building is the discipline of turning AI models into useful, trustworthy products: framing the problem, choosing models, designing prompts and retrieval, crafting UX for uncertainty and evaluating quality, cost and safety.",
  prereq: "Product or programming basics; familiarity with LLM tools.",
  tools: "LLM APIs (OpenAI, Anthropic, Gemini), vector databases, no-code AI builders, evaluation tools, analytics",
  plan: `
AI product introduction | What AI products are; The AI product lifecycle; Roles in AI product teams; Examples of successful AI products
Problem framing | Framing the problem; User research for AI; Jobs to be done; When AI is the right solution
Model landscape | LLMs and foundation models; Model capability boundaries; Open vs closed models; Model selection criteria
Build vs buy | Build-versus-buy choices; APIs vs self-hosting; Vendor evaluation; Cost models
Prompt design | Prompt design basics; System prompts; Few-shot examples; Prompt iteration
Structured outputs | Structured model outputs; JSON schemas; Function calling; Output validation
Retrieval | Embeddings; Vector databases; Retrieval-augmented generation; Chunking strategies
Tool integration | Tool use; Agents; Workflow orchestration; Integrating with existing systems
AI UX | UX for uncertainty; Conversational design; Feedback mechanisms; Trust and transparency
Prototyping | No-code AI tools; Rapid prototyping; Demo vs product; Prototype deployment
Evaluation | Output evaluation; Evaluation datasets; LLM-as-judge; Human evaluation
Quality | Hallucinations; Guardrails; Testing AI features; Regression testing
Privacy and safety | Data privacy; Responsible AI; Bias and fairness; Content safety
Cost and latency | Latency and costs; Token economics; Caching; Model routing
Metrics | Product metrics for AI; User engagement; Business impact; Experimentation
Iteration | Iterating on user feedback; Fine-tuning vs prompting; Continuous improvement; Roadmapping
Go-to-market | Positioning AI products; Pricing AI features; Launch strategy; Communicating limitations
Operations | Monitoring in production; Incident handling; Model updates; Vendor management
Regulation | AI regulations; Compliance; Intellectual property; Governance
Professional AI product building | AI product case studies; Product strategy; Careers; Interview concepts and career roadmap`},

"prompt-engineering": {
  about: "Prompt engineering is the craft of instructing large language models to produce accurate, reliable and safe outputs, using techniques like few-shot examples, chain-of-thought, structured outputs and retrieval.",
  prereq: "None; programming helps for API-based topics.",
  tools: "ChatGPT / Claude / Gemini, LLM APIs and playgrounds, prompt evaluation tools (promptfoo)",
  plan: `
LLM foundations | What large language models are; Tokens and context windows; How LLMs generate text; Model families and capabilities
Prompting basics | Anatomy of a prompt; Writing clear instructions; Roles and personas; Output formats
Zero-shot and few-shot | Zero-shot prompting; Few-shot prompting; Choosing examples; Example-ordering effects
Parameters | Temperature; Top-p and top-k; Max tokens and stop sequences; Frequency and presence penalties
Reasoning prompts | Chain-of-thought; Step-by-step decomposition; Self-consistency; Reasoning models
Structured outputs | JSON output; Schemas; Function calling; Parsing and validation
Advanced techniques | Tree of thoughts; ReAct; Prompt chaining; Meta-prompting
Context engineering | System prompts; Context management; Long-context strategies; Summarisation
Retrieval-augmented generation | RAG concepts; Embeddings; Grounding responses; Citations
Domain prompting | Prompts for coding; Prompts for writing; Prompts for data analysis; Prompts for customer support
Image and multimodal | Image-generation prompts; Vision prompts; Audio and speech; Multimodal workflows
Evaluation | Evaluating prompts; Test sets; Automated evaluations; A/B testing prompts
Reliability | Hallucination mitigation; Consistency; Edge cases; Prompt versioning
Security | Prompt injection; Jailbreaks; Data leakage; Defence strategies
Agents | Agent prompting; Tool descriptions; Planning prompts; Multi-agent systems
Optimisation | Token efficiency; Cost optimisation; Latency; Prompt compression
Prompt management | Prompt libraries; Templates; Version control; Collaboration
Fine-tuning vs prompting | When to fine-tune; Data preparation; Distillation; Trade-offs
Ethics | Bias; Responsible use; Transparency; Usage policies
Professional prompt engineering | Real-world case studies; Building prompt-driven products; Careers; Interview concepts and career roadmap`},

"ai-red-teaming": {
  about: "AI red teaming is adversarial testing of AI systems to uncover safety, security and misuse risks such as prompt injection, jailbreaks, data leakage and harmful outputs before attackers or users do.",
  prereq: "LLM fundamentals and basic security concepts.",
  tools: "LLM APIs, Garak, PyRIT, promptfoo, Python, OWASP LLM Top 10 and MITRE ATLAS references",
  plan: `
AI red teaming introduction | What AI red teaming is; Why AI systems need adversarial testing; Red teaming vs traditional penetration testing; Ethics and rules of engagement
AI fundamentals | How LLMs work; Training and alignment; Safety measures in models; AI system components
Threat landscape | AI threat taxonomy; OWASP Top 10 for LLM applications; MITRE ATLAS; Real-world AI incidents
Prompt injection | Direct prompt injection; Indirect prompt injection; Injection payload design; Impact assessment
Jailbreaking | Jailbreak concepts; Role-play and persona attacks; Obfuscation techniques; Multi-turn attacks
Data attacks | Training-data poisoning; Data extraction; Membership inference; Privacy attacks
Model attacks | Adversarial examples; Model extraction; Model inversion; Evasion attacks
Application attacks | Insecure output handling; Excessive agency; Plugin and tool abuse; Supply-chain risks
Agent attacks | Attacking autonomous agents; Tool misuse; Goal hijacking; Memory poisoning
RAG attacks | Poisoning knowledge bases; Retrieval manipulation; Document injection; Exfiltration via RAG
Methodology | Planning an engagement; Threat modelling AI systems; Test-case design; Scoping
Tools | Garak; PyRIT; promptfoo; Custom test harnesses
Automated red teaming | Automated attack generation; LLM-vs-LLM testing; Fuzzing; Scaling tests
Harm categories | Harmful content; Bias and fairness testing; Misinformation; Privacy harms
Multimodal attacks | Image-based injection; Audio attacks; Cross-modal attacks; Steganography
Defences | Input filtering; Output filtering; Guardrails; Defence in depth
Evaluation | Measuring attack success; Safety benchmarks; Severity scoring; Regression testing
Reporting | Writing findings; Responsible disclosure; Remediation advice; Communicating with stakeholders
Governance | AI regulations; Standards such as the NIST AI RMF; Compliance testing; Policy
Professional AI red teaming | Case studies; Building a red team; Careers; Interview concepts and career roadmap`},

"ai-agents": {
  about: "AI agents are systems where a language model plans and takes actions using tools, memory and feedback loops to complete multi-step goals. Building reliable, safe agents is one of the fastest-growing engineering skills.",
  prereq: "Python or TypeScript and LLM API basics.",
  tools: "LLM APIs, LangGraph / OpenAI Agents SDK / Claude Agent SDK, MCP, vector databases, tracing tools",
  plan: `
AI agents introduction | What AI agents are; Agents vs chatbots vs workflows; Agent components: model, tools and memory; Agent use cases
LLM fundamentals for agents | LLM capabilities; Context windows; Reasoning models; Choosing a model
Tool use | Function calling; Tool schemas; Tool selection; Handling tool results
Agent loops | The ReAct pattern; Plan-and-execute; Reflection; Stopping conditions
Prompting agents | System prompts for agents; Writing tool descriptions; Guiding behaviour; Error-recovery prompts
Memory | Short-term memory; Long-term memory; Vector stores; Memory management
RAG for agents | Retrieval tools; Agentic RAG; Knowledge bases; Citations
Frameworks I | LangChain; LangGraph; LlamaIndex; Framework trade-offs
Frameworks II | OpenAI Agents SDK; Claude Agent SDK; CrewAI; AutoGen
Model Context Protocol | MCP concepts; MCP servers; MCP clients; Building MCP tools
Multi-agent systems | Multi-agent architectures; Orchestrator-worker; Agent communication; Handoffs
Workflows | Workflows vs agents; Routing; Parallelisation; Human-in-the-loop
Computer and browser use | Browser agents; Computer use; Web-scraping agents; Reliability challenges
Coding agents | Coding agent architecture; Sandboxes; Code-execution tools; Review loops
Evaluation | Agent evaluation; Trajectory evaluation; Benchmarks; Evaluation frameworks
Observability | Tracing agent runs; LangSmith and similar tools; Debugging agents; Cost tracking
Safety | Guardrails; Permissions; Prompt injection in agents; Sandboxing
Production | Deploying agents; Scaling; Latency and cost optimisation; Error handling
Advanced | Agent fine-tuning; Self-improving agents; Long-running agents; Agent-to-agent protocols
Professional AI agents | Agent case studies; Product design for agents; Careers; Interview concepts and career roadmap`},
});
