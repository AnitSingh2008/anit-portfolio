"use client"

import type React from "react"
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"


const biographyCards = [
  {
    id: 1,
    title: "Who I Am",
    content: `I'm Anit Singh, a Python Full Stack Developer from Chamba, Himachal Pradesh, currently based in Noida, Uttar Pradesh.

I hold a Bachelor of Computer Applications (BCA) degree from Sardar Patel University, Mandi. I specialize in building modern web applications using React, Next.js, Python, and Django.

I enjoy turning ideas into functional, user-friendly digital experiences with a strong focus on clean UI, performance, and reliable backend functionality.`,
  },

{
  id: 2,
  title: "My Experience",
  content: `I'm currently working as a Full Stack Developer at DigiPanda, where I develop and maintain modern web applications for real-world projects.

My work involves building responsive frontend interfaces, developing backend functionality, integrating REST APIs, and implementing end-to-end application features.

I've contributed to 4+ live client production websites using Next.js and React.

Alongside professional work, I've built a complete Full Stack E-Commerce application using React, Django REST Framework, and PostgreSQL, featuring authentication, email OTP verification, cart management, order processing, and Stripe payment integration.

I also work with Git and GitHub for version control and collaborative development.`,
},
  {
    id: 3,
    title: "What I Do",
    content: `I work across both frontend and backend development, building complete web applications with modern technologies.

• Frontend - React.js, Next.js, JavaScript, TypeScript, Tailwind CSS
• Backend - Python, Django, Django REST Framework
• Database - PostgreSQL, MySQL
• State Management - Redux Toolkit
• API Integration - REST APIs, Axios
• Authentication - JWT, Email OTP
• Payment Integration - Stripe
• Tools - Git, GitHub, Figma, Postman

From designing responsive interfaces to developing backend APIs and database operations, I enjoy working on complete application workflows.`,
  },
  {
    id: 4,
    title: "My Approach",
    content: `I believe in writing clean, maintainable, and efficient code while keeping the end-user experience at the center of development.

My approach is to understand the problem first, plan the right solution, and build features that are reliable, scalable, and easy to maintain.

I'm always exploring better development practices, improving my problem-solving skills, and staying updated with modern web technologies.

My focus is on building practical solutions that deliver real value.`,
  },
];


const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 25,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -400 : 400,
    opacity: 0,
    scale: 0.9,
  }),
}

export function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])

  const currentCard = biographyCards[currentIndex]

  // ✅ 3D hover system (Skills style)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"])

  const rotateXSmooth = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const rotateYSmooth = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const paginate = (dir: number) => {
    const newIndex =
      (currentIndex + dir + biographyCards.length) %
      biographyCards.length

    setCurrentIndex(newIndex)
    setPage([page + dir, dir])
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5

    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section id='about' className="relative py-24 bg-[#121212] overflow-hidden">

      <div className="text-center mb-12">
        <span className="text-[#AFFF00] font-mono text-xs border border-[#AFFF00]/30 px-4 py-2 rounded-full">
          BIOGRAPHY
        </span>

        <h2 className="text-4xl md:text-6xl font-black text-white mt-5">
          WHO AM <span className="text-[#AFFF00]">I?</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center px-4">

        <button
          onClick={() => paginate(-1)}
          className="hidden md:flex absolute left-0 md:-left-16 text-[#AFFF00] border border-[#AFFF00]/30 p-3 rounded-full"
        >
          <ChevronLeft />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCard.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x

              if (swipe < -10000) {
                paginate(1) // next
              } else if (swipe > 10000) {
                paginate(-1) // prev
              }
            }}
            className="w-full relative"
          >
            <motion.div
              className="bg-[#0a0a0a] rounded-3xl p-8 md:p-10 border-2 border-[#AFFF00]/20 text-white relative"
              style={{
                rotateX: rotateXSmooth,
                rotateY: rotateYSmooth,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{
                scale: 0.99,
                boxShadow: "0 0 40px rgba(175,255,0,0.08)",
              }}
            >
              <div className="text-[#AFFF00] font-mono text-xs mb-2">
                0{currentCard.id}/04
              </div>

              <h3 className="text-2xl font-bold mb-4 text-[#AFFF00]">
                {currentCard.title}
              </h3>

              <p className="text-white/70 whitespace-pre-line leading-relaxed">
                {currentCard.content}
              </p>

              <div className="h-1 w-20 bg-[#AFFF00] mt-6 rounded-full" />
            </motion.div>
          </motion.div>

        </AnimatePresence>
        <div className="flex md:hidden justify-center gap-6 mt-6 w-full">
          <button
            onClick={() => paginate(-1)}
            className="text-[#AFFF00] border border-[#AFFF00]/30 p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => paginate(1)}
            className="text-[#AFFF00] border border-[#AFFF00]/30 p-3 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>


        <button
          onClick={() => paginate(1)}
          className="hidden md:flex absolute right-0 md:-right-16 text-[#AFFF00] border border-[#AFFF00]/30 p-3 rounded-full"
        >
          <ChevronRight />
        </button>



      </div>
    </section>
  )
}