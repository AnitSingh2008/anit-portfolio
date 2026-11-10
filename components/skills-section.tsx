
"use client"

import type React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import {
  Code2,
  FileCode,
  Braces,
  Atom,
  Layers,
  Palette,
  LayoutGrid,
  Smartphone,
  Plug,
  Database,
  Figma,
  GitBranch,
  Server,
  CreditCard,
  ShieldCheck,
  Mail,
  Workflow,
  Monitor,
  Cloud,
  Terminal,
  HardDrive,
  KeyRound,
  Network,
  LockKeyhole,
  Globe,
} from "lucide-react"

const GREEN = "#AFFF00"

const skillCategories = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    subtitle: "Building modern, responsive and interactive user interfaces.",
    icon: Monitor,
    skills: [
      {
        number: "01",
        title: "HTML5",
        icon: Code2,
        description: "Building semantic, structured, and accessible web pages using modern HTML5 standards.",
      },
      {
        number: "02",
        title: "CSS3",
        icon: Palette,
        description: "Creating modern layouts, animations, transitions, and responsive designs using CSS3.",
      },
      {
        number: "03",
        title: "JavaScript",
        icon: FileCode,
        description: "Developing dynamic web applications with ES6+, DOM manipulation, and asynchronous programming.",
      },
      {
        number: "04",
        title: "TypeScript",
        icon: Braces,
        description: "Writing structured and maintainable application code using TypeScript and type safety.",
      },
      {
        number: "05",
        title: "React.js",
        icon: Atom,
        description: "Building interactive interfaces using reusable components, hooks, and modern React practices.",
      },
      {
        number: "06",
        title: "Next.js",
        icon: Layers,
        description: "Developing production-ready applications using Next.js, routing, rendering, and optimization.",
      },
      {
        number: "07",
        title: "Tailwind CSS",
        icon: Palette,
        description: "Creating clean, modern, and responsive interfaces using utility-first CSS styling.",
      },
      {
        number: "08",
        title: "Bootstrap",
        icon: LayoutGrid,
        description: "Building mobile-friendly layouts using Bootstrap's grid system and reusable components.",
      },
      {
        number: "09",
        title: "Redux Toolkit",
        icon: Database,
        description: "Managing global application state, authentication, and complex data flows efficiently.",
      },
      {
        number: "10",
        title: "Responsive Design",
        icon: Smartphone,
        description: "Developing adaptive interfaces that work smoothly across mobile, tablet, and desktop devices.",
      },
      {
        number: "11",
        title: "Framer Motion",
        icon: Workflow,
        description: "Adding smooth animations, transitions, and interactive motion effects to React applications.",
      },
    ],
  },

  {
    id: "backend",
    number: "02",
    title: "Backend Development",
    subtitle: "Developing server-side logic, APIs, database operations, and authentication systems.",
    icon: Server,
    skills: [
      {
        number: "12",
        title: "Python",
        icon: FileCode,
        description: "Developing backend functionality, application logic, and server-side solutions using Python.",
      },
      {
        number: "13",
        title: "Django",
        icon: Server,
        description: "Building secure and maintainable backend applications using Django.",
      },
      {
        number: "14",
        title: "Django REST Framework",
        icon: Plug,
        description: "Developing REST APIs using serializers, views, permissions, and API views.",
      },
      {
        number: "15",
        title: "Django ORM",
        icon: Database,
        description: "Managing database operations using Django ORM, queries, and model relationships.",
      },
      {
        number: "16",
        title: "Models & Relationships",
        icon: Network,
        description: "Designing database models and relationships using ForeignKey, OneToOneField, and ManyToManyField.",
      },
      {
        number: "17",
        title: "REST API",
        icon: Globe,
        description: "Building and integrating REST APIs to connect frontend applications with backend services.",
      },
      {
        number: "18",
        title: "JWT Authentication",
        icon: ShieldCheck,
        description: "Implementing secure user authentication and token-based access using JWT.",
      },
      {
        number: "19",
        title: "Permissions & Authorization",
        icon: LockKeyhole,
        description: "Managing API access and user permissions to protect application resources.",
      },
      {
        number: "21",
        title: "Django Admin Panel",
        icon: Monitor,
        description: "Managing users, products, orders, and database records through Django's built-in admin interface.",
      },
      {
        number: "20",
        title: "Email OTP & SMTP",
        icon: Mail,
        description: "Implementing email verification, OTP authentication, and automated email communication using SMTP.",
      },
    ],
  },
  {
    id: "database",
    number: "03",
    title: "Database & Payment Integration",
    subtitle: "Managing application data and implementing payment workflows.",
    icon: Database,
    skills: [
      {
        number: "19",
        title: "PostgreSQL",
        icon: Database,
        description: "Working with relational databases, data models, relationships, and queries using PostgreSQL.",
      },
      {
        number: "20",
        title: "MySQL",
        icon: HardDrive,
        description: "Managing relational data and performing database operations using MySQL.",
      },
      {
        number: "21",
        title: "SQLite",
        icon: Database,
        description: "Using SQLite for lightweight database storage and development workflows.",
      },
      {
        number: "22",
        title: "Stripe Payments",
        icon: CreditCard,
        description: "Integrating Stripe payment gateway for secure online checkout and payment processing.",
      },
      {
        number: "23",
        title: "Axios",
        icon: Plug,
        description: "Handling HTTP requests, API responses, and backend communication using Axios.",
      },
    ],
  },

  {
    id: "tools",
    number: "04",
    title: "Tools & Workflow",
    subtitle: "Tools I use for development, collaboration, and deployment.",
    icon: Workflow,
    skills: [
      {
        number: "24",
        title: "Git",
        icon: GitBranch,
        description: "Managing source code changes, branches, commits, and version control workflows.",
      },
      {
        number: "25",
        title: "GitHub",
        icon: GitBranch,
        description: "Hosting repositories, managing code, and collaborating through GitHub.",
      },
      {
        number: "26",
        title: "Figma",
        icon: Figma,
        description: "Converting Figma designs into pixel-perfect and responsive web interfaces.",
      },
      {
        number: "27",
        title: "Postman",
        icon: Plug,
        description: "Testing REST APIs, checking responses, and debugging backend endpoints.",
      },
      {
        number: "28",
        title: "VS Code",
        icon: Terminal,
        description: "Using Visual Studio Code for efficient coding, debugging, and project development.",
      },
      {
        number: "29",
        title: "Vercel & Render",
        icon: Cloud,
        description: "Deploying frontend and backend applications using modern cloud hosting platforms.",
      },
    ],
  },
]

function SkillCard({ skill, index }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5

    x.set(px)
    y.set(py)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        x.set(0)
        y.set(0)
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer h-full"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      {/* OUTER GLOW */}
      <motion.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${GREEN}40, transparent, ${GREEN}40)`,
          filter: "blur(12px)",
        }}
        animate={hover ? { opacity: [0.3, 0.7, 0.3] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* CARD */}
      <div className="relative bg-[#0a0a0a] rounded-2xl p-6 border border-[#AFFF00]/20 overflow-hidden h-full min-h-[235px]">

        {/* ICON */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center bg-[#AFFF00]/10 border border-[#AFFF00]/20"
          animate={{
            boxShadow: hover
              ? [
                "0 0 0px #AFFF00",
                "0 0 18px #AFFF00",
                "0 0 0px #AFFF00",
              ]
              : "0 0 0px #AFFF00",
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <skill.icon className="w-6 h-6 text-[#AFFF00]" />
        </motion.div>

        {/* NUMBER */}
        <span className="text-4xl font-black text-[#AFFF00]">
          {skill.number}.
        </span>

        {/* TITLE */}
        <h3 className="text-xl font-bold text-white mt-3 pr-10">
          {skill.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-white/50 mt-3 leading-relaxed">
          {skill.description}
        </p>

        {/* BOTTOM LINE */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] w-full bg-[#AFFF00] origin-left"
          animate={hover ? { scaleX: [0, 1] } : { scaleX: 0.4 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: (i * 17) % 100,
        top: (i * 29) % 100,
      })),
    []
  )

  return (
    <section id="skills" className="relative py-28 bg-[#121212] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#121212]" />

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#AFFF00]/20 rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* MAIN HEADING */}
        <div className="text-center mb-20">
          <p className="text-[#AFFF00] text-sm font-mono tracking-[0.3em] uppercase mb-4">
            My Technical Expertise
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white">
            What I <span className="text-[#AFFF00]">Do</span>
          </h2>

          <p className="text-white/50 max-w-2xl mx-auto mt-5 leading-relaxed">
            Technologies and tools I use to build modern, scalable,
            and high-performance web applications.
          </p>
        </div>

        {/* SKILL CATEGORIES */}
        <div className="space-y-20">
          {skillCategories.map((category) => (
            <div key={category.id}>

              {/* CATEGORY HEADING */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#AFFF00]/10 border border-[#AFFF00]/20 flex items-center justify-center">
                  <category.icon className="w-7 h-7 text-[#AFFF00]" />
                </div>

                <div>
                  <p className="text-[#AFFF00] text-xs font-mono tracking-widest mb-1">
                    CATEGORY {category.number}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {category.title}
                  </h3>

                  <p className="text-sm text-white/40 mt-1">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* SKILL CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {category.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.number}
                    skill={skill}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
