Object.assign(window.CURRICULUM = window.CURRICULUM || {}, {
python: {
  about: "Python is a high-level, readable, general-purpose language used for automation, web back-ends, data analysis, AI/ML and scripting. Its huge standard library and ecosystem make it the most common first language in placements.",
  prereq: "Basic computer literacy. No prior programming needed.",
  tools: "Python 3.12+, VS Code or PyCharm, pip / uv, venv, Jupyter, pytest",
  plan: `
Getting started with Python | What Python is and where it is used; Installing Python, VS Code and virtual environments; The interpreter, REPL and running scripts; Syntax rules, indentation, comments and PEP 8
Variables and core data types | Variables, names and dynamic typing; Numbers, arithmetic and operator precedence; Strings: indexing, slicing and common methods; Booleans, None and type conversion
Input, output and decisions | input(), print() and f-string formatting; Comparison and logical operators; if, elif and else decisions; Nested conditions and match-case
Loops | while loops and loop conditions; for loops with range(); break, continue and loop-else; Nested loops and common loop patterns
Core collections | Lists: creation, indexing and methods; Tuples and immutability; Sets and set operations; Dictionaries: keys, values and iteration
Functions | Defining functions, parameters and return values; Default, keyword, *args and **kwargs arguments; Scope, the LEGB rule, global and nonlocal; Lambda functions, map, filter and sorted with key
Pythonic data handling | List, dict and set comprehensions; Unpacking, zip and enumerate; Nested data structures; The collections module: Counter, defaultdict, deque, namedtuple
Modules and packages | Importing modules and a tour of the standard library; Creating your own modules and packages; pip, requirements files and virtual environments; The __main__ guard and script structure
Files and exceptions | Reading and writing text files with context managers; Working with CSV and JSON; Exceptions: try, except, else and finally; Raising and defining custom exceptions
Strings, dates and regex | Advanced string methods and formatting; Dates and times with datetime; Regular expressions with the re module; pathlib and os for file-system work
Object-oriented programming | Classes, objects and the __init__ method; Instance, class and static methods; Encapsulation and properties; Inheritance and super()
Advanced OOP | Polymorphism and duck typing; Dunder methods and operator overloading; Abstract base classes; Dataclasses and enums
Iterators, generators and decorators | The iterator protocol; Generators and yield; Decorators and functools.wraps; Context managers and the with statement
Type hints and code quality | Type hints and the typing module; Static checking with mypy; Linting and formatting with ruff and black; Docstrings and documentation
Testing and debugging | Unit testing with unittest; pytest fixtures and parametrisation; Mocking dependencies; Debugging with pdb and logging
Concurrency | Threads and the GIL; Multiprocessing for CPU-bound work; asyncio, async and await; Choosing the right concurrency model
Working with data and the web | HTTP requests with the requests library; Consuming REST APIs and JSON; Web scraping with BeautifulSoup; Databases with sqlite3 and SQLAlchemy basics
Building web services | Web frameworks overview: Flask, Django, FastAPI; Building a REST API with FastAPI; Request validation with Pydantic; Authentication basics and environment configuration
Performance and internals | Memory model, references and garbage collection; Profiling with cProfile and timeit; Optimising with built-ins and better algorithms; Packaging and publishing to PyPI
Professional Python | Project structure and dependency management with Poetry or uv; Python in data science, AI and automation; Security best practices in Python; Interview concepts and career roadmap`},

java: {
  about: "Java is a statically typed, object-oriented language that runs on the JVM. It powers enterprise back-ends, banking systems, Android apps and big-data tools, and is one of the most requested languages in service-company and GCC hiring.",
  prereq: "Basic computer literacy. Any prior programming helps but is not required.",
  tools: "JDK 21 (LTS), IntelliJ IDEA, Maven / Gradle, JUnit 5, Git",
  plan: `
Java foundations | What Java is: JDK, JRE and the JVM; Installing the JDK and IntelliJ IDEA; Structure of a Java program and main(); Compilation, bytecode and running programs
Variables and operators | Primitive data types and literals; Variables, constants and type casting; Arithmetic, relational and logical operators; Strings and the String API
Control flow | if-else and switch, including switch expressions; while and do-while loops; for and enhanced for loops; break, continue and labelled loops
Arrays and methods | One-dimensional arrays; Multi-dimensional arrays; Defining methods, parameters and return types; Method overloading and recursion
Classes and objects | Classes, objects and constructors; The this keyword and constructor chaining; Access modifiers and packages; static members and initialisation blocks
OOP pillars | Encapsulation with getters and setters; Inheritance and the super keyword; Polymorphism: overriding and dynamic dispatch; Abstraction with abstract classes
Interfaces and core classes | Interfaces, default and static methods; The Object class: equals, hashCode, toString; Wrapper classes and autoboxing; StringBuilder and immutability
Exception handling | Checked vs unchecked exceptions; try, catch, finally and multi-catch; try-with-resources; Custom exceptions and best practices
Collections framework I | Collections hierarchy overview; ArrayList, LinkedList and List operations; HashSet, LinkedHashSet and TreeSet; Iterators and the for-each loop
Collections framework II | HashMap, LinkedHashMap and TreeMap; Comparable and Comparator; Queue, Deque and PriorityQueue; The Collections and Arrays utility classes
Generics and functional Java | Generic classes and methods; Bounded types and wildcards; Lambda expressions and functional interfaces; Method references
Streams API | Creating streams; Intermediate operations: map, filter, sorted; Terminal operations and collectors; Optional and avoiding null
Files, I/O and dates | java.io streams and readers; NIO.2 Files and Paths; Serialization and JSON with Jackson; The java.time date and time API
Multithreading | Threads, Runnable and the thread lifecycle; Synchronisation, locks and volatile; ExecutorService and thread pools; CompletableFuture and concurrent collections
Build tools and testing | Maven project structure and dependencies; Gradle basics; Unit testing with JUnit 5; Mocking with Mockito
Databases with Java | JDBC connections and statements; PreparedStatement and transactions; Introduction to JPA and Hibernate; Entity mapping and relationships
JVM internals | JVM architecture and class loading; Memory areas: heap, stack and metaspace; Garbage collectors and tuning basics; Profiling and diagnosing memory leaks
Modern Java features | Records and sealed classes; Pattern matching for instanceof and switch; Text blocks and var; Virtual threads (Project Loom)
Enterprise Java and Spring | Spring Framework and dependency injection; Spring Boot application structure; Building REST controllers; Configuration, profiles and logging
Professional Java | Design patterns in Java: singleton, factory, builder, strategy; Clean code and SOLID in Java; Packaging JARs and deployment; Interview concepts and career roadmap`},

javascript: {
  about: "JavaScript is the programming language of the web. It runs in every browser to make pages interactive and, through Node.js, on servers too. Every frontend, full-stack and many backend roles require it.",
  prereq: "Basic HTML and CSS awareness is helpful.",
  tools: "Modern browser + DevTools, VS Code, Node.js LTS, npm, ESLint, Prettier",
  plan: `
JavaScript basics | What JavaScript is: browsers, engines and Node.js; Adding JavaScript to a page and using the DevTools console; Variables: var, let and const; Primitive types and typeof
Operators and control flow | Arithmetic, comparison and logical operators; Type coercion, == vs === and truthy or falsy values; if, else, switch and the ternary operator; Loops: for, while, for...of and for...in
Functions | Function declarations and expressions; Arrow functions; Parameters, defaults, rest and spread; Return values and pure functions
Arrays | Creating and modifying arrays; Iteration methods: forEach, map, filter; reduce, find, some and every; Sorting, destructuring and spread with arrays
Objects | Object literals, properties and methods; Destructuring and spread with objects; Object.keys, values and entries; JSON.stringify and JSON.parse
Scope and closures | Global, function and block scope; Hoisting and the temporal dead zone; Closures and their practical uses; The this keyword with call, apply and bind
The DOM | The DOM tree and selecting elements; Changing content, attributes and styles; Creating, inserting and removing elements; Traversing the DOM
Events | addEventListener and event objects; Event bubbling, capturing and delegation; Forms, input events and validation; Keyboard and mouse events
Asynchronous JavaScript | The event loop, call stack and task queues; Callbacks and callback hell; Promises: then, catch and finally; async and await
Working with APIs | The fetch API and HTTP methods; Handling JSON responses and errors; Promise.all, race and allSettled; localStorage, sessionStorage and cookies
Object-oriented JavaScript | Prototypes and the prototype chain; Constructor functions; ES6 classes, extends and super; Getters, setters and private fields
Modern ES features | Modules: import and export; Optional chaining and nullish coalescing; Map, Set, WeakMap and WeakSet; Symbols, iterators and generators
Error handling and debugging | try, catch and custom errors; Debugging with breakpoints in DevTools; Strict mode; Common JavaScript pitfalls
Functional programming | Higher-order functions; Immutability and pure functions; Currying and composition; Recursion
Browser APIs | Timers: setTimeout, setInterval and requestAnimationFrame; Intersection Observer and Resize Observer; Geolocation, Clipboard and Notifications; Web Workers basics
Tooling | npm, package.json and dependencies; Bundlers: Vite and webpack concepts; Transpiling with Babel; Linting with ESLint and formatting with Prettier
Testing | Unit testing with Jest or Vitest; Testing DOM code; Mocking timers and fetch; End-to-end testing overview with Playwright
Performance and memory | Memory management and garbage collection; Finding memory leaks; Debouncing and throttling; Rendering performance and reflows
Security and patterns | XSS, CSRF and safe DOM handling; Content Security Policy and CORS; Design patterns: module, observer, factory; Event-driven architecture
JavaScript in the ecosystem | Node.js runtime fundamentals; Framework landscape: React, Vue, Angular; TypeScript as a superset; Interview concepts and career roadmap`},

typescript: {
  about: "TypeScript is JavaScript with a static type system. It catches errors before runtime, improves editor tooling and is now the default for professional React, Angular, Node.js and full-stack codebases.",
  prereq: "Solid JavaScript fundamentals (functions, objects, async).",
  tools: "Node.js, TypeScript compiler (tsc), VS Code, Vite, typescript-eslint, Zod",
  plan: `
TypeScript introduction | Why TypeScript: static typing for JavaScript; Installing TypeScript and the tsc compiler; tsconfig.json essentials; Running TypeScript with tsx and Vite
Basic types | Primitive types and type annotations; Type inference; Arrays and tuples; any, unknown, never and void
Functions | Typing parameters and return values; Optional and default parameters; Function types and overloads; Rest parameters and this typing
Object types | Object type literals; Type aliases; Interfaces and extending interfaces; Optional and readonly properties
Union and literal types | Union types; Literal types; Narrowing with typeof, instanceof and in; Discriminated unions
Classes | Classes with typed properties; Access modifiers: public, private, protected; Abstract classes; Implementing interfaces
Generics | Generic functions; Generic interfaces and classes; Generic constraints with extends; Default type parameters
Enums and type operators | Enums and const enums; keyof and typeof operators; Indexed access types; Type assertions and non-null assertions
Utility types | Partial, Required and Readonly; Pick, Omit and Record; Exclude, Extract and NonNullable; ReturnType, Parameters and Awaited
Modules and declarations | ES modules in TypeScript; Declaration files (.d.ts); DefinitelyTyped and @types packages; Module resolution strategies
Advanced types | Conditional types; The infer keyword; Mapped types; Template literal types
Type guards and safety | Custom type guards; Assertion functions; Exhaustiveness checking with never; Strict mode flags explained
Decorators and mixins | Decorators overview; Class and method decorators; Decorators in Angular and NestJS; Mixins
TypeScript with the DOM and async | Typing DOM elements and events; Typing fetch and API responses; Typing promises and async functions; Runtime validation with Zod
TypeScript with React | Typing props and state; Typing hooks; Typing events and refs; Generic components
TypeScript on the server | TypeScript with Node.js and Express; NestJS overview; Typing database models; Sharing types between frontend and backend
Tooling and build | Compiler options deep dive; Project references and monorepos; Linting with typescript-eslint; Bundling and emitting declarations
Testing typed code | Testing with Vitest or Jest in TypeScript; Type-level testing; Mocking typed modules; Typed test utilities
Type-level programming | Recursive types; Variadic tuple types; Branded and nominal types; Designing type-safe APIs
Professional TypeScript | Migrating a JavaScript codebase to TypeScript; Type-checker performance; Best practices and anti-patterns; Interview concepts and career roadmap`},

c: {
  about: "C is a small, fast, low-level language that gives direct control over memory. It underpins operating systems, embedded devices, compilers and databases, and is the base language for embedded, VLSI and systems roles.",
  prereq: "Basic computer literacy. Comfort with logic and arithmetic.",
  tools: "GCC or Clang, VS Code / Code::Blocks, Make, GDB, Valgrind",
  plan: `
Introduction to C | History and uses of C; Installing GCC or Clang and an editor; Structure of a C program; Compiling, linking and running
Data types and operators | Data types, sizes and limits; Variables, constants and literals; Arithmetic, relational and logical operators; Type conversion and casting
Input, output and decisions | printf and format specifiers; scanf and input handling; if, else and nested decisions; switch statements
Loops | while and do-while loops; for loops; break, continue and goto; Nested loops and patterns
Functions | Defining and declaring functions; Call by value; Recursion; Storage classes: auto, static, extern, register
Arrays | One-dimensional arrays; Multi-dimensional arrays; Passing arrays to functions; Searching and sorting arrays
Strings | Character arrays and string literals; string.h functions; String input and output; Common string algorithms
Pointers I | Addresses and the & operator; Pointer declaration and dereferencing; Pointer arithmetic; Pointers and arrays
Pointers II | Pointers to pointers; Call by reference with pointers; Function pointers; const with pointers
Dynamic memory | Stack vs heap; malloc, calloc, realloc and free; Memory leaks and dangling pointers; Dynamic arrays
Structures and unions | Structures and nested structures; Arrays of structures; Pointers to structures; Unions, enums and typedef
File handling | File pointers and fopen modes; Reading and writing text files; Binary files with fread and fwrite; fseek, ftell and error handling
Preprocessor and multi-file programs | Macros and #define; Conditional compilation; Header files and include guards; Makefiles and separate compilation
Bit manipulation | Bitwise operators; Bit masks and flags; Shifts and their uses; Bit fields in structures
Data structures in C | Linked lists; Stacks and queues; Binary trees; Hash tables
Debugging and tooling | Debugging with GDB; Detecting memory errors with Valgrind; Compiler warnings and sanitizers; Undefined behaviour
Systems programming | Command-line arguments; Processes with fork and exec; Signals; Introduction to POSIX threads
C for embedded systems | Memory-mapped I/O and volatile; Fixed-width integers and portability; Interrupt service routines; Writing efficient code for microcontrollers
Standards and secure C | C standards from C89 to C23; Buffer overflows and secure coding; Safe string handling; Code style and documentation
Professional C | Building static and shared libraries; Interfacing C with other languages; Performance optimisation; Interview concepts and career roadmap`},

cpp: {
  about: "C++ extends C with classes, templates and the Standard Library. It is used for game engines, trading systems, browsers, embedded software and competitive programming, where performance matters most.",
  prereq: "Basic programming logic; C knowledge helps but is not required.",
  tools: "GCC / Clang / MSVC, CMake, VS Code or CLion, GDB / LLDB, GoogleTest",
  plan: `
C++ basics | What C++ is and where it is used; Compilers, IDEs and the build process; Program structure, iostream and namespaces; Variables, types and auto
Operators and control flow | Operators and precedence; if, switch and the conditional operator; Loops including range-based for; Input and output formatting
Functions | Function declaration and definition; Pass by value, reference and const reference; Default arguments and overloading; Inline functions and recursion
Arrays, strings and pointers | Arrays and std::array; std::string operations; Pointers and pointer arithmetic; References vs pointers
Classes and objects | Classes, members and access specifiers; Constructors and destructors; The this pointer and const member functions; Static members
Object lifetime | Copy constructor and copy assignment; Rule of three, five and zero; Move semantics and rvalue references; Member initialiser lists
Inheritance and polymorphism | Inheritance and access control; Virtual functions and vtables; Abstract classes and pure virtual functions; Multiple and virtual inheritance
Operator overloading and friends | Overloading arithmetic and comparison operators; Stream operators; Friend functions and classes; The spaceship operator (C++20)
Memory management | new and delete; RAII; Smart pointers: unique_ptr; shared_ptr and weak_ptr
Exceptions | throw, try and catch; Standard exception classes; Exception safety guarantees; noexcept
Templates | Function templates; Class templates; Template specialisation; Variadic templates
STL containers | vector, deque and list; set and map; unordered_set and unordered_map; stack, queue and priority_queue
STL algorithms and iterators | Iterator categories; Sorting and searching algorithms; transform, accumulate and numeric algorithms; Lambdas with algorithms
Modern C++ | constexpr and consteval; Structured bindings; std::optional, variant and any; Ranges and views
Concurrency | std::thread; Mutexes and lock guards; Condition variables; Atomics and futures
Build systems and tooling | CMake projects; Package managers: vcpkg and Conan; Debugging with GDB and LLDB; Sanitizers and static analysis
Testing and quality | Unit testing with GoogleTest; Code style and clang-format; Undefined behaviour in C++; The C++ Core Guidelines
Performance | Cache-friendly data structures; Move semantics for performance; Profiling C++ programs; Compiler optimisations
Advanced generic programming | SFINAE and type traits; Concepts (C++20); CRTP; Template metaprogramming
Professional C++ | Design patterns in C++; C++ in games, finance and systems; Competitive programming with C++; Interview concepts and career roadmap`},

golang: {
  about: "Go is a simple, compiled language from Google built for fast, concurrent network services. Docker, Kubernetes and much cloud-native tooling are written in Go, and many product companies use it for microservices.",
  prereq: "Basic programming in any language.",
  tools: "Go toolchain, VS Code with Go extension or GoLand, golangci-lint, Docker",
  plan: `
Go fundamentals | Why Go: simplicity, speed and concurrency; Installing Go and setting up modules; Program structure, packages and main; go run, go build and go fmt
Basic types and variables | Variables, constants and zero values; Basic types and type conversion; Strings, runes and bytes; Operators
Control flow and functions | if and switch; for loops, Go's only loop; Functions and multiple return values; Variadic functions and defer
Composite types | Arrays; Slices: length, capacity and append; Maps; Range iteration
Structs and methods | Structs and struct literals; Methods and receivers; Pointer vs value receivers; Embedding and composition
Interfaces | Interfaces and implicit implementation; The empty interface and any; Type assertions and type switches; Common interfaces: Stringer, error, io.Reader
Error handling | The error type; Creating and wrapping errors; errors.Is and errors.As; panic and recover
Packages and modules | Organising packages; Exported vs unexported names; go.mod and dependency management; Tour of the standard library
Goroutines | Goroutines and the Go scheduler; WaitGroups; Race conditions and the race detector; Mutexes
Channels | Unbuffered and buffered channels; The select statement; Worker pools; Pipelines, fan-in and fan-out
Generics | Type parameters; Constraints; Generic data structures; When to use generics
Files, JSON and I/O | Reading and writing files; io and bufio; JSON encoding and struct tags; Working with CSV
Testing | The testing package; Table-driven tests; Benchmarks; Mocks and test doubles
Web servers | net/http basics; Handlers and ServeMux routing; Middleware; JSON APIs
Databases | database/sql; Connecting to PostgreSQL; Query generation with sqlc; Transactions and migrations
Context and advanced concurrency | context.Context for cancellation; Timeouts and deadlines; sync package: Once, Pool, RWMutex; Concurrency patterns
Web frameworks and gRPC | Gin and Echo frameworks; gRPC and Protocol Buffers; Authentication with JWT; API versioning
Performance | Profiling with pprof; Memory allocation and escape analysis; Garbage collector behaviour; Optimisation techniques
Tooling and deployment | Linting with golangci-lint; Cross-compilation; Building Docker images for Go; Configuration and structured logging
Professional Go | Project layout conventions; Go in cloud-native tools like Docker and Kubernetes; Microservices with Go; Interview concepts and career roadmap`},

rust: {
  about: "Rust is a systems language that guarantees memory safety without a garbage collector through ownership and borrowing. It is used for high-performance services, CLIs, WebAssembly, blockchain and OS components.",
  prereq: "Comfort with at least one programming language; C/C++ knowledge helps.",
  tools: "rustup, Cargo, VS Code with rust-analyzer, Clippy, rustfmt",
  plan: `
Rust introduction | Why Rust: safety, speed and concurrency; Installing rustup and Cargo; Hello world and project structure; cargo build, run and check
Basics | Variables, mutability and shadowing; Scalar and compound types; Functions and expressions; Control flow: if, loop, while, for
Ownership | Stack and heap; Ownership rules; Move semantics and Copy; Clone
Borrowing | References and borrowing; Mutable references; The borrow checker; Slices
Structs and enums | Defining structs; Methods with impl; Enums and Option; Pattern matching with match and if let
Collections | Vec; String and &str; HashMap; Iterating collections
Error handling | panic! and unrecoverable errors; Result and recoverable errors; The ? operator; Custom error types
Modules and crates | Packages and crates; Modules and visibility; use and paths; Using external crates from crates.io
Generics and traits | Generic types; Defining and implementing traits; Trait bounds; Common traits: Debug, Clone, Display
Lifetimes | Why lifetimes exist; Lifetime annotations; Lifetimes in structs; Lifetime elision rules
Closures and iterators | Closures; Fn, FnMut and FnOnce; The Iterator trait; Iterator adapters and consumers
Smart pointers | Box; Rc and reference counting; RefCell and interior mutability; Weak references
Concurrency | Threads; Message passing with channels; Shared state with Mutex and Arc; The Send and Sync traits
Testing and docs | Unit and integration tests; Documentation comments and doc tests; Benchmarks; Clippy and rustfmt
Advanced traits and patterns | Associated types; Trait objects and dynamic dispatch; Operator overloading; Advanced pattern matching
Async Rust | Futures and async/await; The Tokio runtime; Async I/O; Streams
Web and APIs | Building APIs with Axum or Actix; Serialization with Serde; Databases with SQLx; Error handling in web apps
Unsafe and FFI | Unsafe Rust and raw pointers; Calling C from Rust; Declarative macros; Procedural macros overview
Systems and performance | Memory layout; Zero-cost abstractions; Profiling Rust code; WebAssembly with Rust
Professional Rust | Workspaces and project organisation; Rust in production: CLIs, systems, blockchain; Idiomatic Rust guidelines; Interview concepts and career roadmap`},

kotlin: {
  about: "Kotlin is a concise, null-safe JVM language and Google's preferred language for Android. It is also used on the server with Ktor and Spring, and for cross-platform apps with Kotlin Multiplatform.",
  prereq: "Basic programming; Java knowledge helps.",
  tools: "IntelliJ IDEA / Android Studio, Gradle Kotlin DSL, JUnit, MockK",
  plan: `
Kotlin basics | What Kotlin is and where it is used; Installing IntelliJ and Kotlin; The main function and program structure; val, var and type inference
Types and operators | Basic types; Strings and string templates; Operators; Type checks and smart casts
Control flow | if as an expression; when expressions; for, while and ranges; Returns and jumps
Functions | Function declarations; Default and named arguments; Single-expression functions; Varargs and infix functions
Null safety | Nullable types; Safe call and Elvis operators; The not-null assertion; let and null-safe scoping
Classes | Classes and constructors; Properties and backing fields; Visibility modifiers; Inheritance and open classes
Special classes | Data classes; Sealed classes; Enum classes; Object declarations and companion objects
Interfaces and generics | Interfaces; Abstract classes; Generics; Variance: in and out
Collections | Lists, sets and maps; Mutable vs immutable collections; Collection operations: map, filter, fold; Sequences
Functional Kotlin | Lambdas; Higher-order functions; Extension functions; Scope functions: apply, also, run, with, let
Exceptions and files | Exceptions and try as an expression; Custom exceptions; File I/O; Working with JSON
Coroutines I | The coroutine concept; launch and async; Suspend functions; Dispatchers
Coroutines II | Structured concurrency; Cancellation and timeouts; Flow; Channels
Delegation and DSLs | Class delegation; Property delegation and lazy; Type-safe builders and DSLs; Annotations and reflection
Testing | JUnit with Kotlin; MockK; Testing coroutines; Kotest overview
Kotlin for Android | Android project structure; Activities and lifecycle; Jetpack Compose basics; ViewModel and state
Kotlin on the server | The Ktor framework; Spring Boot with Kotlin; Databases with Exposed; REST APIs
Kotlin Multiplatform | The multiplatform concept; Shared code with expect and actual; Compose Multiplatform; Kotlin/JS and Kotlin/Native
Build and tooling | Gradle Kotlin DSL; Dependency management; Code style and ktlint; Java interoperability
Professional Kotlin | Architecture patterns: MVVM and clean architecture; Performance considerations; Kotlin best practices; Interview concepts and career roadmap`},

php: {
  about: "PHP is a server-side scripting language that powers a large share of the web, including WordPress and Laravel applications. It is common in agencies, e-commerce and startup back-ends.",
  prereq: "Basic HTML; any programming exposure helps.",
  tools: "PHP 8.3+, Composer, XAMPP / Laravel Herd, VS Code or PhpStorm, MySQL",
  plan: `
PHP introduction | What PHP is and how it runs on servers; Installing PHP, XAMPP and Composer; PHP syntax and embedding in HTML; echo, print and comments
Variables and types | Variables and data types; Strings and string functions; Numbers and math functions; Constants and type juggling
Control flow and functions | if, else and switch; The match expression; Loops: for, while, foreach; Functions, arguments and return types
Arrays | Indexed and associative arrays; Multidimensional arrays; Array functions; Sorting arrays
Forms and superglobals | $_GET and $_POST; Form handling and validation; $_SERVER and $_REQUEST; Sanitising user input
Sessions, cookies and files | Cookies; Sessions; File uploads; Reading and writing files
OOP in PHP | Classes, objects and constructors; Properties, methods and visibility; Inheritance; Interfaces and abstract classes
Advanced OOP | Traits; Static members; Namespaces and autoloading; Magic methods
Databases | MySQL basics for PHP; PDO connections; Prepared statements; CRUD operations
Errors and security | Error handling and exceptions; SQL injection prevention; XSS and CSRF protection; Password hashing
Composer and standards | Composer packages; PSR standards; Autoloading with PSR-4; Code style with PHP-CS-Fixer
Building REST APIs | REST principles in PHP; JSON responses; Routing; Authentication with JWT
MVC architecture | The MVC pattern; Building a simple router; Controllers and views; Templating
Testing | PHPUnit basics; Testing classes; Mocking; Static analysis with PHPStan
Modern PHP | PHP 8 features: named arguments and union types; Enums and readonly properties; Attributes; Fibers
Laravel overview | Laravel installation and structure; Routing and controllers; Blade templates; Eloquent ORM
Symfony and other frameworks | Symfony components; Dependency injection; WordPress and PHP CMSs; Choosing a framework
Performance | OPcache; Caching with Redis; Profiling PHP; Queues and background jobs
Deployment | Apache and Nginx with PHP-FPM; Environment configuration; Docker for PHP; CI/CD for PHP apps
Professional PHP | Design patterns in PHP; Secure coding checklist; The PHP ecosystem and careers; Interview concepts and career roadmap`},

ruby: {
  about: "Ruby is an expressive, developer-friendly object-oriented language best known for the Ruby on Rails web framework. It is popular with startups for building products quickly.",
  prereq: "Basic programming logic.",
  tools: "Ruby 3.x, rbenv / asdf, Bundler, VS Code or RubyMine, RSpec",
  plan: `
Ruby introduction | Ruby philosophy and uses; Installing Ruby and irb; Running scripts; Syntax and conventions
Types and variables | Variables and naming; Numbers and math; Strings and interpolation; Symbols and nil
Control flow | if, unless and case; Loops: while, until, for; Iterators: each and times; Ranges
Collections | Arrays and array methods; Hashes; Enumerable methods; Sorting and searching
Methods | Defining methods; Arguments: default, keyword, splat; Return values; Blocks and yield
Blocks, procs and lambdas | Blocks in depth; Procs; Lambdas; Closures
Classes and objects | Classes and initialize; Instance and class variables; attr_accessor and friends; Method visibility
Inheritance and modules | Inheritance and super; Modules and mixins; Comparable and Enumerable mixins; Namespacing
Exceptions and files | begin, rescue and ensure; Custom exceptions; File I/O; JSON and YAML
Gems and Bundler | RubyGems; Bundler and the Gemfile; Creating a gem; Popular gems
Metaprogramming | Open classes and monkey patching; send and define_method; method_missing; Reflection
Testing | Minitest; RSpec basics; Mocks and stubs; Test-driven development
Ruby idioms | Idiomatic Ruby style; RuboCop; Duck typing; Refinements
Concurrency | Threads; Fibers; Ractors; Async gems
Working with the web | HTTP requests; Rack basics; Sinatra; Consuming APIs
Rails introduction | Rails philosophy and MVC; Routing; Controllers and views; ActiveRecord
Databases | ActiveRecord associations; Migrations; Validations and callbacks; Query optimisation
Performance | Memory and garbage collection; Profiling Ruby; Caching; Background jobs with Sidekiq
Deployment | Deploying Ruby apps; Environment configuration; Docker for Ruby; Monitoring
Professional Ruby | Design patterns in Ruby; The Ruby ecosystem and careers; Best practices; Interview concepts and career roadmap`},

scala: {
  about: "Scala blends object-oriented and functional programming on the JVM. It is widely used in data engineering with Apache Spark, and in high-throughput back-ends with Akka, Play and ZIO.",
  prereq: "Java or another OOP language; basic functional ideas help.",
  tools: "Scala 3, sbt, IntelliJ IDEA with Scala plugin, ScalaTest, Apache Spark",
  plan: `
Scala introduction | Scala on the JVM: functional plus object-oriented; Installing Scala, sbt and IntelliJ; The REPL and worksheets; Program structure
Basics | val, var and types; Expressions and blocks; Strings and interpolation; Control structures as expressions
Functions | Defining functions; Anonymous functions; Higher-order functions; Currying
Classes and objects | Classes and constructors; Objects and companion objects; Case classes; Traits
Pattern matching | match expressions; Matching case classes; Guards and extractors; Sealed traits
Collections | Immutable vs mutable collections; List, Vector, Set and Map; Collection operations; for comprehensions
Option, Either and Try | Option; Either; Try; Error-handling patterns
Functional programming | Pure functions and immutability; Recursion and tail recursion; Function composition; Laziness
Type system | Generics; Variance; Type bounds; Type classes
Implicits and givens | Implicit parameters; given and using in Scala 3; Extension methods; Implicit conversions
Concurrency | Futures and Promises; Execution contexts; Akka actors overview; Parallel collections
Testing | ScalaTest; Property-based testing with ScalaCheck; Mocking; MUnit
Build tools | sbt projects; Dependencies; Multi-module builds; Publishing
Functional libraries | Cats basics; Functors and monads; Cats Effect; ZIO overview
Scala 3 features | New syntax; Enums; Opaque types; Union and intersection types
Web with Scala | Play Framework; http4s; JSON with Circe; REST APIs
Big data with Spark | Spark architecture; RDDs and DataFrames; Spark SQL; Spark jobs in Scala
Streaming | Akka Streams; Kafka with Scala; fs2 streams; Backpressure
Performance and the JVM | JVM tuning for Scala; Profiling; Java interoperability; Compilation speed
Professional Scala | Architecture patterns; Scala in data engineering careers; Best practices; Interview concepts and career roadmap`},

"r-programming": {
  about: "R is a language built for statistics, data analysis and visualisation. It is widely used in research, healthcare, finance analytics and academia, with the tidyverse and ggplot2 as its core toolkit.",
  prereq: "Basic maths and statistics awareness.",
  tools: "R 4.x, RStudio / Positron, tidyverse, ggplot2, Quarto, Shiny",
  plan: `
R introduction | What R is and its uses in statistics; Installing R and RStudio; The RStudio interface and scripts; R as a calculator and variables
Data types and structures | Atomic types; Vectors; Matrices and arrays; Lists
Data frames and factors | Creating data frames; Indexing and subsetting; Factors; Importing CSV and Excel files
Control flow and functions | if, else and ifelse; Loops; Writing functions; The apply family
Packages | CRAN and installing packages; Loading libraries; The tidyverse overview; Getting help and documentation
Data manipulation with dplyr | select and filter; mutate and arrange; group_by and summarise; Joins
Tidy data | Tidy data principles; pivot_longer and pivot_wider; separate and unite; Handling missing values
Strings, dates and factors | stringr; Regular expressions; lubridate for dates; forcats for factors
Visualisation with ggplot2 I | The grammar of graphics; Scatter and line plots; Bar charts and histograms; Aesthetics and colours
Visualisation with ggplot2 II | Facets; Themes and labels; Box and violin plots; Saving plots
Descriptive statistics | Measures of central tendency; Spread and variability; Distributions; Correlation
Inferential statistics | Sampling and the central limit theorem; Confidence intervals; t-tests; Chi-square and ANOVA
Regression | Simple linear regression; Multiple regression; Model diagnostics; Logistic regression
Functional and efficient R | purrr and map functions; Vectorisation; Environments and scoping; Debugging R code
Reporting | R Markdown; Quarto; Tables with knitr and gt; Reproducible reports
Machine learning in R | tidymodels overview; Train/test splits and resampling; Decision trees and random forests; Model evaluation
Time series | ts objects; Decomposition; ARIMA forecasting; The forecast and fable packages
Shiny apps | Shiny architecture; UI and server; Reactivity; Deploying Shiny apps
Databases and big data | DBI and SQL from R; dbplyr; data.table for speed; Arrow and Spark with R
Professional R | Writing R packages; Testing with testthat; R in research and industry careers; Interview concepts and career roadmap`},

"swift-ui": {
  about: "Swift is Apple's modern, safe programming language and SwiftUI is its declarative UI framework. Together they are used to build apps for iPhone, iPad, Mac, Apple Watch and Vision Pro.",
  prereq: "Basic programming; a Mac is required for Xcode.",
  tools: "macOS, Xcode, Swift Playgrounds, SwiftData, Instruments, TestFlight",
  plan: `
Swift basics | The Swift language and the Apple ecosystem; Installing Xcode and using playgrounds; Constants, variables and type inference; Basic types and strings
Control flow and collections | if, guard and switch; Loops; Arrays, sets and dictionaries; Tuples
Functions and closures | Functions and argument labels; Closures; Optionals and unwrapping; Optional chaining
Types | Structs; Classes and reference types; Enums with associated values; Value vs reference semantics
Protocols and generics | Protocols; Extensions; Generics; Error handling with throws
SwiftUI fundamentals | Declarative UI and the View protocol; Text, Image and modifiers; Stacks: VStack, HStack, ZStack; Previews in Xcode
Layout | Spacers, padding and frames; Lists and ForEach; Grids; ScrollView
State management | @State; @Binding; @Observable and ObservableObject; @Environment
User input | Buttons and gestures; TextField and forms; Toggles, pickers and sliders; Input validation
Navigation | NavigationStack; NavigationLink and navigation paths; Sheets and alerts; TabView
Data and networking | Codable and JSON; URLSession; async/await in Swift; Displaying remote data
Persistence | UserDefaults and AppStorage; SwiftData; Core Data overview; File storage
Animations and graphics | Implicit and explicit animations; Transitions; Shapes and paths; Canvas and drawing
Architecture | MVVM in SwiftUI; Dependency injection; Modularising with Swift packages; Combine basics
Concurrency | Tasks and task groups; Actors; MainActor and UI updates; Structured concurrency
Platform features | Notifications; Camera and photos; Maps and location; Widgets
Testing | XCTest unit tests; The Swift Testing framework; UI tests; Testing view models
Accessibility and performance | VoiceOver and accessibility modifiers; Dynamic Type; Profiling with Instruments; Optimising SwiftUI rendering
Publishing | App lifecycle and configuration; Signing and provisioning; TestFlight; App Store guidelines and submission
Professional iOS | UIKit interoperability; iPadOS, watchOS and visionOS overview; Best practices; Interview concepts and career roadmap`},

"shell-bash": {
  about: "Bash is the default command-line shell on Linux and macOS. Shell scripting automates system tasks, deployments and data processing, and is an everyday skill for DevOps, cloud, QA and backend engineers.",
  prereq: "Access to a Linux, macOS or WSL terminal.",
  tools: "Bash, Linux / WSL / macOS terminal, ShellCheck, jq, cron",
  plan: `
The command line | Terminals, shells and Bash; Command syntax, options and arguments; Navigating the file system; Getting help with man, --help and info
Files and directories | Creating, copying, moving and deleting; Viewing files: cat, less, head, tail; Wildcards and globbing; Hard and symbolic links
Permissions and users | File permissions and chmod; Ownership and chown; Users, groups and sudo; umask
Redirection and pipes | Standard input, output and error; Redirection operators; Pipes; tee and xargs
Text processing I | grep; sort, uniq and wc; cut and paste; tr
Text processing II | sed; awk basics; awk for reports; Regular expressions
Processes | ps, top and htop; Job control: bg, fg, jobs; Signals and kill; nohup and background processes
Bash scripting basics | The shebang and running scripts; Variables and quoting; Command substitution; Reading user input
Conditions | Exit codes; test and double-bracket conditions; if, elif and else; case statements
Loops | for loops; while and until loops; Looping over files and lines; Loop control
Functions and arguments | Functions; Positional parameters; getopts; Return values and local variables
Arrays and strings | Indexed arrays; Associative arrays; String manipulation; Parameter expansion
Robust scripts | set -euo pipefail; Error handling and traps; Debugging with set -x; ShellCheck
Networking tools | curl and wget; ssh and scp; netstat, ss and ping; rsync
Scheduling and environment | cron and crontab; Environment variables; .bashrc and .profile; Aliases
System administration scripts | Disk usage and monitoring; Log analysis; Backups; User management scripts
Package and service management | apt, yum and dnf; systemctl and services; journalctl; Installing from source
Automation | Automating deployments; Scripts in CI pipelines; Working with JSON using jq; Templating configuration files
Advanced Bash | Subshells and process substitution; Here documents; Performance tips; Portability: sh vs bash
Professional shell | Zsh and other shells; Security in shell scripts; Shell style guides; Interview concepts and career roadmap`},
});
