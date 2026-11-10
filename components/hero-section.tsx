"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Download, Eye } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
}

export function HeroSection() {
  const ref = useRef(null)

  // ✅ FIX: SSR safe particles (NO Math.random in render)
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      left: (i * 13) % 100,
      top: (i * 23) % 100,
      duration: 4 + (i % 4),
      delay: i % 3,
    }))
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  )

  const textX1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    springConfig
  )

  const textX2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    springConfig
  )

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.9]),
    springConfig
  )

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [1, 0]),
    springConfig
  )


  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#121212]"
      style={{ position: "relative", transform: "translateZ(0)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#121212]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#AFFF00 1px, transparent 1px), linear-gradient(90deg, #AFFF00 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Particles FIXED */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#AFFF00]/40 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <motion.div style={{ opacity }} className="space-y-5">

            {/* 1 */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex items-center gap-2 bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] px-4 py-2 rounded-full text-xs font-mono"
            >
              <span className="w-2.5 h-2.5 bg-[#AFFF00] rounded-full" />
              PYTHON FULL STACK DEVELOPER
            </motion.div>

            {/* 2 */}
            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ x: textX1 }}
              className="text-5xl md:text-8xl font-black text-white"
            >
              HI, I'M
            </motion.h1>

            {/* 3 */}
            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.7,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ x: textX2 }}
              className="text-5xl md:text-8xl font-black text-[#AFFF00]"
            >
              ANIT SINGH
            </motion.h1>

            {/* 4 */}
            <motion.p
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white font-mono max-w-lg leading-relaxed"
            >
               I build scalable, responsive, and high-performance web applications using React, Next.js, Python, and Django. Experienced in developing modern user interfaces, REST APIs, authentication systems, and end-to-end full-stack solutions.
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-4">



              {/* View Resume */}
              <motion.a
                href="/Anit_Python_Full_Stack_Developer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-bold text-sm tracking-wide bg-[#AFFF00] text-[#121212] flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Eye className="w-4 h-4" />
                View Resume
              </motion.a>

              {/* Download Resume */}
              <motion.a
                href="/Anit_Python_Full_Stack_Developer.pdf"
                rel="noopener noreferrer"
                download="Anit-Python-Full-Stack-Developer-Resume.pdf"
                className="px-6 py-3 rounded-full font-bold text-sm tracking-wide border border-[#AFFF00] text-[#AFFF00] flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "#AFFF00", color: "#121212" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>
            </div>

          </motion.div>
          {/* IMAGE */}
          <motion.div
            style={{ y, scale }}
            className="flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div variants={scaleInVariants} initial="hidden" animate="visible">
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <Image
                  src="/images/profile2.jpeg"
                  alt="profile"
                  fill
                  className="rounded-full object-cover border-4 object-left border-[#AFFF00]/50"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}