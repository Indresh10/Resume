/**
 * Portfolio & Resume Data for Indresh Hemani
 * Centralized data source powering the 3D Portfolio website.
 * Verified with live Google Research & Akasa Air engineering credentials.
 */

const portfolioData = {
    personal: {
        name: "Indresh Hemani",
        roleTitles: [
            "Full-Stack App Developer @ Akasa Air",
            "MCP & Agentic AI Specialist (ChatGPT & LLM Tools)",
            "Mobile Specialist (Flutter, Jetpack Compose, Kotlin)",
            "Backend & Cloud Engineer (Micronaut, Spring Boot, AWS)",
            "IEEE Research Author (Smart Cities & AI-SIoT)"
        ],
        phone: "+91-7424905531",
        email: "hemaniindresh@gmail.com",
        location: "Mumbai, India",
        github: "https://github.com/Indresh10",
        githubUsername: "Indresh10",
        linkedin: "https://linkedin.com/in/indresh-hemani",
        linkedinUsername: "indresh-hemani",
        summary: "Software Engineer at Akasa Air specializing in full-stack mobile systems, high-throughput microservices, and Agentic AI/MCP architectures. Proven impact delivering high-traffic airline applications serving over 500,000 passengers with a 30% crash rate reduction. Author of peer-reviewed IEEE research on AI-SIoT smart city architectures and creator of the Akasa Air Model Context Protocol (MCP) server connecting ChatGPT directly to airline operations.",
        statusBadge: "Active Senior Software Engineer @ Akasa Air & AI Innovator"
    },

    stats: [
        { label: "Active Passengers Served", value: "500K+", icon: "fa-solid fa-users" },
        { label: "Crash Rate Reduction", value: "30%", icon: "fa-solid fa-arrow-trend-down" },
        { label: "IEEE Publications", value: "1 Paper", icon: "fa-solid fa-newspaper" },
        { label: "Live MCP Tools", value: "6 Tools", icon: "fa-solid fa-robot" }
    ],

    skillCategories: [
        {
            category: "AI, MCP & Agentic Systems",
            icon: "fa-solid fa-brain",
            skills: [
                { name: "Model Context Protocol (MCP)", level: "Specialized", icon: "fa-solid fa-network-wired" },
                { name: "ChatGPT Plugin & Actions", level: "Specialized", icon: "fa-solid fa-robot" },
                { name: "LLM Tool Calling & FastMCP", level: "Advanced", icon: "fa-solid fa-bolt" },
                { name: "Natural Language Processing", level: "Advanced", icon: "fa-solid fa-language" },
                { name: "Computer Vision & OpenCV", level: "Advanced", icon: "fa-solid fa-eye" },
                { name: "Edge AI on Raspberry Pi", level: "Hands-on", icon: "devicon-raspberrypi-line" }
            ]
        },
        {
            category: "Mobile Engineering",
            icon: "fa-solid fa-mobile-screen-button",
            skills: [
                { name: "Flutter", level: "Expert", icon: "devicon-flutter-plain" },
                { name: "Android Native & Jetpack Compose", level: "Advanced", icon: "devicon-android-plain" },
                { name: "Kotlin", level: "Advanced", icon: "devicon-kotlin-plain" },
                { name: "iOS Native (Swift)", level: "Intermediate", icon: "devicon-swift-plain" },
                { name: "Play Store & App Store Deployments", level: "Advanced", icon: "fa-solid fa-cloud-arrow-up" }
            ]
        },
        {
            category: "Backend & Microservices",
            icon: "fa-solid fa-server",
            skills: [
                { name: "Micronaut", level: "Advanced", icon: "fa-solid fa-microchip" },
                { name: "Spring Boot", level: "Advanced", icon: "devicon-spring-plain" },
                { name: "Django & Python", level: "Advanced", icon: "devicon-django-plain" },
                { name: "FastAPI & Flask", level: "Intermediate", icon: "devicon-fastapi-plain" },
                { name: "RESTful APIs & JSON-RPC", level: "Expert", icon: "fa-solid fa-arrows-split-up-and-left" },
                { name: "Node.js", level: "Advanced", icon: "devicon-nodejs-plain" }
            ]
        },
        {
            category: "Cloud, DevOps & Databases",
            icon: "fa-solid fa-cloud",
            skills: [
                { name: "AWS (Lambda, S3, API Gateway)", level: "Advanced", icon: "devicon-amazonwebservices-plain-wordmark" },
                { name: "Firebase Realtime / Firestore", level: "Advanced", icon: "devicon-firebase-plain" },
                { name: "PostgreSQL & MySQL", level: "Advanced", icon: "devicon-postgresql-plain" },
                { name: "Docker & Containerization", level: "Intermediate", icon: "devicon-docker-plain" },
                { name: "CI/CD & GitHub Actions", level: "Advanced", icon: "devicon-github-original" }
            ]
        }
    ],

    experience: [
        {
            company: "Akasa Air",
            role: "Senior Software Engineer",
            period: "April 2026 – Present",
            location: "Mumbai, India",
            badge: "Current Role",
            highlights: [
                "Engineered and maintained the core Akasa Air flagship consumer mobile application across Android and iOS platforms.",
                "Spearheaded performance profiling, reducing production app crashes by 30% and significantly elevating user satisfaction across 500,000+ active passengers.",
                "Engineered high-performance Micronaut backend microservice for passenger refund inquiries and transaction processing, reducing retrieval latencies.",
                "Collaborated cross-functionally with UI/UX, QA, and Airport Ground Ops to deliver seamless bi-weekly production releases on Google Play and Apple App Store.",
                "Developed the Akasa Air Model Context Protocol (MCP) server enabling real-time AI agents and ChatGPT to query flight tracking, PNR status, baggage routing, and automated refund checks."
            ],
            techStack: ["Flutter", "Android Native", "iOS", "AWS", "MCP", "Spring Boot", "REST APIs"]
        },
        {
            company: "Akasa Air",
            role: "Software Engineer / Full-Stack App Developer",
            period: "May 2024 – April 2026",
            location: "Mumbai, India",
            badge: "Intial Role",
            highlights: [
                "Engineered and maintained the core Akasa Air flagship consumer mobile application across Android and iOS platforms.",
                "Spearheaded performance profiling, reducing production app crashes by 30% and significantly elevating user satisfaction across 500,000+ active passengers.",
                "Collaborated cross-functionally with UI/UX, QA to deliver seamless bi-weekly production releases on Google Play and Apple App Store.",
                "Was Part of the team that created an internal portal for staff to book tickets for themselves and their family members, as part of which I worked on designing the backend and creating the frontend using Flutter.",
                "Developed the Akasa Air Model Context Protocol (MCP) server enabling real-time AI agents and ChatGPT to query flight tracking, PNR status, baggage routing, and automated refund checks."
            ],
            techStack: ["Flutter", "Android Native", "iOS", "AWS", "MCP", "Spring Boot", "REST APIs"]
        },
        {
            company: "Akasa Air",
            role: "Android App Developer Intern",
            period: "Jan 2024 – Apr 2024",
            location: "Mumbai, India",
            badge: "Internship",
            highlights: [
                "Contributed to core feature engineering for the Akasa Air mobile app during its high-velocity expansion phase.",
                "Conducted rigorous testing, memory profiling, and stability debugging to eliminate critical ANRs and UI freezes.",
                "Collaborated with senior architects to optimize critical API caching layers and offline-first state handling."
            ],
            techStack: ["Android", "Kotlin", "Java", "REST APIs", "Git"]
        },
        {
            company: "Carjoz India Pvt. Ltd.",
            role: "Android App Developer Intern",
            period: "Jan 2021 – Jun 2021",
            location: "India",
            badge: "Internship",
            highlights: [
                "Developed Android applications serving 500+ active field agents, managing vehicle diagnostics, odometer tracking, and high-resolution photo uploads.",
                "Architected an automated service report generation pipeline producing 100+ dynamic branded PDF reports directly from field inputs.",
                "Designed, documented, and deployed a robust backend REST API utilizing Django, streamlining agent workflows."
            ],
            techStack: ["Android", "Django", "Python", "REST APIs", "PDF Generation", "SQL"]
        }
    ],

    research: [
        {
            title: "Ai-Siot Hybrid Architecture for Seamless Integration of IoT in Smart Cities",
            conference: "2024 IEEE 13th International Conference on Communication Systems and Network Technologies (CSNT 2024)",
            publisher: "IEEE Computer Society / IEEE Xplore",
            year: "2024",
            authors: ["Alvis Abreo", "Mayur C", "Indresh Hemani", "Somnath Sinha"],
            badge: "Peer-Reviewed IEEE Publication",
            abstract: "Presents a novel Ai-Siot (Artificial Intelligence - Social Internet of Things) hybrid framework addressing latency bottlenecks, heterogeneous protocol bridging, and edge intelligence in smart city architectures. Employs edge intelligence and graph relationships to dynamically route sensor payloads and traffic analytics.",
            highlights: [
                "Peer-reviewed and presented at IEEE CSNT 2024 international conference",
                "Integrates AI-driven Edge IoT processing with Social Internet of Things (SIoT) relationship models",
                "Demonstrated scalable real-time urban traffic and environmental monitoring with low latency"
            ],
            tags: ["IEEE", "Smart Cities", "AI-SIoT", "Edge IoT", "Distributed Networks", "Computer Vision"],
            link: "https://proceedings.com"
        }
    ],

    education: [
        {
            institution: "Christ (Deemed to be University), Bangalore",
            degree: "Master of Computer Applications (MCA)",
            specialization: "Specialization in Artificial Intelligence",
            period: "2022 – 2024",
            location: "Bangalore, India",
            badge: "Student Placement Coordinator",
            highlights: [
                "Published peer-reviewed research paper at IEEE CSNT 2024 on AI-SIoT Smart City Architectures.",
                "Specialized in Deep Learning, NLP, Edge Computing, Computer Vision, and Microservice Design.",
                "Coordinated 100+ students for my Batch for internship and final placements.",
            ]
        },
        {
            institution: "Christ College, Jagdalpur",
            degree: "Bachelor of Computer Applications (BCA)",
            specialization: "Computer Science & Application Development",
            period: "2018 – 2021",
            location: "Jagdalpur, India",
            badge: "Joint Secretary, Student Council",
            highlights: [
                "Elected Joint Secretary of the Student Council, leading university technical events, student representation.",
                "Built open-source community applications including 'AmchoJagdalpur' for local tourism."
            ]
        }
    ],

    projects: [
        {
            id: "akasa-mcp",
            title: "Akasa Air MCP Server on ChatGPT",
            category: "ai",
            categoryLabel: "AI & Agentic Systems",
            featured: true,
            icon: "fa-solid fa-robot",
            tagline: "Enterprise Model Context Protocol Server for ChatGPT & Live Airline Operations",
            description: "An enterprise-grade Model Context Protocol (MCP) server connecting ChatGPT directly to real-time Akasa Air airline operations. Enables conversational inquiries for live flight status, booking record locator verification, route status, fare availability searches, and web check-in.",
            highlights: [
                "Official ChatGPT Plugin Integration (plugin_asdk_app_69ef573311908191975c1bfb3baa12fc)",
                "6 Enterprise MCP Capabilities: flight status, PNR lookup, route search, fare finder, booking flow, and web check-in",
                "OpenAI UI Output Templates for native in-chat rich visual flight cards and booking summaries",
                "Strict single-airline scope policy and guardrails protecting Akasa Air inventory",
                "Available to try live directly in the official Akasa Air ChatGPT extension"
            ],
            tags: ["Model Context Protocol (MCP)", "ChatGPT Plugin", "AI Agents", "OpenAI UI Templates", "Cloud Backend", "JSON-RPC 2.0"],
            links: {
                chatgpt: "https://chatgpt.com/plugins/plugin_asdk_app_69ef573311908191975c1bfb3baa12fc?q=akasa",
                github: "https://github.com/Indresh10",
                demo: "#mcp-playground"
            },
            stats: [
                { label: "Platform", value: "ChatGPT App" },
                { label: "Capabilities", value: "6 Live Tools" },
                { label: "Protocol", value: "MCP (JSON-RPC)" }
            ]
        },
        {
            id: "akasa-mobile",
            title: "Akasa Air Mobile App & Cloud Backend",
            category: "mobile",
            categoryLabel: "Mobile & Cloud",
            featured: true,
            icon: "fa-solid fa-plane-departure",
            tagline: "Enterprise Airline Application Serving 500,000+ Passengers",
            description: "Production mobile application for India's fastest-growing airline. Built with cross-platform Flutter and native Android/iOS components, integrated with scalable AWS backend microservices and Micronaut refund handling.",
            highlights: [
                "Achieved 30% reduction in production crash rate across 500,000+ downloads",
                "Streamlined booking, seat selection, web check-in, boarding passes, and flight status"
            ],
            tags: ["Flutter", "Android Native", "iOS", "AWS", "Micronaut", "Spring Boot", "REST APIs"],
            links: {
                live: "https://www.akasaair.com",
                github: "https://github.com/Indresh10"
            },
            stats: [
                { label: "Downloads", value: "500K+" },
                { label: "Crash Drop", value: "-30%" },
                { label: "Cadence", value: "Bi-weekly Releases" }
            ]
        },
        {
            id: "smart-traffic-iot",
            title: "Smart Traffic Tracking & Monitoring System",
            category: "ai",
            categoryLabel: "AI & IoT",
            featured: true,
            icon: "fa-solid fa-traffic-light",
            tagline: "Edge IoT & Computer Vision System on Raspberry Pi",
            description: "An edge-computing AI monitoring system built on Raspberry Pi utilizing Computer Vision and Image Recognition to detect, track, and record vehicle license plates, entry/exit timestamps, and traffic density.",
            highlights: [
                "Real-time object detection and vehicle classification at the network edge",
                "Integrated with the IEEE 2024 AI-SIoT research architecture for smart cities",
                "Automated violation logging and real-time alert notifications"
            ],
            tags: ["Raspberry Pi", "Computer Vision", "Python", "OpenCV", "AI-SIoT", "IoT"],
            links: {
                github: "https://github.com/Indresh10"
            },
            stats: [
                { label: "Platform", value: "Raspberry Pi 4" },
                { label: "Vision", value: "OpenCV / YOLO" },
                { label: "Latency", value: "Edge Realtime" }
            ]
        },
        {
            id: "atms-voice",
            title: "Attendance Management System (ATMS)",
            category: "ai",
            categoryLabel: "AI & NLP",
            featured: false,
            icon: "fa-solid fa-microphone-lines",
            tagline: "Voice & NLP-Driven Automated Attendance Reporting",
            description: "An intelligent Android application powered by Natural Language Processing (NLP) and speech recognition. Allows automated attendance logging through voice commands and spoken name detection with instant exportable reports.",
            highlights: [
                "Speech-to-text recognition with NLP entity extraction",
                "Automated attendance computation and dispute resolution",
                "Exportable daily/weekly summary reports"
            ],
            tags: ["Android", "NLP", "Python", "Speech Recognition", "SQLite", "Kotlin"],
            links: {
                github: "https://github.com/Indresh10"
            }
        },
        {
            id: "amcho-jagdalpur",
            title: "Amcho Jagdalpur – Tourism & City Guide App",
            category: "mobile",
            categoryLabel: "Mobile & Community",
            featured: false,
            icon: "fa-solid fa-map-location-dot",
            tagline: "Cultural Heritage & Tourism Android Application",
            description: "Native Android application engineered to celebrate and showcase the cultural heritage, tourism destinations, and civic updates of Jagdalpur, Bastar. Features interactive maps, offline guides, and bilingual content.",
            highlights: [
                "Interactive tourist spots explorer with offline caching",
                "Community updates and event listings with Firebase integration",
                "High user engagement and positive community feedback"
            ],
            tags: ["Android Native", "Kotlin", "Firebase", "Google Maps SDK", "Material Design 3"],
            links: {
                github: "https://github.com/Indresh10/AmchoJagdalpur"
            }
        },
        {
            id: "andromonth-curriculum",
            title: "AndroMonth – 30 Days of Android Kotlin",
            category: "mobile",
            categoryLabel: "Open Source & Education",
            featured: false,
            icon: "fa-solid fa-graduation-cap",
            tagline: "Curated 30-Day Android Architecture & Kotlin Blueprint",
            description: "A comprehensive open-source curriculum and practical code repository covering 30 days of intensive modern Android development, including MVVM architecture, Jetpack Compose, Coroutines, StateFlow, Room, and Retrofit.",
            highlights: [
                "Over 30 hands-on code modules from basics to advanced architecture",
                "Used by aspiring Android developers for structured learning",
                "Clean code standards and unit testing examples included"
            ],
            tags: ["Android", "Kotlin", "Jetpack Compose", "Coroutines", "MVVM", "Open Source"],
            links: {
                github: "https://github.com/Indresh10/AndroMonth"
            }
        },
        {
            id: "carjoz-engine",
            title: "Carjoz Automotive Inspection & PDF Engine",
            category: "backend",
            categoryLabel: "Full-Stack & Backend",
            featured: false,
            icon: "fa-solid fa-car-side",
            tagline: "Fleet Diagnostics & Automated Enterprise PDF Generator",
            description: "Field service inspection system for 500+ agents to record automotive health, odometer readings, and inspection photos. Includes a Django REST API and custom PDF generation service producing 100+ reports daily.",
            highlights: [
                "Dynamic PDF report generation engine with digital signatures",
                "Clean Django REST API for real-time mobile sync",
                "Offline-first sync capabilities for field workers"
            ],
            tags: ["Django", "Python", "Android", "REST APIs", "ReportLab", "PostgreSQL"],
            links: {
                github: "https://github.com/Indresh10"
            }
        }
    ]
};
