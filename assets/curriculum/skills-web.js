Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
html: {
  about: "HTML (HyperText Markup Language) defines the structure and meaning of web content. Every website starts with HTML, and semantic, accessible markup is a core expectation for frontend and full-stack roles.",
  prereq: "None. Basic computer and browser use.",
  tools: "VS Code, Live Server, Chrome / Edge DevTools, W3C validator",
  plan: `
How the web works | Internet, browsers, servers and HTTP; What HTML is and how browsers render it; Setting up VS Code and Live Server; Document structure: doctype, html, head, body
Text content | Headings and paragraphs; Text formatting elements; Lists: ordered, unordered and description; Quotes, code and preformatted text
Links and media | Anchors and URLs: absolute vs relative; Images, alt text and formats; Audio and video; iframes and embeds
Tables | Table structure; Headers, captions and scope; Merging cells; When to use tables
Forms I | The form element, action and method; Input types; Labels and accessibility; Buttons
Forms II | select, textarea and datalist; fieldset and legend; Built-in validation attributes; The form submission flow
Semantic HTML | Why semantics matter; header, nav, main and footer; article, section and aside; figure, time and mark
Head and metadata | meta tags and charset; The viewport meta tag for mobile; Linking CSS, scripts and favicons; Open Graph and social metadata
Accessibility | Accessibility principles and WCAG; Landmarks and heading hierarchy; ARIA roles and attributes; Keyboard navigation and focus
Responsive media | Responsive images with srcset and sizes; The picture element; Lazy loading; SVG in HTML
SEO fundamentals | How search engines read HTML; Titles, descriptions and headings; Structured data with schema.org; Canonical URLs and robots directives
HTML APIs | Canvas basics; Drag and drop; The dialog element; details and summary
HTML with CSS and JavaScript | Classes and IDs; data attributes; Script loading with defer and async; template and slot
Web components | Custom elements; Shadow DOM; HTML templates; Using web components
Performance | The critical rendering path; Resource hints: preload and prefetch; Image optimisation; Core Web Vitals and HTML
Validation and tooling | HTML validators; The DevTools Elements panel; Emmet; Formatting and linting
Email and print HTML | HTML email constraints; Print-friendly markup; Microdata; Internationalisation and the lang attribute
Security | Safe links with rel noopener; Form security and CSRF tokens; Content Security Policy basics; Sandboxed iframes
HTML in frameworks | JSX vs HTML; Templates in Vue and Angular; Server-side rendering; Static site generators
Professional HTML | Semantic page architecture walkthrough; Accessibility audits; Best-practice checklist; Interview concepts and career roadmap`},

css: {
  about: "CSS (Cascading Style Sheets) controls the presentation of web pages: layout, colour, typography, responsiveness and animation. Strong CSS layout skills (Flexbox, Grid, responsive design) are tested in every frontend interview.",
  prereq: "HTML basics.",
  tools: "VS Code, browser DevTools, Sass, Tailwind CSS, PostCSS",
  plan: `
CSS fundamentals | What CSS is and how it is applied; Inline, internal and external styles; Selectors: element, class and ID; Colours and units
Cascade and specificity | The cascade; Specificity; Inheritance; Combinators and attribute selectors
Box model | Content, padding, border and margin; box-sizing; Margin collapse; Width, height and overflow
Typography | Fonts and web fonts; Font properties; Text properties; Line height and vertical rhythm
Backgrounds and display | Backgrounds and gradients; Borders and border-radius; display: block, inline, inline-block; Visibility and opacity
Positioning | static and relative positioning; absolute positioning; fixed and sticky positioning; z-index and stacking contexts
Flexbox I | Flex container and flex items; Main and cross axis; justify-content and align-items; flex-direction and flex-wrap
Flexbox II | flex-grow, flex-shrink and flex-basis; align-self and order; gap; Common flex layouts
Grid I | Grid container, rows and columns; fr units and repeat(); Placing items; Grid template areas
Grid II | auto-fit, auto-fill and minmax(); Implicit grids; Alignment in grid; Subgrid
Responsive design | The mobile-first approach; Media queries; Responsive units: rem, em, vw, vh; Container queries
Pseudo-classes and pseudo-elements | :hover, :focus and :active; Structural pseudo-classes; ::before and ::after; :is, :where and :has
Transitions and animations | Transitions; 2D and 3D transforms; Keyframe animations; Animation performance
Custom properties and functions | CSS variables; calc, min, max and clamp; Theming and dark mode; color-mix and modern colour spaces
CSS architecture | BEM naming; Utility-first CSS; CSS Modules; Cascade layers
Preprocessors | Sass variables and nesting; Mixins and functions; Partials and modules; Native CSS nesting
Frameworks | Tailwind CSS; Bootstrap; CSS-in-JS; Choosing a styling approach
Accessibility and performance | Focus styles and colour contrast; Reduced-motion preferences; Critical CSS; Avoiding layout shift
Advanced techniques | Scroll snap and scroll-driven animations; View transitions; Masks, clip-path and filters; Logical properties
Professional CSS | Debugging layouts with DevTools; Design systems and tokens; Cross-browser support; Interview concepts and career roadmap`},

react: {
  about: "React is the most widely used JavaScript library for building user interfaces from reusable components. It is the core skill for most frontend and full-stack developer openings.",
  prereq: "HTML, CSS and modern JavaScript (ES6+, async).",
  tools: "Node.js, Vite, React DevTools, TanStack Query, React Router, Vitest, Testing Library",
  plan: `
React introduction | What React is and why components; Setting up a project with Vite; JSX syntax and rules; Rendering elements
Components and props | Function components; Props and children; Composition; Conditional rendering
Lists and events | Rendering lists and keys; Handling events; Synthetic events; Passing handlers as props
State | useState; State updates and batching; Updating objects and arrays immutably; Lifting state up
Forms | Controlled inputs; Multiple inputs and form state; Validation; Uncontrolled inputs and refs
Effects | useEffect and side effects; Dependency arrays; Cleanup functions; When not to use effects
Data fetching | Fetching data in effects; Loading and error states; Race conditions; TanStack Query introduction
Refs and context | useRef; Forwarding refs; The Context API; Avoiding prop drilling
Styling | CSS Modules; Tailwind with React; CSS-in-JS; Component libraries
Routing | React Router setup; Routes and nested routes; Params and navigation; Loaders and protected routes
Advanced hooks | useReducer; useMemo; useCallback; Custom hooks
State management | Local vs global state; Redux Toolkit; Zustand; Server state vs client state
Performance | How rendering works; React.memo; Code splitting and lazy loading; Profiling with React DevTools
Patterns | Compound components; Render props; Higher-order components; Controlled vs uncontrolled patterns
Testing | React Testing Library; Testing user interactions; Mocking API calls; End-to-end testing
TypeScript with React | Typing props and state; Typing hooks; Typing events; Generic components
Modern React | Suspense; Concurrent features: useTransition and useDeferredValue; Server Components; Actions and forms in React 19
Next.js and SSR | Server-side rendering; Static generation; The Next.js App Router; Data fetching on the server
Accessibility and quality | Accessible components; Error boundaries; Accessible forms; Code quality and linting
Professional React | Project architecture; Deployment and environment configuration; The React ecosystem and careers; Interview concepts and career roadmap`},

vue: {
  about: "Vue is a progressive JavaScript framework for building user interfaces, known for its gentle learning curve and single-file components. It is popular with startups, agencies and Asian product companies.",
  prereq: "HTML, CSS and JavaScript fundamentals.",
  tools: "Node.js, Vite, Vue DevTools, Pinia, Vue Router, Vitest, Nuxt",
  plan: `
Vue introduction | What Vue is: a progressive framework; Creating a project with Vite; Single-file components; Template syntax and interpolation
Directives | v-bind and attribute binding; v-if, v-else and v-show; v-for and keys; v-on and event handling
Reactivity | ref and reactive; Computed properties; Watchers; Reactivity caveats
Components | Registering components; Props; Emitting events; Slots
Forms | v-model; Form input bindings; Modifiers; Validation
Composition API | setup and script setup; Lifecycle hooks; Composables; Options API vs Composition API
Component communication | provide and inject; Named and scoped slots; Dynamic components; Async components
Routing | Vue Router setup; Dynamic routes; Nested routes; Navigation guards
State management | Why Pinia; Stores, state and getters; Actions; Persisting state
Data fetching | Fetching with fetch and axios; Loading and error states; Composables for data; Caching
Styling | Scoped styles; CSS Modules; Tailwind with Vue; Transitions and animations
Advanced components | Teleport; KeepAlive; Suspense; Render functions and JSX
TypeScript with Vue | Typing props and emits; Typing refs and computed; Typing composables; Typing stores
Testing | Vitest; Vue Test Utils; Testing components; End-to-end testing
Performance | The virtual DOM and rendering; Lazy loading routes; v-memo and optimisation; Profiling with DevTools
Nuxt | Nuxt overview; File-based routing; Server-side rendering; Data fetching in Nuxt
Ecosystem | UI libraries: Vuetify and PrimeVue; VueUse; Form libraries; Internationalisation
Architecture | Project structure; Plugins; Custom directives; Error handling
Accessibility and security | Accessible components; XSS in templates; Security best practices; Deployment
Professional Vue | Vue 2 to Vue 3 migration; Best practices; The Vue ecosystem and careers; Interview concepts and career roadmap`},

angular: {
  about: "Angular is Google's full-featured, TypeScript-first framework for large web applications. It ships routing, forms, HTTP and testing out of the box and is heavily used by enterprises, banks and IT-services companies.",
  prereq: "HTML, CSS, JavaScript and TypeScript basics.",
  tools: "Node.js, Angular CLI, VS Code, RxJS, Angular Material, Jest / Jasmine",
  plan: `
Angular introduction | What Angular is and its architecture; Angular CLI and project setup; Project structure; TypeScript essentials for Angular
Components | Creating components; Templates and interpolation; Property and event binding; Two-way binding
Templates | Control flow: @if, @for, @switch; Template reference variables; Pipes; Built-in directives
Component interaction | Inputs and outputs; Signal inputs; ViewChild and ContentChild; Content projection
Services and DI | Services; Dependency injection; Providers and injection scopes; The inject function
Routing | Router setup; Route parameters; Child routes; Guards and resolvers
Forms | Template-driven forms; Reactive forms; Validators; Dynamic forms
HTTP | HttpClient; Interceptors; Error handling; Environment configuration
RxJS I | Observables and subscriptions; Operators: map, filter, tap; Subjects; The async pipe
RxJS II | switchMap, mergeMap and concatMap; Combining streams; Error handling in streams; Unsubscribing patterns
Signals | signal, computed and effect; Signals vs RxJS; Signal-based components; Interop with RxJS
State management | Service-based state; NgRx Store; Effects and selectors; NgRx Signal Store
Standalone and modules | NgModules history; Standalone components; Lazy loading; Deferrable views
Testing | Unit testing with Jasmine or Jest; TestBed; Testing services and HTTP; End-to-end testing
Styling and UI | Component styles and encapsulation; Angular Material; Animations; Theming
Performance | Change detection; The OnPush strategy; Zoneless Angular; Bundle optimisation
SSR and hydration | Angular SSR; Hydration; Prerendering; SEO
Advanced topics | Custom directives; Custom pipes; Dynamic components; Internationalisation
Security and deployment | XSS protection and sanitisation; Authentication patterns; Building and deploying; CI for Angular
Professional Angular | Enterprise architecture; Monorepos with Nx; Best practices; Interview concepts and career roadmap`},

nextjs: {
  about: "Next.js is a React framework for production apps, adding file-based routing, server rendering, server components and API routes. It is the most common way companies ship React today.",
  prereq: "React and JavaScript/TypeScript fundamentals.",
  tools: "Node.js, Next.js, TypeScript, Tailwind CSS, Prisma / Drizzle, Vercel",
  plan: `
Next.js introduction | What Next.js adds to React; Creating a project; App Router structure; Pages and layouts
Routing | File-based routing; Dynamic routes; Route groups; Navigation with Link
Rendering | Server vs client components; Static rendering; Dynamic rendering; Streaming
Styling and assets | Global CSS and CSS Modules; Tailwind CSS; Fonts with next/font; Images with next/image
Data fetching | Fetching in server components; Caching and revalidation; Loading UI; Error handling
Server actions | Server Actions; Forms and mutations; Revalidating data; Optimistic updates
Route handlers | API route handlers; Request and response objects; Middleware; The Edge runtime
Databases | Connecting a database; ORMs: Prisma and Drizzle; Querying in server components; Environment variables
Authentication | Authentication concepts; Auth.js; Protecting routes; Sessions and cookies
Metadata and SEO | The Metadata API; Sitemaps and robots; Open Graph images; Structured data
Advanced routing | Parallel routes; Intercepting routes; Internationalised routing; Redirects and rewrites
Performance | Partial prerendering; Bundle analysis; Image and font optimisation; Core Web Vitals
State and client features | Client state; URL state; Third-party libraries; Context in the App Router
Testing | Unit testing; Component testing; End-to-end testing with Playwright; Testing server actions
Caching deep dive | Request memoisation; The data cache; The full route cache; The router cache
Deployment | Deploying to Vercel; Self-hosting with Node.js and Docker; Static export; Environment management
Security | Securing server actions; A data access layer; Security headers and CSP; Rate limiting
Full-stack architecture | Project structure; Monorepos; Background jobs; File uploads
Pages Router | Pages Router concepts; getServerSideProps and getStaticProps; Migrating to the App Router; Running both routers together
Professional Next.js | Production checklist; Observability; The Next.js ecosystem and careers; Interview concepts and career roadmap`},

"react-native": {
  about: "React Native lets you build native iOS and Android apps with React and JavaScript/TypeScript from one codebase. It is used by many startups and product companies for cross-platform mobile development.",
  prereq: "React and JavaScript fundamentals.",
  tools: "Node.js, Expo, React Navigation, Android Studio emulator / Xcode simulator, EAS Build",
  plan: `
React Native introduction | What React Native is; Expo vs the bare workflow; Project setup; Running on devices and emulators
Core components | View, Text and Image; ScrollView; TextInput; Pressable and buttons
Styling | StyleSheet; Flexbox in React Native; Dimensions and responsive design; Platform-specific styles
Lists | FlatList; SectionList; List performance; Pull to refresh
State and hooks | useState and useEffect; Custom hooks; Context; Forms
Navigation | React Navigation setup; Stack navigator; Tab and drawer navigators; Passing parameters
Networking | Fetching data; Axios; Loading and error states; TanStack Query
Storage | AsyncStorage; SecureStore; SQLite; MMKV
State management | Redux Toolkit; Zustand; Persistence; Offline-first approaches
Device features | Camera; Location; Notifications; Permissions
Animations | The Animated API; Reanimated; Gesture Handler; Layout animations
Native modules | The native module concept; Expo modules; Bridging; The new architecture: JSI, Fabric, TurboModules
TypeScript | Typing components; Typing navigation; Typing API data; Shared types
Testing | Jest; React Native Testing Library; Detox end-to-end tests; Maestro
Performance | Rendering optimisation; The Hermes engine; Profiling; Image optimisation
Authentication | Authentication flows; OAuth; Biometrics; Secure token storage
Backend integration | Firebase; Supabase; Push notifications; Real-time data
Accessibility and i18n | Accessibility props; Screen readers; Internationalisation; Dark mode
Publishing | App icons and splash screens; EAS Build; Play Store submission; App Store submission
Professional React Native | Architecture patterns; Over-the-air updates; Monitoring and crash reporting; Interview concepts and career roadmap`},

flutter: {
  about: "Flutter is Google's UI toolkit for building natively compiled apps for mobile, web and desktop from a single Dart codebase. It is widely adopted by Indian startups and service companies for cross-platform apps.",
  prereq: "Basic programming; OOP familiarity helps.",
  tools: "Flutter SDK, Dart, Android Studio / VS Code, Firebase, Flutter DevTools",
  plan: `
Dart basics | Dart language overview; Variables and types; Control flow; Functions
Dart OOP | Classes and constructors; Inheritance and mixins; Null safety; Collections
Flutter introduction | Flutter architecture; Installing the Flutter SDK; Project structure; Hot reload and hot restart
Widgets | Everything is a widget; Stateless widgets; Text, Image and Icon; Container and padding
Layout | Row and Column; Stack; Expanded and Flexible; ListView and GridView
State | StatefulWidget; setState; The widget lifecycle; Lifting state up
User input | Buttons; TextField and forms; Validation; Gestures
Navigation | Navigator push and pop; Named routes; go_router; Passing data between screens
Async Dart | Futures and async/await; Streams; FutureBuilder; StreamBuilder
Networking | The http package; JSON serialisation; Dio; Error handling
State management | Provider; Riverpod; Bloc; Choosing a solution
Persistence | shared_preferences; SQLite with sqflite; Hive; File storage
Theming and UI | Material 3 theming; Cupertino widgets; Custom fonts and assets; Responsive layouts
Animations | Implicit animations; Explicit animations; Hero transitions; Lottie and Rive
Firebase | Firebase setup; Authentication; Cloud Firestore; Cloud Messaging
Platform integration | Platform channels; Plugins; Camera and location; Permissions
Testing | Unit tests; Widget tests; Integration tests; Golden tests
Architecture | Clean architecture; The repository pattern; Dependency injection; Folder structure
Performance and release | Profiling with DevTools; Build modes; Play Store release; App Store release
Professional Flutter | Flutter for web and desktop; CI/CD for Flutter; Best practices; Interview concepts and career roadmap`},

"design-system": {
  about: "A design system is a shared library of design principles, tokens, components and guidelines that keeps a product consistent across teams and platforms. It sits between design and frontend engineering.",
  prereq: "Basic UI design or frontend experience.",
  tools: "Figma, Storybook, Style Dictionary, React / Web Components, Chromatic",
  plan: `
Design systems introduction | What a design system is; Benefits and examples: Material, Carbon, Polaris; Design system vs style guide vs component library; Who builds and maintains it
Foundations | Design principles; Brand and visual language; Accessibility as a foundation; Auditing an existing UI
Colour | Colour theory for UI; Colour palettes and scales; Contrast and accessibility; Semantic colour roles
Typography | Type scales; Font pairing; Responsive typography; Typography tokens
Spacing and layout | Spacing scales; Grids and breakpoints; Layout patterns; Elevation and shadows
Design tokens | What tokens are; Token tiers: primitive, semantic, component; Naming conventions; Token formats and tooling
Iconography and imagery | Icon systems; Illustration guidelines; Imagery guidelines; Motion principles
Components in Figma | Figma components and variants; Auto layout; Component properties; Variables and modes
Core components | Buttons; Inputs and forms; Cards and lists; Navigation components
Feedback components | Modals and dialogs; Toasts and alerts; Loading states; Empty and error states
Accessibility in components | WCAG for components; Keyboard interaction patterns; ARIA patterns; Focus management
Building components in code | Component APIs and props; Composition patterns; Theming in code; Styling strategies
Tokens in code | Style Dictionary; CSS variables from tokens; Dark mode and themes; Syncing Figma and code
Documentation | Documentation sites; Storybook; Usage guidelines; Do's and don'ts
Testing components | Visual regression testing; Accessibility testing; Unit testing components; Cross-browser testing
Governance | Contribution models; Versioning and releases; Deprecation; Decision records
Adoption | Rolling out a design system; Measuring adoption; Developer experience; Designer experience
Scaling | Multi-brand systems; Multi-platform systems; Localisation; Performance
Collaboration | Designer-developer handoff; Design reviews; Feedback loops; Community building
Professional design systems | Case studies of major systems; Maturity models; Careers in design systems; Interview concepts and career roadmap`},

nodejs: {
  about: "Node.js runs JavaScript on the server using the V8 engine and an event-driven, non-blocking I/O model. It is used for REST APIs, real-time apps and tooling, and is a core backend skill for JavaScript developers.",
  prereq: "JavaScript fundamentals including async/await.",
  tools: "Node.js LTS, npm / pnpm, Express / Fastify / NestJS, Postman, PostgreSQL / MongoDB",
  plan: `
Node.js introduction | What Node.js is: V8 and libuv; Installing Node and nvm; Running scripts and the REPL; Node vs browser JavaScript
Modules | CommonJS modules; ES modules; npm and package.json; Semantic versioning
Core modules | fs: reading and writing files; path and os; events and EventEmitter; process and environment variables
Asynchronous Node | The event loop in Node; Callbacks and the error-first pattern; Promises and async/await; Timers and setImmediate
HTTP basics | The http module; Creating a server; Request and response objects; Routing by hand
Express | Express setup; Routing; Middleware; Serving static files
REST APIs | REST design; CRUD endpoints; Validation; Error-handling middleware
Databases I | Connecting to MongoDB with Mongoose; Schemas and models; CRUD with Mongoose; Relationships
Databases II | PostgreSQL with pg; ORMs: Prisma and Sequelize; Migrations; Transactions
Authentication | Password hashing with bcrypt; Sessions and cookies; JWT authentication; OAuth with Passport
Streams and buffers | Buffers; Readable and writable streams; Piping and transform streams; File uploads
Real-time | WebSockets; Socket.IO; Server-sent events; Real-time patterns
Testing | Jest or Vitest for Node; Testing APIs with Supertest; Mocking; Test databases
Security | OWASP for Node; Helmet and CORS; Rate limiting; Input sanitisation
Architecture | Layered architecture; Configuration management; Logging with Pino or Winston; Dependency injection
Performance | Clustering; Worker threads; Profiling; Caching with Redis
Advanced frameworks | NestJS; Fastify; GraphQL servers; tRPC
Messaging and jobs | Job queues with BullMQ; Message brokers; Scheduled tasks; Microservice communication
Deployment | Process managers like PM2; Docker for Node; CI/CD; Monitoring
Professional Node.js | TypeScript with Node; Best practices; The Node ecosystem and careers; Interview concepts and career roadmap`},

"spring-boot": {
  about: "Spring Boot is the leading Java framework for building production-ready REST APIs and microservices with minimal configuration. It is the most requested backend framework in Indian IT services, banks and GCCs.",
  prereq: "Core Java (OOP, collections, exceptions) and basic SQL.",
  tools: "JDK 21, Spring Initializr, IntelliJ IDEA, Maven / Gradle, PostgreSQL / MySQL, Postman, Docker",
  plan: `
Spring introduction | The Spring ecosystem overview; Inversion of control and dependency injection; Spring Initializr and project setup; Project structure and auto-configuration
Spring core | Beans and the application context; @Component, @Service and @Repository; @Configuration and @Bean; Bean scopes and lifecycle
Configuration | application.properties and YAML; Profiles; @Value and @ConfigurationProperties; Externalised configuration
Web basics | Spring MVC architecture; @RestController and request mappings; Path variables and request parameters; Request bodies and responses
REST APIs | CRUD API design; ResponseEntity and status codes; Bean Validation; Exception handling with @ControllerAdvice
Data JPA I | JPA and Hibernate overview; Entities and IDs; Spring Data repositories; Derived query methods
Data JPA II | Relationships: OneToMany and ManyToOne; Fetch types and the N+1 problem; JPQL and native queries; Pagination and sorting
Transactions and migrations | @Transactional; Isolation and propagation; Flyway and Liquibase; Auditing
DTOs and mapping | The DTO pattern; MapStruct; Layered architecture; API versioning
Testing | Unit testing with JUnit and Mockito; @WebMvcTest; @DataJpaTest; Testcontainers
Spring Security I | Security architecture and the filter chain; Authentication and users; Password encoding; Authorisation rules
Spring Security II | JWT authentication; OAuth2 and OpenID Connect; Method security; CORS and CSRF
Caching and async | Spring Cache; Redis integration; @Async; Scheduling tasks
Messaging | Kafka with Spring; RabbitMQ; Event-driven design; Spring application events
Observability | Spring Boot Actuator; Metrics with Micrometer; Logging; Distributed tracing
Microservices | Microservices with Spring Cloud; Service discovery; API gateway; Config server
Resilience | Circuit breakers with Resilience4j; Retries and timeouts; Rate limiting; Feign clients
Reactive Spring | Reactive programming concepts; Spring WebFlux; R2DBC; When to use reactive
Deployment | Packaging executable JARs; Docker images; Kubernetes deployment; Native images with GraalVM
Professional Spring Boot | Production best practices; Performance tuning; The Spring ecosystem and careers; Interview concepts and career roadmap`},

"aspnet-core": {
  about: "ASP.NET Core is Microsoft's cross-platform framework for building web APIs, web apps and real-time services in C#. It is widely used in enterprises, product companies and Microsoft-stack service firms.",
  prereq: "Basic programming; C# familiarity helps.",
  tools: ".NET 8/9 SDK, Visual Studio / Rider / VS Code, Entity Framework Core, SQL Server / PostgreSQL",
  plan: `
.NET introduction | The .NET platform and C# overview; Installing the .NET SDK and Visual Studio; The dotnet CLI; Project structure
C# essentials | Types and variables; Control flow; Classes and records; LINQ basics
ASP.NET Core basics | The hosting model and Program.cs; The middleware pipeline; Dependency injection; Configuration and options
Minimal APIs | Minimal API endpoints; Route parameters; Request binding; Results and status codes
Controllers | MVC controllers; Routing and attributes; Model binding and validation; Filters
Entity Framework Core I | EF Core overview; DbContext and entities; Migrations; CRUD
Entity Framework Core II | Relationships; Querying with LINQ; Loading strategies; Performance tips
Web APIs | RESTful design; DTOs and mapping; Error handling and ProblemDetails; OpenAPI and Swagger
Razor and Blazor | Razor Pages; MVC views; Blazor Server; Blazor WebAssembly
Async and logging | async/await in ASP.NET Core; Logging with ILogger and Serilog; Health checks; Background services
Authentication | ASP.NET Core Identity; Cookie authentication; JWT bearer authentication; Authorisation policies
Testing | xUnit; Mocking with Moq; Integration testing with WebApplicationFactory; Testing EF Core
Caching and performance | In-memory caching; Distributed caching with Redis; Response caching; Output caching
Real-time | SignalR; Hubs; Clients; Scaling SignalR
Architecture | Clean architecture; CQRS with MediatR; The repository pattern; Domain-driven design basics
Microservices | gRPC in .NET; Message queues; .NET Aspire; API gateways
Security | HTTPS and HSTS; Data protection; CORS; OWASP in ASP.NET Core
Deployment | Publishing apps; IIS and Kestrel; Docker; Azure App Service
Advanced topics | Rate limiting; Minimal API filters; Source generators; Native AOT
Professional ASP.NET Core | Production best practices; Observability with OpenTelemetry; The .NET ecosystem and careers; Interview concepts and career roadmap`},

django: {
  about: "Django is a batteries-included Python web framework with an ORM, admin panel, authentication and security built in. It powers many startups and content platforms and pairs with Django REST Framework for APIs.",
  prereq: "Python fundamentals and basic HTML.",
  tools: "Python, Django, Django REST Framework, PostgreSQL, VS Code / PyCharm, Celery",
  plan: `
Django introduction | What Django is: batteries included; Installing Django in a virtual environment; Projects and apps; The development server
Architecture | The MVT pattern; The request lifecycle; Settings; The URL dispatcher
Views | Function-based views; Class-based views; HttpResponse and JsonResponse; Generic views
Templates | The template language; Template inheritance; Static files; Context processors
Models I | Models and fields; Migrations; The Django ORM; QuerySets
Models II | Relationships; Model methods and managers; Aggregation and annotation; select_related and prefetch_related
Admin | The Django admin; Customising the admin; Admin actions; Permissions in the admin
Forms | Django forms; ModelForms; Validation; File uploads
Authentication | The User model; Login and logout; Permissions and groups; Custom user models
Middleware and signals | Middleware; Signals; Sessions; The messages framework
Django REST Framework I | DRF setup; Serializers; API views; ViewSets and routers
Django REST Framework II | Authentication; Permissions; Pagination and filtering; Throttling
Testing | The Django test framework; Testing views and models; pytest-django; Factory Boy
Async and tasks | Async views; Celery; Scheduled tasks; Channels and WebSockets
Caching and performance | The caching framework; Redis cache; Database indexing; Profiling with Debug Toolbar
Security | CSRF, XSS and SQL injection protection; Security settings; HTTPS; Secrets management
Deployment | Gunicorn and Nginx; Docker; Static files in production; Cloud platforms
Advanced | Custom management commands; Multiple databases; Internationalisation; GeoDjango
Architecture at scale | Large project structure; Service layers; API design; Django vs FastAPI
Professional Django | Production checklist; Monitoring; The Django ecosystem and careers; Interview concepts and career roadmap`},

laravel: {
  about: "Laravel is the most popular PHP framework, offering elegant routing, the Eloquent ORM, queues, authentication and a rich ecosystem. It is heavily used by agencies, SaaS startups and e-commerce teams.",
  prereq: "PHP fundamentals and basic SQL.",
  tools: "PHP 8.3+, Composer, Laravel Herd / Sail, MySQL / PostgreSQL, VS Code / PhpStorm",
  plan: `
Laravel introduction | Laravel overview; Installing with Composer and Laravel Herd; Directory structure; The Artisan CLI
Routing and controllers | Routes; Route parameters; Controllers; Resource controllers
Blade | Blade templates; Layouts and components; Directives; Assets with Vite
Requests and validation | The Request object; Validation rules; Form requests; Error messages
Database basics | Configuration; Migrations; Seeders and factories; The query builder
Eloquent I | Models; CRUD; Mass assignment; Accessors and mutators
Eloquent II | Relationships; Eager loading; Scopes; Collections
Authentication | Starter kits: Breeze and Jetstream; The authentication flow; Authorisation with gates and policies; Email verification
APIs | API routes; API resources; Sanctum; Pagination
Files and mail | File storage; Uploads; Mail; Notifications
Queues and events | Queues and jobs; Events and listeners; Task scheduling; Horizon
Testing | PHPUnit and Pest; Feature tests; Database testing; Mocking
Service container | The service container; Service providers; Facades; Contracts
Livewire and Inertia | Livewire; Inertia with Vue or React; Alpine.js; Choosing a stack
Caching and performance | Cache drivers; Redis; Query optimisation; Octane
Security | CSRF and XSS; Rate limiting; Encryption and hashing; Security best practices
Real-time | Broadcasting; Laravel Reverb; WebSockets; Laravel Echo
Deployment | Forge and Vapor; Docker with Sail; Environment configuration; CI/CD
Packages | Popular packages; Creating packages; Filament admin panels; Telescope
Professional Laravel | Architecture for large apps; Best practices; The Laravel ecosystem and careers; Interview concepts and career roadmap`},

"ruby-on-rails": {
  about: "Ruby on Rails is a full-stack web framework built on convention over configuration. It lets small teams ship products very quickly and powers companies like GitHub, Shopify and Basecamp.",
  prereq: "Ruby basics and HTML.",
  tools: "Ruby, Rails 8, PostgreSQL / SQLite, Hotwire, RSpec, Kamal",
  plan: `
Rails introduction | Rails philosophy: convention over configuration; Installing Rails; Creating an app; Directory structure
MVC and routing | MVC in Rails; Routes; RESTful resources; Controllers and actions
Views | ERB templates; Layouts and partials; Helpers; The asset pipeline and Propshaft
Models | ActiveRecord basics; Migrations; CRUD; Validations
Associations | belongs_to and has_many; has_many through; Polymorphic associations; Callbacks
Forms | form_with; Strong parameters; Nested forms; Displaying errors
Querying | The query interface; Scopes; Eager loading and N+1 queries; Joins and aggregates
Authentication | The Rails authentication generator; Devise; Authorisation with Pundit; Sessions and cookies
Hotwire | Turbo Drive; Turbo Frames; Turbo Streams; Stimulus
APIs | API-only Rails; Serialization; Versioning; Token authentication
Background jobs | Active Job; Solid Queue and Sidekiq; Mailers; Scheduled jobs
Testing | Minitest in Rails; RSpec; System tests; Fixtures and factories
Files and storage | Active Storage; Image processing; Action Text; Cloud storage
Real-time | Action Cable; Broadcasting; Solid Cable; Notifications
Caching | Fragment caching; Russian doll caching; Solid Cache; Low-level caching
Security | The Rails security guide; CSRF and XSS; SQL injection; Credentials and secrets
Performance | Profiling; Database indexing; Memory usage; Benchmarks
Deployment | Kamal; Docker; Heroku and Render; Production configuration
Architecture | Service objects; Concerns; Engines; Modular monoliths
Professional Rails | Upgrading Rails; Best practices; The Rails ecosystem and careers; Interview concepts and career roadmap`},

wordpress: {
  about: "WordPress is the world's most-used content management system, powering over 40% of websites. Skills range from site building and SEO to theme, plugin and block development, and are in demand at agencies and digital-marketing firms.",
  prereq: "Basic computer skills; HTML/CSS/PHP for development topics.",
  tools: "LocalWP, WordPress, WooCommerce, VS Code, WP-CLI, Git",
  plan: `
WordPress introduction | WordPress.com vs WordPress.org; How WordPress works; Local install with LocalWP; Dashboard tour
Content | Posts vs pages; The block editor; The media library; Categories and tags
Site setup | Settings; Permalinks; Menus; Users and roles
Themes | Choosing and installing themes; The customiser and site editor; Block themes; Child themes
Plugins | Installing plugins; Essential plugins; Plugin conflicts; Plugin security
Full site editing | Templates and template parts; Global styles; Patterns; The navigation block
Page builders | Elementor; Gutenberg vs page builders; Landing pages; Responsive design
SEO | SEO plugins; On-page SEO; Sitemaps; Performance and SEO
E-commerce | WooCommerce setup; Products; Payments and shipping; Orders
Forms and integrations | Contact forms; Email marketing; Analytics; Social media
Theme development I | Theme structure; The template hierarchy; The Loop; theme.json
Theme development II | Template tags; Enqueuing scripts and styles; Custom templates; Block theme development
Plugin development | Plugin structure; Hooks: actions and filters; Shortcodes; Settings pages
Custom content | Custom post types; Custom taxonomies; Custom fields and ACF; Meta boxes
Blocks | Block development with React; block.json; Dynamic blocks; Block patterns
REST API and headless | The WordPress REST API; Custom endpoints; Headless WordPress; WPGraphQL
Security | Hardening WordPress; Security plugins; Backups; Updates
Performance | Caching; CDN; Image optimisation; Database optimisation
Deployment | Hosting options; Migration; Staging environments; WP-CLI
Professional WordPress | Multisite; Client handover; WordPress careers; Interview concepts and career roadmap`},

"api-design": {
  about: "API design is the discipline of creating clear, consistent, secure and evolvable interfaces between software systems. It covers REST, GraphQL, gRPC, authentication, versioning and documentation.",
  prereq: "Basic programming and HTTP awareness.",
  tools: "Postman / Insomnia, OpenAPI / Swagger, curl, any backend framework",
  plan: `
API fundamentals | What an API is; Types of APIs: REST, GraphQL, gRPC, SOAP; The client-server model; API-first design
HTTP | HTTP requests and responses; Methods and idempotency; Status codes; Headers
REST principles | Resources and URIs; Statelessness; The uniform interface; HATEOAS
Designing resources | Naming conventions; Nested resources; Query parameters; Filtering, sorting and pagination
Data formats | JSON; XML; Content negotiation; Schema design
Error handling | Error response formats; Problem Details (RFC 9457); Validation errors; Consistency
Authentication | API keys; Basic authentication; Token authentication; JWT
OAuth and authorisation | OAuth 2.0 flows; OpenID Connect; Scopes and permissions; Role-based access
Documentation | The OpenAPI specification; Swagger UI; Writing good documentation; Examples and SDKs
Versioning | Why version APIs; URI versioning; Header versioning; Deprecation policies
Performance | Caching with HTTP headers; ETags; Compression; Pagination strategies
Rate limiting and security | Rate limiting; Throttling; OWASP API Security Top 10; Input validation
GraphQL | GraphQL concepts; Schemas and resolvers; Queries and mutations; When to choose GraphQL
gRPC and real-time | gRPC and Protocol Buffers; Streaming; WebSockets; Webhooks
Testing | Testing with Postman; Contract testing; Automated API tests; Mock servers
API gateways | The API gateway pattern; Kong and AWS API Gateway; Request transformation; Monitoring
Event-driven APIs | Asynchronous APIs; AsyncAPI; Message brokers; Event design
Microservices APIs | Service boundaries; Backend for frontend; Service mesh; Distributed tracing
API governance | Style guides; Design reviews; Lifecycle management; APIs as products
Professional API design | Case studies: Stripe, GitHub, Twilio; Developer experience; Careers; Interview concepts and career roadmap`},

graphql: {
  about: "GraphQL is a query language and runtime for APIs that lets clients ask for exactly the data they need through a single typed endpoint. It is used by Meta, GitHub, Shopify and many product teams.",
  prereq: "JavaScript/TypeScript and REST API basics.",
  tools: "Apollo Server / Client, GraphQL Yoga, GraphiQL, GraphQL Code Generator, Prisma",
  plan: `
GraphQL introduction | What GraphQL is; GraphQL vs REST; Core concepts; Tooling: GraphiQL and Apollo Sandbox
Schema basics | The schema definition language; Scalar types; Object types; Lists and non-null
Queries | Writing queries; Arguments; Aliases and fragments; Variables
Mutations | Mutations; Input types; Returning data; Error handling
Server setup | Apollo Server; Resolvers; Context; Data sources
Schema design | Designing schemas; Interfaces and unions; Enums; Custom scalars
Resolvers deep dive | The resolver chain; Parent arguments; Async resolvers; Error handling
Databases | Connecting databases; Prisma with GraphQL; The N+1 problem; DataLoader
Authentication | Authentication in context; Authorisation; Directives for auth; Securing schemas
Client basics | Apollo Client; Queries in React; Mutations in React; The normalised cache
Subscriptions | The subscription concept; WebSockets; Real-time updates; Scaling subscriptions
Pagination | Offset pagination; Cursor pagination; Relay connections; Infinite scroll
Performance | Query complexity; Depth limiting; Persisted queries; Caching
Testing | Testing resolvers; Mocking schemas; Client tests; Integration tests
Code generation | GraphQL Code Generator; Typed clients; Schema-first vs code-first; Pothos and Nexus
Federation | Apollo Federation; Subgraphs; The supergraph; The router and gateway
Security | Introspection; Rate limiting; Injection; Best practices
Clients | Relay; urql; TanStack Query with GraphQL; Mobile clients
Production | Monitoring; Schema registry; Versioning and deprecation; Error tracking
Professional GraphQL | Case studies; Best practices; Careers; Interview concepts and career roadmap`},
});
