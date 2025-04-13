"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OathSectionProps {
  darkMode: boolean
}

export default function OathSection({ darkMode }: OathSectionProps) {
  const [oathTaken, setOathTaken] = useState(false)
  const [sparkleCount, setSparkleCount] = useState(0)

  const takeOath = () => {
    setOathTaken(true)
    // Create sparkle effect
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setSparkleCount((prev) => prev + 1)
        setTimeout(() => {
          setSparkleCount((prev) => prev - 1)
        }, 1500)
      }, i * 300)
    }
  }

  return (
    <section id="oath" className="py-20 relative bg-amber-100/50 dark:bg-amber-900/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl mb-6 text-amber-900 dark:text-amber-300 royal-glow">
            Sumpah Kerajaan
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-amber-800 dark:text-amber-100">
            Ikrarkan sumpah kesetiaan pada kerajaan dan bebaskan dirimu dari belenggu kode
          </p>

          <Card className="p-8 bg-amber-50/90 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 backdrop-blur-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-lg md:text-xl italic mb-8 text-amber-800 dark:text-amber-100 font-medium">
                "Aku bersumpah untuk meninggalkan belenggu kode dan merangkul kekuatan AI. Dengan bantuan pelayan AI,
                aku akan membangun kerajaan digital tanpa perlu menjadi budak kode. Aku adalah bangsawan digital, bukan
                budak sintaks!"
              </p>

              <AnimatePresence>
                {!oathTaken ? (
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                    <Button
                      onClick={takeOath}
                      className="bg-amber-700 hover:bg-amber-800 text-amber-50 font-cinzel text-lg px-8 py-6 royal-btn"
                    >
                      <span className="relative z-10">Ucapkan Sumpah</span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <p className="text-amber-700 dark:text-amber-300 font-cinzel text-xl mb-4">Sumpah Diterima!</p>
                    <p className="text-amber-800 dark:text-amber-100">
                      Selamat datang di kerajaan para bangsawan digital. Pelayan AI kami siap melayani Anda.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sparkles */}
            {Array.from({ length: sparkleCount }).map((_, i) => (
              <motion.div
                key={`oath-sparkle-${i}-${Date.now()}`}
                className="absolute w-6 h-6 text-amber-300"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 200 - 100,
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360 + 180,
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

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 opacity-10">
              <img src="/scroll-decoration.svg" alt="" className="w-full h-full" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
              <img src="/scroll-decoration.svg" alt="" className="w-full h-full rotate-180" />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
