export const profile = {
  name: "Hema Priya",
  title: "Senior Software and AI Engineer",
  tagline:
    "I build fast, reliable React, React Native, and Node.js experiences for web, mobile, and Smart TV — and increasingly, agentic AI systems powered by Claude, LangGraph, and RAG pipelines.",
  welcome: "Welcome to my portfolio.",
  phone: "+91 8754207970",
  email: "hemapriya12t@gmail.com",
  linkedin: "https://www.linkedin.com/in/hemapriya12t",
  github: "https://github.com/hemapriya12",
  summary:
    "Senior Software and AI Engineer with 10+ years of experience building scalable web, mobile, and Smart TV applications. Expertise in React.js, React Native, TypeScript, Node.js, Next.js, and AWS, with a strong focus on frontend architecture and performance optimization. Actively expanding into AI engineering building agentic systems with Anthropic Claude, LangGraph, and RAG pipelines. Focused on delivering high-quality, AI-augmented user experiences across enterprise-scale applications.",
};

export const skills = [
  {
    category: "AI",
    items: ["Agentic AI", "LangGraph", "LangChain", "RAG", "Vector Embeddings", "Claude", "ChatGPT", "Gemini"],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Redux",
      "React Native (Mobile & Smart TV)",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "Pydantic", "Alembic"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Vercel", "Terraform"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Microsoft SQL Server"],
  },
  {
    category: "API & Tools",
    items: ["RESTful APIs", "GraphQL", "Figma", "Git", "GitHub"],
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library"],
  },
  {
    category: "Soft Skills",
    items: ["Team Leadership", "Cross-functional Collaboration", "Effective Communication", "Time Management"],
  },
];

export const experienceByCompany = [
  {
    company: "GlobalLogic",
    short: "GL",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Senior Software Engineer (Amazon Fire TV)",
        start: "Dec 2025",
        end: "Present",
        bullets: [
          "Designed and built new screens for the audio enhancement experience — including Settings and Quick View — from Figma hand-off to production, using React and TypeScript with a focus on component architecture.",
          "Collaborated closely with the backend hardware team to align UI behaviour with device-level audio capabilities and constraints, contributing to code reviews in an agile, cross-functional team.",
          "Resolved high-priority bugs in the Settings screen of Amazon Fire TV, improving stability and user-reported issue turnaround.",
        ],
      },
    ],
  },
  {
    company: "Tata Consultancy Services",
    short: "TCS",
    location: "Chennai, India",
    roles: [
      {
        title: "IT Analyst / Senior Front End Developer (Retail Account)",
        start: "Dec 2022",
        end: "Dec 2025",
        bullets: [
          "Led a team of 7 frontend developers, improving overall delivery efficiency and application development performance by 12%.",
          "Designed and developed scalable Next.js and React.js applications using TypeScript, delivering responsive and high-performance user experiences.",
          "Built reusable UI component libraries and implemented modern frontend architecture patterns, improving maintainability and accelerating feature delivery.",
          "Optimized application performance through Server-Side Rendering (SSR), Static Site Generation (SSG), code splitting, lazy loading, and caching strategies.",
          "Integrated GraphQL APIs for efficient data fetching and established testing standards using Jest and React Testing Library, improving code quality, reliability, and application responsiveness.",
        ],
      },
      {
        title: "Full Stack Developer (Retail Account)",
        start: "Oct 2019",
        end: "Dec 2022",
        bullets: [
          "Designed robust backend architectures using Node.js and Express.js.",
          "Containerized backend microservices using Docker and deployed scalable web applications on AWS (EC2/S3) environments.",
          "Managed complex data persistence and indexing strategies leveraging PostgreSQL and MySQL database systems.",
          "Completely re-designed the project visual ecosystem from Figma wireframes into React Native, achieving a 100% user experience score.",
          "Refactored legacy code utilizing modern React Hooks and fine-tuned underlying SQL queries to maximize code reusability and execution efficiency.",
        ],
      },
      {
        title: "Service Engineer (Banking Account)",
        start: "Mar 2016",
        end: "Oct 2019",
        bullets: [
          "Worked in SQL to manage business critical requests, data fixes, and complex reports over huge datasets.",
          "Architected end-to-end automation pipelines for batch monitoring, trade processing, and common application failures, saving ~£50K in operational costs and 10 Person-Days (PD) of effort.",
          "Developed highly efficient stored procedures to automate repetitive database tasks, cutting down manual workloads by 25%.",
          "Spearheaded triaging and resolving high-severity, complex banking application infrastructure issues under strict SLA deadlines.",
        ],
      },
    ],
  },
  {
    company: "Focus Academy (FACE)",
    short: "FA",
    location: "Chennai, India",
    roles: [
      {
        title: "Trainer",
        start: "Jul 2015",
        end: "Oct 2015",
        bullets: [
          "Trained college graduates in quantitative aptitude, logical reasoning, and English vocabulary to maximize placement success rates.",
          "Designed and calibrated specialized evaluation metrics, instructor guide scripts, and mock assessments.",
        ],
      },
    ],
  },
];

type Project = {
  name: string;
  badge?: string;
  description: string;
  video: string;
  liveUrl: string;
  githubUrl: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "Sage",
    badge: "🤖 Agentic AI",
    description:
      "Sage is an AI-powered personal finance app with agentic stock research: autonomous agents decide what data to look up before forecasting, screen real markets via a live-data pipeline, and answer natural-language questions over your own transaction history using RAG.",
    video: "/videos/sage-demo.mp4",
    liveUrl: "https://sage-frontend-steel.vercel.app",
    githubUrl: "https://github.com/hemapriya12/sage",
    tech: [
      "Anthropic Claude",
      "OpenAI Embeddings",
      "Groq",
      "LangGraph",
      "LangChain",
      "pgvector",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth.js",
      "Recharts",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "PostgreSQL (Neon)",
      "Vercel",
      "GitHub Actions",
      "Terraform",
      "Docker",
    ],
  },
  {
    name: "Veloria",
    description:
      "Veloria is a full-stack e-commerce marketplace split into buyer and seller Next.js frontends backed by independent Express microservices (auth, product, order, payment, email) that communicate over Kafka. It uses Prisma/PostgreSQL for data, Stripe for payments, and is managed as a TypeScript pnpm/Turborepo monorepo.",
    video: "/videos/veloria-demo.mp4",
    liveUrl: "https://veloria-ecomm-buyer.vercel.app",
    githubUrl: "https://github.com/hemapriya12/veloria-ecomm",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "MUI",
      "Radix UI",
      "TanStack Query",
      "TanStack Table",
      "Node.js",
      "Express",
      "Kafka",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "pnpm Workspaces",
      "Turborepo",
    ],
  },
];

export const education = [
  {
    degree: "Master of Science (M.Sc.) – Machine Learning & Artificial Intelligence",
    school: "Liverpool John Moores University, UK",
    period: "2026 – Ongoing",
    note: "Additional Credential: Executive Post Graduate Programme in AI / ML, IIIT Bangalore",
  },
  {
    degree: "Bachelor of Engineering (ECE)",
    school: "SRM TRP Engineering College, Tiruchirappalli",
    period: "2011 – 2015",
  },
  {
    degree: "Higher Secondary Education",
    school: "St. Joseph's Matriculation School, Madurai",
    period: "2009 – 2011",
  },
];

export const certifications = [
  "AI Engineer Production Track: Deploy LLMs & Agents at Scale – Udemy",
  "Software Architecture and Design of Modern Large Scale Systems – Udemy",
  "Digital: Front End Developer React JS",
  "JavaScript (Basic) Skill Certification – HackerRank",
];
