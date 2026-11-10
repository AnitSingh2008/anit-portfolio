"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
}

export function Footer() {
  const [isHovering, setIsHovering] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Email", href: "mailto:anits8489@gmail.com" },
        { label: "WhatsApp", href: "https://wa.me/918580807687" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/anit-singh-1a7673363/" },
        { label: "Call", href: "tel:+918580807687" },
      ],
    },
    {
      title: "Projects",
      links: [
        { label: "NexaMart", href: "/" },
        { label: "Opinings", href: "https://opinings.com/"},
        { label: "Biogiri UI", href: "https://biogiri-project.vercel.app/" },
        { label: "Crypto Flow", href: "https://crypto-flow-topaz.vercel.app/" },
        { label: "Purever", href: "https://purever.in/" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/AnitSingh2008", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/anit-singh-1a7673363/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/h_royal_jatt?utm_source=qr&psln=MTd0cnUwZmI5c2N4ZQ==", label: "Instagram" },
    { icon: Mail, href: "mailto:anits8489@gmail.com", label: "Email" },
  ]

  return (
    <footer ref={footerRef} className="relative bg-[#121212] pt-16 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
            <motion.span
              className="block mb-4"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              LET&apos;S BUILD
            </motion.span>
            <motion.span
              className="block text-[#AFFF00]"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              SOMETHING AMAZING
            </motion.span>
          </h2>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#AFFF00] hover:border-[#AFFF00]/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="relative grid grid-cols-2 md:grid-cols-3 gap-8 py-10 border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-bold text-white text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      <Link
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white/50 hover:text-[#AFFF00] font-mono text-xs transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-xl font-black">
              <span className="text-white">ANIT</span>
              <span className="text-[#AFFF00]">.</span>
            </span>
          </motion.div>

          <p className="text-white/40 font-mono text-xs text-center">
            © 2026 All Rights Reserved — Anit Singh
          </p>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#AFFF00] text-[#121212] flex items-center justify-center"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <motion.div
              animate={isHovering ? { y: [-2, 2, -2] } : { y: 0 }}
              transition={{ duration: 0.5, repeat: isHovering ? Number.POSITIVE_INFINITY : 0 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none leading-none z-0"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        ANIT
      </motion.div>
    </footer>
  )
}
