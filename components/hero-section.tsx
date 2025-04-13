"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  darkMode: boolean
  scrollToSection: (id: string) => void
}

export default function HeroSection({ darkMode, scrollToSection }: HeroSectionProps) {
  const [sparkleCount, setSparkleCount] = useState(0)

  // Create sparkle effect on title hover
  const createSparkle = () => {
    setSparkleCount((prev) => prev + 1)
    setTimeout(() => {
      setSparkleCount((prev) => prev - 1)
    }, 1500)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          darkMode
            ? "bg-gradient-to-b from-amber-950/80 via-transparent to-amber-950/60"
            : "bg-gradient-to-b from-amber-100/60 via-transparent to-amber-100/40",
        )}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 md:left-20 w-16 h-16 md:w-24 md:h-24 opacity-20 dark:opacity-10">
        <img src="/shield-decoration.svg" alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 opacity-20 dark:opacity-10">
        <img src="/crown-decoration.svg" alt="" className="w-full h-full" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-block p-2 rounded-full bg-amber-300/20 backdrop-blur-sm mb-8">
            <div className="px-6 py-1 rounded-full border border-amber-400/50 text-amber-800 dark:text-amber-200 text-sm">
              Selamat Datang di Kerajaan Kami
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative inline-block"
          onMouseEnter={createSparkle}
          onTouchStart={createSparkle}
        >
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-amber-900 dark:text-amber-100 royal-glow">
            Kerajaan Imphnen
          </h1>

          {/* Sparkles */}
          {Array.from({ length: sparkleCount }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}-${Date.now()}`}
              className="absolute w-4 h-4 text-amber-300"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{ duration: 1.5 }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl italic max-w-2xl mx-auto mb-12 text-amber-800 dark:text-amber-200"
        >
          Tempat Para Bangsawan yang Enggan Menjadi Budak Kode
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => scrollToSection("maklumat")}
            className="bg-amber-700 hover:bg-amber-800 text-amber-50 font-cinzel text-lg px-8 py-6 royal-btn group"
          >
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">👑 Masuki Kerajaan</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-100/30 dark:hover:bg-amber-800/30 font-cinzel text-lg px-8 py-6 group"
          >
            <span className="group-hover:translate-x-1 transition-transform">Kirim Pesan</span>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="scroll-indicator"
        >
          <ChevronDown className="h-10 w-10 text-amber-700 dark:text-amber-300" />
        </motion.div>
      </div>
    </section>
  )
}
