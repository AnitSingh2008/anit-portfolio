
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  Linkedin,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Call Me",
    value: "+91 8580807687",
    href: "tel:+918580807687",
    accent: "#AFFF00",
  },
  {
    icon: Mail,
    label: "Email",
    value: "anits8489@gmail.com",
    href: "mailto:anits8489@gmail.com?subject=Portfolio%20Contact&body=Hello%20Anit%2C%20I%20visited%20your%20portfolio.",
    accent: "#EA4335",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message Me",
    href: "https://wa.me/918580807687?text=Hi%20Anit%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project",
    accent: "#25D366",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect",
    href: "https://www.linkedin.com/in/anit-singh-1a7673363/",
    accent: "#0A66C2",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData(form);

      const response = await fetch(
        "https://formsubmit.co/ajax/mannu200810@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (
        !response.ok ||
        !(result.success === "true" || result.success === true)
      ) {
        throw new Error(
          result.message || "Unable to send message. Please try again."
        );
      }

      setIsSubmitting(false);
      form.reset();

      // Countdown animation
      for (let i = 3; i >= 1; i--) {
        setCountdown(i);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setCountdown(null);
      setIsSubmitted(true);

      // Show success message for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(false);
    } catch (error) {
      setIsSubmitting(false);
      setCountdown(null);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-[#121212] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#121212]" />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-6 z-10"
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="text-center mb-12"
        >
          <motion.span
            className="font-mono text-[#AFFF00] text-xs tracking-widest inline-block uppercase px-4 py-2 border border-[#AFFF00]/30 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            CONTACT INFO
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mt-2">
            <motion.span
              className="inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
                delay: 0.15,
              }}
            >
              GET IN&nbsp;
            </motion.span>

            <motion.span
              className="text-[#AFFF00] inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
                delay: 0.25,
              }}
            >
              TOUCH
            </motion.span>
          </h2>

          <motion.p
            className="text-white/50 font-mono text-sm mt-4 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Feel free to reach out for collaborations or just a friendly hello.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info Cards */}
          <motion.div
            className="relative grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={
                  info.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  info.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 group cursor-pointer overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${info.accent}15, transparent)`,
                  }}
                />

                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{
                    backgroundColor: `${info.accent}20`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <info.icon
                    className="w-6 h-6 relative z-10"
                    style={{ color: info.accent }}
                  />
                </motion.div>

                <h3 className="text-white/50 font-mono text-xs tracking-wider mb-1">
                  {info.label}
                </h3>

                <p className="text-white font-semibold text-sm break-words">
                  {info.value}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: info.accent }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 min-h-[420px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              {/* Countdown */}
              {countdown !== null ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    key={countdown}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="text-7xl font-black text-[#AFFF00]"
                  >
                    {countdown}
                  </motion.div>

                  <p className="text-white font-semibold mt-5">
                    Message sent successfully!
                  </p>

                  <p className="text-white/40 text-sm font-mono mt-2">
                    Preparing your confirmation...
                  </p>
                </motion.div>
              ) : isSubmitted ? (
                /* Success Message */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                    }}
                    className="w-20 h-20 rounded-full bg-[#AFFF00]/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#AFFF00]" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white">
                    Message Sent!
                  </h3>

                  <p className="text-[#AFFF00] font-mono text-sm mt-3">
                    Successfully sent.
                  </p>

                  <p className="text-white/40 text-sm mt-2">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                /* Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="hidden"
                      name="_subject"
                      value="New Portfolio Contact Message"
                    />

                    <input
                      type="hidden"
                      name="_captcha"
                      value="true"
                    />

                    <input
                      type="hidden"
                      name="_template"
                      value="table"
                    />

                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-all duration-300 disabled:opacity-50"
                    />

                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-all duration-300 disabled:opacity-50"
                    />

                    {/* Message */}
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      required
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#AFFF00] transition-all duration-300 resize-none disabled:opacity-50"
                    />

                    {/* Error Message */}
                    {errorMessage && (
                      <p className="text-red-400 text-xs font-mono">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#AFFF00] text-[#121212] px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#c4ff4d] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
