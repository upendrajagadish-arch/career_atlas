Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
'servicenow-developer': {
  about: "A ServiceNow developer builds and customises applications on the ServiceNow platform — IT service management (ITSM), workflows, portals and integrations — for the enterprises and IT-services firms that run their operations on it. Freshers usually join as Associate / Trainee ServiceNow Developers and prepare for the CSA and CAD certifications.",
  does: "Configure ITSM modules: incident, problem, change and request; Build tables, forms, UI policies and client scripts; Write server-side business rules, script includes and scheduled jobs in JavaScript; Create catalog items, record producers and Flow Designer flows; Build Service Portal widgets and integrate with REST/SOAP APIs; Move work between instances with update sets and follow ACL security rules",
  tools: "ServiceNow Personal Developer Instance (PDI), JavaScript, Glide APIs (GlideRecord, GlideAjax, GlideSystem), Flow Designer, IntegrationHub, Service Portal (AngularJS), REST API Explorer, Update Sets, ATF, Studio / App Engine",
  career: "ServiceNow Trainee / Associate Developer → ServiceNow Developer (CSA, CAD) → Senior Developer / CIS-ITSM Implementation Specialist → Technical Lead → ServiceNow Architect (CTA)",
  plan: `
ServiceNow and ITSM foundations | What ServiceNow is and who uses it; ITIL and IT service management basics; The ServiceNow career path and certifications; Getting a Personal Developer Instance
Platform user interface | Navigating the Next Experience UI; Lists, filters and breadcrumbs; Forms, related lists and views; Personalising the platform
Data model essentials | Tables, records and fields; Table inheritance: Task and its children; Reference fields and dictionary entries; Schema map and data dictionary
Users, groups and roles | Users and user administration; Groups and assignment; Roles and role inheritance; Impersonation for testing
ITSM core processes | Incident management; Problem management; Change management; Request fulfilment
Form and list configuration | Form layout and form designer; UI policies; Data policies; List and form views per role
Service catalog | Catalog items and categories; Variables and variable sets; Record producers; Order guides
Notifications and knowledge | Email notifications and templates; Events and the event queue; Knowledge bases and articles; Service level agreements (SLAs)
Reporting and dashboards | Reports and data sources; Dashboards; Performance Analytics overview; Import sets and transform maps
CSA certification review | CSA exam blueprint walkthrough; Configuration vs customisation; Upgrade-safe practices; CSA sample questions explained
JavaScript for ServiceNow | JavaScript refresher for the platform; Client-side vs server-side scripting; Script debugging tools; Scripting best practices
Client scripting | Client scripts: onLoad, onChange and onSubmit; The g_form and g_user APIs; UI policies vs client scripts; GlideAjax for server calls
Server scripting | Business rules: before, after, async and display; GlideRecord queries and updates; GlideSystem (gs) utilities; Script includes
Advanced scripting | UI actions; Scheduled jobs; Fix scripts and background scripts; GlideAggregate and GlideDateTime
Workflow automation | Flow Designer basics; Triggers, actions and subflows; Approvals and conditions; Legacy Workflow Editor vs flows
Security | Access control lists (ACLs); Roles and ACL evaluation order; Data security and encryption; Debugging security rules
Integrations | REST and SOAP web services; Scripted REST APIs; Outbound REST messages; IntegrationHub spokes and MID Server
Service Portal and UI | Service Portal architecture; Widgets: HTML, client and server scripts; Themes and portal pages; UI Builder and Workspaces overview
Application development | Scoped applications and Studio; Update sets and instance migration; Automated Test Framework (ATF); Instance upgrades and cloning
Professional ServiceNow development | CAD certification review; A ServiceNow project lifecycle in IT services; Common ServiceNow interview questions; Building a ServiceNow portfolio on a PDI`},

'salesforce-developer': {
  about: "A Salesforce developer builds and customises CRM solutions on the Salesforce platform using clicks (declarative tools) and code (Apex, SOQL and Lightning Web Components). Freshers join as Salesforce Developer / Associate Consultant trainees and are expected to clear the Salesforce Administrator and Platform Developer I (PD1) certifications.",
  does: "Configure objects, fields, page layouts and security for business users; Automate processes with Flows and validation rules; Write Apex classes, triggers and test classes that follow governor limits; Query data with SOQL and SOSL; Build user interfaces with Lightning Web Components; Integrate Salesforce with other systems using REST/SOAP APIs and deploy with change sets or SFDX",
  tools: "Salesforce Developer Edition org, Trailhead, Setup & Object Manager, Flow Builder, Apex, SOQL / SOSL, Lightning Web Components (JavaScript), Salesforce CLI (SFDX), VS Code with Salesforce Extensions, Data Loader, Workbench, Git",
  career: "Salesforce Trainee / Associate Developer → Salesforce Developer (Admin, PD1) → Senior Developer (PD2) → Technical Lead / Consultant → Salesforce Technical Architect (CTA)",
  plan: `
Salesforce and CRM foundations | What CRM is and why companies use Salesforce; Salesforce clouds and editions; Multi-tenant architecture and releases; Trailhead, Developer Edition and the certification path
Salesforce data model | Standard and custom objects; Field types; Relationships: lookup, master-detail and junction objects; Schema Builder
User interface configuration | Page layouts and record types; Lightning App Builder; Compact layouts and list views; Apps, tabs and navigation
Data quality and formulas | Validation rules; Formula fields; Roll-up summary fields; Picklists and dependent picklists
Security model | Organisation-wide defaults; Profiles and permission sets; Role hierarchy; Sharing rules and manual sharing
Data management | Importing data with the Data Import Wizard; Data Loader; Duplicate and matching rules; Data backup and recycle bin
Declarative automation | Flow Builder fundamentals; Record-triggered flows; Screen flows; Approval processes
Sales and service processes | Leads, accounts, contacts and opportunities; Cases and service processes; Reports and report types; Dashboards
Administrator certification review | Admin exam blueprint walkthrough; Order of execution overview; Choosing clicks vs code; Admin sample questions explained
Apex fundamentals | Apex language basics and data types; Collections: lists, sets and maps; Classes, methods and access modifiers; Developer Console and VS Code setup
SOQL and SOSL | SOQL query syntax; Relationship queries; Aggregate queries; SOSL searches
DML and governor limits | DML statements and Database methods; Governor limits explained; Bulkification patterns; Exception handling in Apex
Apex triggers | Trigger events and context variables; Trigger handler pattern; Recursion control; Order of execution in depth
Asynchronous Apex | Future methods; Queueable Apex; Batch Apex; Scheduled Apex
Apex testing | Test classes and test data; Assertions and code coverage; Test.startTest and governor limits; Mocking callouts
Lightning Web Components basics | LWC architecture and component structure; Templates, data binding and events; Lightning Data Service and wire adapters; Calling Apex from LWC
Lightning Web Components in depth | Component communication; Lightning Message Service; Navigation and toasts; LWC testing with Jest
Integration | Salesforce REST and SOAP APIs; Apex callouts and named credentials; Platform events; Connected apps and OAuth
Deployment and DevOps | Sandboxes and environments; Change sets; Salesforce CLI and scratch orgs; Git-based deployment and DevOps Center
Platform Developer I and career | PD1 exam blueprint walkthrough; PD1 sample questions explained; A Salesforce project lifecycle in IT services; Salesforce developer interview questions`},

'sap-abap-developer': {
  about: "An SAP ABAP developer writes and enhances programs inside SAP ERP and SAP S/4HANA — reports, forms, interfaces and enhancements — for the finance, supply-chain and HR processes that large enterprises run on SAP. IT-services firms and GCCs hire freshers as SAP technical trainees.",
  does: "Build classical, ALV and CDS-based reports; Create data dictionary objects: tables, structures and views; Write enhancements with user exits, BAdIs and enhancement points; Build forms with SmartForms and Adobe Forms; Develop interfaces with RFC, BAPI, IDoc and OData; Tune performance and follow transport and code-review practices",
  tools: "SAP GUI, ABAP Workbench (SE80, SE38, SE11), ABAP Development Tools in Eclipse, SAP S/4HANA, CDS views, OData / SAP Gateway, SAP Fiori, SmartForms, Adobe Forms, BAPI / RFC / IDoc, Transport Management",
  career: "SAP Technical Trainee → Associate ABAP Developer → ABAP / S/4HANA Developer → Senior Technical Consultant → SAP Technical Architect",
  plan: `
SAP and ERP foundations | What ERP is and how businesses run on SAP; SAP modules: FI, CO, MM, SD and HR; SAP R/3 vs S/4HANA; The SAP technical consultant career
SAP system landscape | Three-tier architecture; Development, quality and production systems; Clients and transports; Navigating SAP GUI and transaction codes
ABAP language basics | ABAP syntax and program structure; Data types and data objects; Operators and expressions; Control statements
Data dictionary | Domains and data elements; Transparent tables; Structures and table types; Views and search helps
Working with data | Open SQL SELECT statements; Internal tables; Work areas and field symbols; INSERT, UPDATE, MODIFY and DELETE
Modularisation | Subroutines; Function modules and function groups; Includes and macros; Selection screens
Reports | Classical reports; Interactive reports; ALV reports; Report events and messages
Dialog programming | Module pool basics; Screens and the flow logic; Table controls; Screen validations
Object-oriented ABAP | Classes and objects; Inheritance and interfaces; Exception classes; Design patterns in ABAP
Forms | SAPscript overview; SmartForms; Adobe Forms; Choosing the right form technology
Enhancements | User exits and customer exits; BAdIs; Enhancement framework and implicit enhancements; Modification vs enhancement
Interfaces | RFC and remote function calls; BAPIs; IDocs and ALE; File interfaces
Data migration | BDC batch input sessions; Call transaction; LSMW overview; S/4HANA Migration Cockpit
Performance and quality | Performance analysis with ST05 and SAT; Efficient SQL and indexes; Code Inspector and ATC checks; Debugging techniques
ABAP on HANA | HANA database concepts; Code pushdown; ABAP Managed Database Procedures (AMDP); New ABAP syntax (7.4+)
Core Data Services | CDS view basics; Associations and annotations; CDS for analytics; Access control in CDS
OData and Fiori | SAP Gateway and OData services; Creating an OData service from CDS; SAP Fiori and UI5 overview; Fiori elements
RESTful programming model | ABAP RESTful Application Programming Model (RAP); Behaviour definitions; Managed and unmanaged scenarios; Draft handling
SAP BTP and the cloud | SAP Business Technology Platform overview; ABAP Cloud and the clean core; Side-by-side extensions; SAP integration suite overview
Professional SAP development | An SAP implementation project lifecycle; Transport and release management; SAP ABAP interview questions; Certification path: SAP Certified Associate`},

'rpa-developer': {
  about: "An RPA (Robotic Process Automation) developer builds software bots that automate repetitive, rule-based work such as data entry, invoice processing and report generation. Services firms, banks and GCCs hire freshers to build and support bots in UiPath, Automation Anywhere or Power Automate.",
  does: "Analyse business processes and document automation candidates; Build bots that work with web apps, desktop apps, Excel, PDFs and email; Handle exceptions, logging and retries so bots run unattended; Deploy, schedule and monitor bots through an orchestrator; Use document understanding and AI to process unstructured data; Maintain and improve bots in production",
  tools: "UiPath Studio, UiPath Orchestrator, UiPath REFramework, Automation Anywhere A360, Microsoft Power Automate, Excel, SQL, Python / VB.NET basics, Document Understanding / OCR, Git",
  career: "RPA Trainee → Associate RPA Developer → RPA Developer (UiPath Certified) → Senior RPA Developer / Solution Architect → Automation CoE Lead",
  plan: `
Automation foundations | What RPA is and where it fits; RPA vs traditional automation and AI; Attended vs unattended bots; RPA tools and the certification path
Process analysis | Identifying automation candidates; Process definition documents (PDD); Solution design documents (SDD); Calculating automation ROI
UiPath Studio basics | Installing UiPath Studio and Community edition; The Studio interface; Sequences, flowcharts and state machines; Activities and properties
Variables and data | Variables, arguments and scope; Data types in UiPath; Collections: arrays, lists and dictionaries; DataTables
Control flow | If, Switch and Flow Decision; Loops: For Each, While and Do While; Breaking and continuing loops; Invoke Workflow and reuse
UI automation | Recording and the Modern Design experience; Selectors and anchors; Click, type and get text; Handling dynamic selectors
Application automation | Web automation and browsers; Desktop application automation; Citrix and virtual environments; Image and OCR-based automation
Excel and data automation | Excel activities and workbooks; Reading, filtering and writing DataTables; Data manipulation with LINQ basics; CSV and database activities
Email and PDF automation | Reading and sending email; Extracting data from PDFs; Document Understanding overview; Working with files and folders
Error handling | Try Catch and Throw; Business vs system exceptions; Retry Scope; Logging and debugging
Robotic Enterprise Framework | REFramework architecture; Config file and initialisation; Transaction processing with queues; Exception handling in REFramework
Orchestrator | Orchestrator concepts: tenants, folders and robots; Publishing and deploying packages; Queues and transactions; Triggers, schedules and monitoring
Automation best practices | Naming conventions and project structure; Reusable libraries; Credential and asset management; Code reviews and the Workflow Analyzer
Advanced UiPath | Invoke Code and .NET basics; API integration with HTTP Request; Integration Service and connectors; Long-running workflows and Action Center
AI and intelligent automation | Document Understanding in depth; AI Center and ML skills; Communications Mining overview; Generative AI in automation
Automation Anywhere | Automation Anywhere A360 overview; Bot creation and the Control Room; Variables, packages and actions; Comparing UiPath and Automation Anywhere
Microsoft Power Automate | Power Automate cloud flows; Power Automate Desktop; Connectors and triggers; When to choose Power Automate
Testing and deployment | Testing bots with UiPath Test Suite; Environments and promotion; Version control with Git; Change management for bots
Operations and support | Bot monitoring and alerts; Incident handling for bots; Maintenance and break-fix; Measuring bot performance
Professional RPA development | An automation CoE and delivery model; UiPath Associate certification review; RPA developer interview questions; Building an RPA portfolio`},
});
