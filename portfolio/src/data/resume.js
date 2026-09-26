/**
 * Structured resume data — extracted directly from Mohd_Saif_.docx.
 * Treat this file as the single source of truth for all portfolio content.
 * Do not add metrics, features, or claims that aren't in here.
 */

export const profile = {
  name: 'Mohd Saif',
  roleTitle: 'MERN Stack Developer | Full Stack & Backend Engineering | REST APIs | AI & RAG',
  location: 'Bareilly, Uttar Pradesh, India',
  phone: '+91 9027370778',
  email: 'saifofficial0778@gmail.com',
  links: {
    github: 'https://github.com/saifofficial0778-svg',
    linkedin: 'https://www.linkedin.com/in/mohd-saif-svg/',
    leetcode: 'https://leetcode.com/u/MOSAIF1',
  },
  summary:
    "MERN/Full Stack Developer and MCA candidate (Expected 2027) with hands-on experience building scalable REST APIs, JWT/RBAC authentication systems, and MySQL-driven backend architectures across two production-style platforms — School ERP and SRMS Connect. Skilled in Node.js, Express.js, and relational database design, with additional experience integrating LLMs and Retrieval-Augmented Generation (RAG) for AI-powered applications. Strong foundation in Data Structures & Algorithms (100+ problems solved) and core CS fundamentals (OOP, DBMS, Operating Systems, Computer Networks), applied consistently from schema design through secure, validated implementation.",
}

export const skills = {
  Languages: ['JavaScript (ES6+)', 'Python'],
  Frontend: ['React.js', 'HTML5', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js', 'RESTful API Design'],
  Databases: ['MySQL', 'MongoDB', 'SQL', 'Database Design'],
  'Authentication & Security': ['JWT', 'Authentication', 'Authorization', 'RBAC', 'bcryptjs', 'Zod'],
  'AI / Generative AI': [
    'LLMs',
    'Generative AI',
    'Prompt Engineering',
    'Retrieval-Augmented Generation (RAG)',
    'LLM API Integration',
  ],
  Architecture: [
    'Controller-Service-Repository',
    'Backend Architecture',
    'API Design',
    'Multi-Tenant Architecture',
    'Transaction Management',
  ],
  Tools: ['Git', 'GitHub', 'Postman', 'Cloudinary', 'MySQL Workbench'],
  'Core CS': ['Data Structures & Algorithms (100+ solved)', 'OOP', 'DBMS', 'Computer Networks', 'Operating Systems'],
}

export const experience = [
  {
    role: 'Full Stack Developer Intern — SRMS Connect',
    stack: 'MERN Stack, MySQL, JWT',
    date: 'July 2026',
    subtitle: 'Alumni & Student Networking Platform',
    points: [
      "Engineered SRMS Connect's core authentication system from scratch using JWT, bcrypt password hashing, and Zod schema validation to secure signup, login, logout, and password-reset flows across the platform.",
      'Implemented Role-Based Access Control (RBAC) across Student, Alumni, and Admin roles alongside failed-login lockout logic, converting a single open login into a permissioned, brute-force-resistant system.',
      'Designed a 3-tier MySQL data architecture (Identity/Auth/Application) to cleanly separate college-verified records from live application data, improving data integrity and long-term maintainability.',
      'Structured 30+ backend REST endpoints using a Controller-Service-Repository architecture with Cloudinary integration for media handling, keeping the codebase modular and easier to extend without touching core business logic.',
    ],
  },
]

export const projects = [
  {
    title: 'School ERP System (SaaS)',
    tagline:
      'A multi-tenant school management platform — one codebase serving multiple schools, with role-scoped access and automated fee processing.',
    stack: ['MERN Stack', 'MySQL'],
    points: [
      'Designed a multi-tenant MERN architecture for School ERP (SaaS), enabling a single codebase to serve multiple schools instead of requiring a separate deployment per institution.',
      'Built and shipped 60+ RESTful APIs covering Academic Year, School, Class, Student, and Teacher modules, each secured with JWT authentication to support role-scoped access.',
      'Applied RBAC across admin, teacher, and student roles so each user could only view and act on data scoped to their permissions, enforcing separation of duties at the API level.',
      'Engineered a transaction-safe fee-payment system using ACID-compliant MySQL transactions to auto-generate fee accounts, installments, and receipts in place of manual accounting entries.',
    ],
    // No public repo/demo URL provided — omit until one exists.
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'SRMS Connect',
    tagline:
      'An alumni–student networking platform built from the ground up, with JWT authentication, RBAC, and a layered MySQL data architecture.',
    stack: ['MERN Stack', 'MySQL', 'JWT'],
    points: [
      "Engineered SRMS Connect's core authentication system from scratch using JWT, bcrypt password hashing, and Zod schema validation to secure signup, login, logout, and password-reset flows across the platform.",
      'Implemented Role-Based Access Control (RBAC) across Student, Alumni, and Admin roles alongside failed-login lockout logic, converting a single open login into a permissioned, brute-force-resistant system.',
      'Designed a 3-tier MySQL data architecture (Identity/Auth/Application) to cleanly separate college-verified records from live application data, improving data integrity and long-term maintainability.',
      'Structured 30+ backend REST endpoints using a Controller-Service-Repository architecture with Cloudinary integration for media handling, keeping the codebase modular and easier to extend without touching core business logic.',
    ],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'AI Resume Parser & Screening Tool',
    tagline:
      'Turns unstructured resumes and job descriptions into structured, schema-validated data, then ranks candidates by fit instead of manual screening.',
    stack: ['Python', 'Groq LLM API', 'Pydantic'],
    points: [
      'Built an AI-powered resume parsing and screening tool that extracts structured data from unstructured resumes (PDF/DOCX) and job descriptions using a Groq-hosted LLM with Pydantic schemas for structured output.',
      'Applied prompt engineering to guide the LLM toward consistent, schema-validated extraction, then automated candidate-to-job scoring against parsed requirements to replace manual screening with a ranked fit percentage and skills-gap breakdown.',
      'Ranked and auto-shortlisted candidates by score, reducing multi-resume review to a single sorted list, and am now preparing the tool for web deployment.',
    ],
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Personal Notes RAG',
    tagline:
      'A retrieval-augmented generation system built over my own Hinglish study notes, so answers come straight from what I studied instead of scrolling long AI-chat exports.',
    stack: ['Python', 'Qdrant', 'Sentence-Transformers', 'Groq LLM API'],
    // Actual pipeline, as implemented — used to render the flow diagram on this card.
    pipeline: [
      'PDF Notes',
      'Text Cleaning',
      'Markdown',
      'Chunking',
      'Embeddings',
      'Qdrant',
      'Retrieval',
      'LLM Answer',
    ],
    points: [
      'Built a RAG system that turns AI-chat PDF exports of Hinglish study notes into a searchable knowledge base, so answers come straight from my notes instead of scrolling long, filler-heavy chats.',
      'Engineered a Python pipeline (pypdf, regex) for rule-based cleaning — LLM-based cleaning altered the text, so rule-based cleaning was used instead — plus heading-aware chunking and metadata.',
      'Embedded chunks with BAAI/bge-m3 into Qdrant and grounded a Groq LLM on the top-3 matches; 5 of 6 test queries hit top-1.',
    ],
    githubUrl: null,
    liveUrl: null,
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'SRMS College, Bareilly',
    date: 'Expected 2027',
  },
  {
    degree: 'Bachelor of Science (B.Sc.)',
    institution: 'MJPRU University',
    date: '2024',
  },
]

export const achievements = [
  'Solved 100+ Data Structures & Algorithms (DSA) problems and earned the 50+ Day LeetCode Badge (2026) for consistent daily problem-solving.',
  'Oracle Certified Foundations Associate — Agentic AI (Oracle University, Aug 2026).',
]
