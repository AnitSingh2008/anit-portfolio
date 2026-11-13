"use client"

import type React from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

const projects = [
  {
  id: 1,
  name: "NexaMart",
  tagline: "Full Stack E-Commerce Website",
  description: "Designed and developed a complete full-stack e-commerce application independently, building both the frontend and backend from scratch. Developed a responsive user interface using Next.js and React, and built backend functionality using Python, Django, and Django REST Framework. Implemented user authentication with JWT, email OTP verification using Gmail SMTP, product and category management, shopping cart, order processing, and Stripe payment integration. Used PostgreSQL for database management and Redux Toolkit for global state management, ensuring a seamless shopping experience with secure API communication.",
  image: "/images/projects/nexaMart.png",
  tools: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "Python",
    "Django",
    "Django REST Framework",
    "PostgreSQL",
    "REST API",
    "JWT Authentication",
    "Email OTP",
    "SMTP",
    "Stripe",
    "Axios",
    "Git",
    "GitHub"
  ],
  liveUrl: "https://nexa-mart-cyan.vercel.app/",
  accent: "#AFFF00",
},
  {
    id: 2,
    name: "Opinings",
    tagline: "Job Portal Platform",
    description: "Developed a fully functional company portal using Next.js and React for managing recruitment workflows. Designed and implemented responsive user interfaces, allowing employers to create, manage, and monitor job listings efficiently. Integrated REST APIs using Axios, managed global state with Redux Toolkit, implemented authentication and protected routes, and built reusable components to ensure a scalable and maintainable application.",
    image: "/images/projects/opining.png",
    tools: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "Axios",
      "Tailwind CSS",
      "JavaScript",
      "REST API",
      "Authentication",
      "Protected Routes",
      "Responsive Design",
      "UI Development",
      "Git"
    ],
    liveUrl: "https://opinings.com/",
    accent: "#AFFF00",
  },
  {
    id: 3,
    name: "Biogiri UI",
    tagline: "React Project",
    description: "Designed and developed the complete frontend of an Ayurvedic e-commerce website using React. Created responsive UI components, product pages, cart interfaces, and smooth navigation with React Router. Used useState and useEffect for state and data handling while focusing on performance, usability, and modern design. Backend and payment functionality were implemented separately.",
    image: "/images/projects/biogiri.png",
    tools: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "React Router",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Component-Based Architecture",
      "Git",
      "GitHub"
    ],
    liveUrl: "https://biogiri.com/",
    accent: "#AFFF00",
  },
  {
    id: 4,
    name: "Aethrion Lindos",
    tagline: "Luxury Villa Website",
    description: "Contributed to the development of a luxury villa booking website using Next.js and Tailwind CSS. Built and customized multiple pages, including the Home, Gallery, and Experience sections, while ensuring responsive layouts and a seamless user experience across devices. Focused on modern UI implementation, reusable components, performance optimization, and maintaining design consistency throughout the website.",
    image: "/images/projects/aethrion.png",
    tools: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Design",
      "UI Development",
      "Component-Based Architecture",
      "Git"
    ],
    liveUrl: "https://www.aethrionlindos.com/",
    accent: "#AFFF00",
  },

  {
    id: 5,
    name: "Crypto Flow UI",
    tagline: "Dashboard Design",
    description: "Built a modern and visually engaging crypto landing page using React and Tailwind CSS. Developed responsive and reusable UI components, implemented smooth interactions, and crafted a clean user experience with a focus on performance and scalability. Ensured seamless responsiveness across devices while following modern frontend development practices.",
    image: "/images/projects/crypto-flow.png",
    tools: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Component-Based Architecture",
      "Git",
      "GitHub"
    ],
    liveUrl: "https://crypto-flow-topaz.vercel.app/",
    accent: "#AFFF00",
  },
  {
    id: 6,
    name: "Unnara",
    tagline: "Jewelry E-Commerce Website",
    description: "Contributed to a jewelry e-commerce website by creating and optimizing image layouts, working on visual assets using Photopea, and developing responsive HTML email templates using table-based layouts for cross-client compatibility. Focused on maintaining brand consistency and enhancing the overall user experience.",
    image: "/images/projects/unnara.png",
    tools: ["HTML", "CSS", "Photopea", "Image Editing", "Email Templates", "Responsive Design"],
    liveUrl: "https://unnara.com/",
    accent: "#AFFF00",
  },
  {
    id: 7,
    name: "Purever",
    tagline: "Corporate Website",
    description: "Developed and customized multiple responsive web pages using HTML and CSS. Created reusable custom CSS classes, implemented responsive layouts for different screen sizes, and ensured a clean, user-friendly interface while maintaining design consistency across the website.",
    image: "/images/projects/purever.png",
    tools: ["HTML", "CSS", "Responsive Design", "Custom CSS", "Web Development"],
    liveUrl: "https://purever.in/",
    accent: "#AFFF00",
  },

  {
    id: 8,
    name: "CodersCoffee",
    tagline: "Coffee Shop Website UI",
    description: "Designed and developed a modern coffee shop website UI using React and CSS. Built responsive layouts, reusable components, and interactive sections with a focus on clean design and user experience. Implemented mobile-friendly interfaces and maintained consistent styling across the application.",
    image: "/images/projects/coders-coffee.png",
    tools: [
      "React",
      "JavaScript",
      "CSS3",
      "HTML5",
      "Responsive Design",
      "UI Development",
      "Component-Based Architecture"
    ],
    liveUrl: null,
    status: "Personal Project",
    accent: "#AFFF00",
  }, {
    id: 9,
    name: "Netflix Clone",
    tagline: "Frontend Clone Project",
    description: "Built a responsive Netflix-inspired user interface using React. Recreated the homepage layout, movie sections, banners, and navigation while focusing on component reusability, responsive design, and modern frontend development practices.",
    image: "/images/projects/netflix.png",
    tools: [
      "React",
      "JavaScript",
      "CSS3",
      "HTML5",
      "Responsive Design",
      "UI Development"
    ],
    liveUrl: null,
    status: "Personal Project",
    accent: "#AFFF00",
  }
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
    transition: {
      type: "spring" as const, // ✅ FIX
      stiffness: 300,
      damping: 30,
    },
  }),
}

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const currentProject = projects[currentIndex]

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 5)
    rotateX.set(-y * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + projects.length) % projects.length
    setCurrentIndex(newIndex)
    setPage([page + newDirection, newDirection])
  }

  const nextProject = () => paginate(1)
  const prevProject = () => paginate(-1)

  return (
    <section id="projects" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#121212]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#AFFF00 1px, transparent 1px), linear-gradient(90deg, #AFFF00 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#AFFF00]/10 blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block font-mono text-[#AFFF00] text-[10px] tracking-[0.3em] uppercase px-4 py-2 border border-[#AFFF00]/30 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            PROJECTS
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-4 ">
            <motion.span
              className="inline-block text-white"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              MY&nbsp;
            </motion.span>
            <motion.span
              className="inline-block text-[#AFFF00]"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              WORK
            </motion.span>
          </h2>
          <motion.div
            className="h-1 w-16 bg-[#AFFF00] mx-auto mt-5 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={prevProject}
              className="hidden md:flex w-14 h-14 rounded-full border-2 border-[#AFFF00]/30 items-center justify-center text-white hover:bg-[#AFFF00] hover:text-[#121212] hover:border-[#AFFF00] transition-colors"
              whileHover={{ scale: 1.1, rotate: -5, boxShadow: "0 0 20px rgba(175, 255, 0, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-4xl"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="bg-[#121212] rounded-3xl p-6 md:p-8 border-2 border-[#AFFF00]/20 shadow-xl shadow-[#AFFF00]/5 overflow-hidden"
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ borderColor: "rgba(175, 255, 0, 0.4)" }}
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                      className="relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-[#121212]/5"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={currentProject.image || "/placeholder.svg"}
                        alt={currentProject.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `linear-gradient(135deg, ${currentProject.accent}40, transparent)` }}
                      />
                    </motion.div>

                    <div className="space-y-4">
                      <div>
                        <motion.span
                          className="font-mono text-xs tracking-widest"
                          style={{ color: currentProject.accent }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentProject.tagline}
                        </motion.span>
                        <motion.h3
                          className="text-3xl md:text-4xl font-black text-[#ffffff] tracking-tighter mt-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {currentProject.name}
                        </motion.h3>
                      </div>

                      <motion.p
                        className="text-sm text-white/70 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentProject.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentProject.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-white/80"
                          >
                            {tool}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap gap-3 pt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {currentProject.liveUrl ? (
                          <motion.a
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 relative overflow-hidden text-white"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            style={{ backgroundColor: currentProject.accent, color: "#121212" }}
                          >
                            <motion.span
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                            <ExternalLink className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Live Project</span>
                          </motion.a>
                        ) : (
                          <span className="px-5 py-2.5 rounded-full font-bold text-sm tracking-wide  bg-white/10 text-white/40  cursor-not-allowed">
                            {currentProject.status}

                          </span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={nextProject}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex md:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={prevProject}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={nextProject}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setCurrentIndex(index)
                  setPage([index, newDirection])
                }}
                className="h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? project.accent : "#6B7280",
                }}
                animate={{
                  width: index === currentIndex ? 28 : 10,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
