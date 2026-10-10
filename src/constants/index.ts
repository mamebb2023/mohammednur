export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

// The single source of truth for routes: the header tabs and the page titles
// both read from this.
export const routes = [
  { label: "Hey", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2, delay: 1 },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.4 },
  },
};

// "/about" -> "About", "/" -> "Home"
export function pageNameFromPath(pathname: string) {
  const match = routes.find(({ path }) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path),
  );

  return match?.label ?? "Home";
}

export const rollTransition = { duration: 0.5, ease: easeOutExpo };

export const stackVariants = {
  hidden: { y: "130%", rotate: 10 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.55, ease: easeOutExpo, delay: 0.45 + i * 0.08 },
  }),
};

export const activeSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
  bounce: 0,
};

export const hoverSpring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 32,
  bounce: 0,
};

export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

export const projects = [
  {
    color: "#d223c3ff",
    title: "LotusFlow",
    mini_title: "AI-Powered React Component Generator",
    description:
      "AI-powered tool to generate React components just from text prompts.",
    role: "Full Stack Developer",
    links: { live: "https://lotusflow.vercel.app/" },
    duration: "Aug 2025 - Present",
    features: [
      "AI-Powered Component Generation",
      "Real-time Design Preview",
      "Real-time Code Preview",
      "Customizable Props",
      "Export Options",
      "Responsive Design",
    ],
    logo: "/assets/lotusflow/lotusflow-logo.webp",
    images: [
      "/assets/lotusflow/lotusflow-1.webp",
      "/assets/lotusflow/lotusflow-2.webp",
      "/assets/lotusflow/lotusflow-3.webp",
      "/assets/lotusflow/lotusflow-4.webp",
      "/assets/lotusflow/lotusflow-5.webp",
      "/assets/lotusflow/lotusflow-6.webp",
    ],
    bestProject: true,
  },
  {
    color: "#6BCF91",
    title: "WeMD Africa",
    mini_title: "Online Dermatology Clinic",
    description: "Connecting patients with dermatologists across Africa.",
    role: "Front-end Developer",
    links: { live: "https://wemd-africa.vercel.app/" },
    duration: "Nov 2024 - Dec 2024",
    features: [
      "Light/Dark Theme",
      "Fully Responsive",
      "Localization (English and Amharic)",
      "Doctor Consultation Stepped Form",
      "Chat Page",
      "Animations ...",
    ],
    logo: "/assets/wemd/wemd-logo.webp",
    images: [
      "/assets/wemd/wemd-1.webp",
      "/assets/wemd/wemd-2.webp",
      "/assets/wemd/wemd-3.webp",
      "/assets/wemd/wemd-4.webp",
      "/assets/wemd/wemd-5.webp",
      "/assets/wemd/wemd-6.webp",
    ],
    bestProject: true,
    forClient: true,
  },
  {
    color: "#00D9FF",
    forClient: true,
    title: "SanAI",
    mini_title: "Your Personal AI Doctor",
    description: "AI-powered health assistant for personalized care.",
    role: "Full Stack Developer",
    links: { live: "https://sanai-nu.vercel.app/" },
    duration: "May 2025 - Jul 2025",
    features: [
      "AI Voice Chatbot",
      "Image Recognition",
      "Symptom Checker",
      "Health Tips",
      "Personalized Health Insights",
      "Responsive Design",
    ],
    logo: "/assets/sanai/sanai-logo.webp",
    images: [
      "/assets/sanai/sanai-1.webp",
      "/assets/sanai/sanai-2.webp",
      "/assets/sanai/sanai-3.webp",
      "/assets/sanai/sanai-4.webp",
      "/assets/sanai/sanai-5.webp",
      "/assets/sanai/sanai-6.webp",
    ],
  },
  {
    color: "#b861ffff",
    title: "Brainwave",
    mini_title: "Modern & Responsive SaaS Landing Page",
    description:
      "A sleek and modern React website showcasing the latest in web design.",
    role: "Front-end Developer",
    links: {
      live: "https://brainwave-iota-five-26.vercel.app/",
      code: "https://github.com/mamebb2023/brainwave/",
    },
    duration: "Feb 2024 - Mar 2024",
    features: [
      "Responsive Design",
      "Modern UI Components",
      "Smooth Animations",
      "SEO Optimized",
      "Cross-Browser Compatibility",
    ],
    logo: "/assets/brainwave/brainwave-logo.webp",
    images: [
      "/assets/brainwave/brainwave-1.webp",
      "/assets/brainwave/brainwave-2.webp",
      "/assets/brainwave/brainwave-3.webp",
      "/assets/brainwave/brainwave-4.webp",
      "/assets/brainwave/brainwave-5.webp",
      "/assets/brainwave/brainwave-6.webp",
    ],
  },
  {
    color: "#3c87b9ff",
    title: "CalHabit",
    mini_title: "Habit tracking web app",
    description:
      "Modern habit tracker designed to help you stay on top of your goals",

    role: "Full Stack Developer",
    links: {
      live: "https://cal-habit.vercel.app/",
      code: "https://github.com/mamebb2023/CalHabit",
    },
    features: ["Easy Habit Tracking", "Responsive Design"],
    logo: "/assets/calhabit/calhabit-logo.webp",
    images: [
      "/assets/calhabit/calhabit-1.webp",
      "/assets/calhabit/calhabit-2.webp",
      "/assets/calhabit/calhabit-3.webp",
      "/assets/calhabit/calhabit-4.webp",
      "/assets/calhabit/calhabit-5.webp",
      "/assets/calhabit/calhabit-6.webp",
    ],
  },
];

export const miniProjects = [
  {
    color: "#ff8c00",
    title: "DevOverflow | Q&A Web Application",
    description:
      "A modern Q&A platform designed to foster knowledge sharing and collaboration.",
    role: "Full Stack Developer",
    links: ["https://github.com/mamebb2023/nextjs"],
    duration: "Sep 2024 - Nov 2024",
    features: [
      "Clerk User Authentication",
      "Question and Answer System",
      "Upvote/Downvote Mechanism",
      "Commenting System",
      "Responsive Design",
      "Admin Dashboard",
    ],
    logo: "/assets/devflow/devflow-logo.webp",
    image: "/assets/devflow/devflow-1.webp",
  },
  {
    color: "#008c00",
    title: "Ethio-Commerce",
    mini_title: "Secure & User-Friendly E-Commerce",
    description: "E-commerce platform designed to simplify online shopping",
    role: "Front-end Developer",
    links: ["https://github.com/mamebb2023/ethio-commerce/"],
    features: [
      "Secure Login System",
      "Easy Cart Management",
      "Streamlined Admin Tools",
    ],
    logo: "/assets/et/et-logo.webp",
    images: ["/assets/et/et-1.webp"],
  },
  {
    color: "#056c0f",
    title: "TraderPro",
    description: "Modern landing page made with React website",
    role: "Front-end Developer",
    links: [
      "https://traderpro-1.vercel.app/",
      "https://github.com/mamebb2023/TraderPro",
    ],
    features: ["Responsive Design", "Smooth Scrolling", "Animated Elements"],
    logo: "/assets/tp/tp-logo.webp",
    image: "/assets/tp/tp-1.webp",
  },
  {
    color: "#ffff00",
    title: "Maze Game",
    description: "C-powered maze challenge built with the SDL2 Engine. ",
    role: "Software Developer",
    links: [
      "https://mamez7878.github.io/maze/",
      "https://github.com/mamebb2023/Maze-Project",
    ],
    features: ["Interactive Gameplay", "Easy control"],
    logo: "/assets/maze/maze-logo.webp",
    image: "/assets/maze/maze-1.webp",
  },
];
