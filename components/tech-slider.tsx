"use client"

import { motion } from "framer-motion"
import {
  Code2,
  FileCode,
  Braces,
  Atom,
  Layers,
  Palette,
  LayoutGrid,
  Plug,
  GitBranch,
  Figma,
  Database,
  Server,
  FileJson,
  Eye,
  Layout,
  HardDrive
} from "lucide-react"
import { useEffect, useState } from "react"


const technologies = [
  // Frontend
  { name: "HTML5", icon: Code2, color: "#AFFF00" },
  { name: "CSS3", icon: Palette, color: "#AFFF00" },
  { name: "JavaScript", icon: FileCode, color: "#AFFF00" },
  { name: "TypeScript", icon: Braces, color: "#AFFF00" },
  { name: "React", icon: Atom, color: "#AFFF00" },
  { name: "Next.js", icon: Layers, color: "#AFFF00" },
  { name: "Tailwind CSS", icon: Palette, color: "#AFFF00" },
  { name: "Bootstrap", icon: LayoutGrid, color: "#AFFF00" },
  { name: "Redux Toolkit", icon: Database, color: "#AFFF00" },

  // Backend
  { name: "Python", icon: FileJson, color: "#AFFF00" },
  { name: "Django", icon: Server, color: "#AFFF00" },
  { name: "Django REST Framework", icon: Plug, color: "#AFFF00" },
  { name: "REST API", icon: Plug, color: "#AFFF00" },

  // Database
  { name: "PostgreSQL", icon: Database, color: "#AFFF00" },
  { name: "MySQL", icon: Database, color: "#AFFF00" },
  { name: "SQLite", icon: HardDrive, color: "#AFFF00" },

  // Tools
  { name: "Git", icon: GitBranch, color: "#AFFF00" },
  { name: "GitHub", icon: GitBranch, color: "#AFFF00" },
  { name: "Figma", icon: Figma, color: "#AFFF00" },
]


const allTechnologies = [...technologies, ...technologies]

export function TechSlider() {

  // ✅ FIX 1: hydration-safe particles
  const [particles, setParticles] = useState<any[]>([])

  // ✅ FIX 2: mount guard (framer motion SSR safe)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const generated = Array.from({ length: 10 }, (_, i) => {
      const seed = i + 1
      return {
        left: ((seed * 37) % 100),
        top: ((seed * 71) % 100),
        duration: 4 + (seed % 3),
        delay: seed % 2,
      }
    })

    setParticles(generated)
  }, [])

  const scrollDistance = technologies.length * 120

  return (
    <section className="relative py-12 bg-[#121212] overflow-hidden border-y border-[#AFFF00]/20">

      {/* PARTICLES SAFE */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#AFFF00]/30 rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
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
      )}

      <div className="relative overflow-visible">
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, -scrollDistance] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {allTechnologies.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap group"
              whileHover={{ scale: 1.15, y: -5 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#AFFF00]/10 border border-[#AFFF00]/20 overflow-hidden"
                whileHover={{
                  backgroundColor: "rgba(175, 255, 0, 0.3)",
                  borderColor: "rgba(175, 255, 0, 0.6)",
                  rotate: 5,
                }}
              >
                <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
              </motion.div>

              <span className="font-mono text-sm font-bold text-[#AFFF00] group-hover:text-white">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* fade overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#121212] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#121212] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}