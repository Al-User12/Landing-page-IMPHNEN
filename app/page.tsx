"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Sun, Moon, ChevronDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import ParticleBackground from "@/components/particle-background"
import HeroSection from "@/components/hero-section"
import TestimonialCarousel from "@/components/testimonial-carousel"
import AiMaidAssistant from "@/components/ai-maid-assistant"
import OathSection from "@/components/oath-section"
import MaklumatSection from "@/components/maklumat-section"
import "aos/dist/aos.css" 
import WelcomeBackTooltip from "@/components/welcome-back-tooltip"
import AudioPlayer from "@/components/audio-player"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [showMaid, setShowMaid] = useState(false)

  const [hasScrolled, setHasScrolled] = useState(false)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Initialize AOS with dynamic import
    const initAOS = async () => {
      if (typeof window !== "undefined") {
        const AOS = (await import("aos")).default
        AOS.init({
          duration: 1000,
          once: false,
          mirror: true,
        })
      }
    }

    initAOS()

    // Initialize dark mode
    const body = document.querySelector("body")
    if (body) {
      body.className = darkMode ? "dark" : ""
    }
    
    

    // Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [darkMode, hasScrolled])

  // Load the maid visibility state from localStorage and handle auto-showing
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Check if user has explicitly closed the maid assistant
    const getMaidState = () => {
      try {
        const savedState = localStorage.getItem("maidAssistantState")
        if (savedState) {
          const { hidden, timestamp } = JSON.parse(savedState)

          // Check if the saved state is still valid (24 hours expiration)
          const now = new Date().getTime()
          const hoursPassed = (now - timestamp) / (1000 * 60 * 60)

          // If less than 24 hours have passed and user closed it, keep it closed
          if (hoursPassed < 24 && hidden) {
            return false
          }
        }
        // Default to showing the maid
        return true
      } catch (error) {
        console.error("Error reading maid state from localStorage:", error)
        return true
      }
    }

    // Set initial state based on localStorage
    const shouldShowMaid = getMaidState()

    // Only auto-show if the state allows it
    if (shouldShowMaid) {
      const timer = setTimeout(() => {
        setShowMaid(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Update the maid toggle function to persist the state
  const toggleMaid = (show: boolean) => {
    setShowMaid(show)

    // Save the state to localStorage
    try {
      localStorage.setItem(
        "maidAssistantState",
        JSON.stringify({
          hidden: !show,
          timestamp: new Date().getTime(),
        }),
      )
    } catch (error) {
      console.error("Error saving maid state to localStorage:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Royal Message Sent",
      description: "Your message has been delivered to the royal court.",
    })

    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main
      className={cn(
        "min-h-screen transition-colors duration-500 overflow-x-hidden relative",
        darkMode ? "bg-[url('/dark-castle.jpg')]" : "bg-[url('/light-castle.jpg')]",
      )}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 dark:from-black/40 dark:to-black/60 pointer-events-none backdrop-blur-sm" />
      <ParticleBackground darkMode={darkMode} />

      {/* Fixed controls */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <AudioPlayer darkMode={darkMode} />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-amber-800/80 backdrop-blur-sm border-amber-600 hover:bg-amber-700 shadow-glow"
          onClick={() => toggleMaid(!showMaid)}
        >
          <MessageSquare className="h-5 w-5 text-amber-100" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-amber-800/80 backdrop-blur-sm border-amber-600 hover:bg-amber-700 shadow-glow"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun className="h-5 w-5 text-amber-100" /> : <Moon className="h-5 w-5 text-amber-100" />}
        </Button>
      </div>

      {/* Welcome Back Tooltip */}
      <WelcomeBackTooltip darkMode={darkMode} />

      {/* AI Maid Assistant */}
      <AnimatePresence>
        {showMaid && <AiMaidAssistant onClose={() => toggleMaid(false)} darkMode={darkMode} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-gradient-to-b from-amber-900/80 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-amber-300" />
              <span className="font-cinzel text-xl font-bold text-amber-100">Kerajaan Imphnen</span>
            </div>
            <div className="hidden md:flex gap-6">
              {["maklumat", "oath", "testimonials", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-amber-100 hover:text-amber-300 font-cinzel capitalize transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-amber-100"
              onClick={() => scrollToSection("maklumat")}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection darkMode={darkMode} scrollToSection={scrollToSection} />

      {/* Maklumat Section */}
      <MaklumatSection darkMode={darkMode} />

      {/* Oath Section */}
      <OathSection darkMode={darkMode} />

      {/* Testimonials */}
      <section id="testimonials" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-cinzel text-4xl md:text-5xl mb-6 text-amber-900 dark:text-amber-300 royal-glow">
              Testimoni Para Bangsawan
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-amber-800 dark:text-amber-100">
              Dengarkan kisah para bangsawan yang telah bergabung dengan kerajaan kami
            </p>
            <p className="text-sm mt-2 text-amber-600 dark:text-amber-400">
              <span className="inline-block animate-pulse">↔</span> Geser untuk melihat testimoni lainnya{" "}
              <span className="inline-block animate-pulse">↔</span>
            </p>
          </motion.div>

          <TestimonialCarousel darkMode={darkMode} />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 relative bg-amber-100/50 dark:bg-amber-900/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="font-cinzel text-4xl md:text-5xl mb-6 text-amber-900 dark:text-amber-300 royal-glow">
                Kirim Pesan Kerajaan
              </h2>
              <p className="text-lg text-amber-800 dark:text-amber-100">
                Kata-katamu akan mencapai menara tertinggi istana kami
              </p>
            </div>

            <Card className="p-8 bg-amber-50/90 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 backdrop-blur-sm transform transition-all hover:shadow-xl">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 group">
                  <label className="block font-cinzel text-amber-800 dark:text-amber-200 transition-all group-focus-within:text-amber-600 dark:group-focus-within:text-amber-300">
                    Nama Bangsawan
                  </label>
                  <Input
                    className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Sir Lancelot / Lady Guinevere"
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block font-cinzel text-amber-800 dark:text-amber-200 transition-all group-focus-within:text-amber-600 dark:group-focus-within:text-amber-300">
                    Merpati Pembawa Pesan (Email)
                  </label>
                  <Input
                    type="email"
                    className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="bangsawan@kerajaan.realm"
                    required
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="block font-cinzel text-amber-800 dark:text-amber-200 transition-all group-focus-within:text-amber-600 dark:group-focus-within:text-amber-300">
                    Pesan Kerajaan
                  </label>
                  <Textarea
                    className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/60 text-amber-900 dark:text-amber-100 min-h-[120px] focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Bagikan pemikiranmu dengan pengadilan kerajaan..."
                    required
                  />
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 font-cinzel text-lg py-6 royal-btn"
                  >
                    <span className="relative z-10">Kirim Dekrit Kerajaan</span>
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-amber-900/80 backdrop-blur-sm text-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Crown className="h-6 w-6 text-amber-300" />
              <span className="font-cinzel text-xl font-bold">Kerajaan Imphnen</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-amber-200">© {new Date().getFullYear()} Dekrit Kerajaan - Hak Cipta Dilindungi</p>
              <p className="text-amber-400 text-sm mt-1">Dibuat dengan sihir kerajaan</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        :root {
          --font-cinzel: 'Cinzel Decorative', cursive;
          --font-playfair: 'Playfair Display', serif;
        }

        body {
          font-family: var(--font-playfair);
          background-size: 100% 100%;
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.5s ease;
          overflow-x: hidden;
        }

        main {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }

        main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          filter: blur(2px);
          z-index: -1;
        }

        main > * {
          filter: blur(0);
        }

        .font-cinzel {
          font-family: var(--font-cinzel);
        }

        .royal-glow {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2);
        }

        .shadow-glow {
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        .royal-btn {
          position: relative;
          overflow: hidden;
        }

        .royal-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }

        .scroll-indicator {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .sparkle {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0;
        }

        .sparkle-animation {
          animation: sparkle 1.5s ease-in-out;
        }

        @keyframes sparkle {
          0% { transform: scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </main>
  )
}
