"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialProps {
  darkMode: boolean
}

const testimonials = [
  {
    name: "Sir Lancelot",
    title: "Ksatria Meja Bundar",
    quote:
      "Kerajaan Imphnen telah memberiku alat terbaik untuk membunuh naga kompleksitas. Kodeku kini bersinar seperti Excalibur!",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Lady Guinevere",
    title: "Arsitek Frontend Kerajaan",
    quote:
      "Sejak bergabung dengan kerajaan ini, desainku berkembang dengan keanggunan taman kerajaan. Dukungan dari sesama bangsawan tak tertandingi.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Duke Merlin",
    title: "Penyihir Kepala Backend",
    quote:
      "Mantra-mantra yang kupelajari di kerajaan ini telah mengubah sihir serverku. Database-ku kini berjalan dengan efisiensi kurir kerajaan!",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialCarousel({ darkMode }: TestimonialProps) {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState<"left" | "right">("right")

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
      setDirection("right")
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setDirection("right")
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setDirection("left")
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative h-[400px] md:h-[350px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 300

              if (swipe) {
                if (offset.x > 0) {
                  prev()
                } else {
                  next()
                }
              }
            }}
          >
            <Card
              className={cn(
                "p-8 md:p-10 backdrop-blur-sm cursor-grab active:cursor-grabbing h-full",
                darkMode ? "bg-amber-900/40 border-amber-700" : "bg-amber-50/90 border-amber-300",
              )}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-amber-500/30" />
                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-amber-300 dark:border-amber-700">
                      <img
                        src={testimonials[current].image || "/placeholder.svg"}
                        alt={testimonials[current].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-lg md:text-xl italic text-amber-800 dark:text-amber-100">
                    "{testimonials[current].quote}"
                  </p>
                </blockquote>
                <div className="text-center">
                  <p className="font-cinzel text-lg font-bold text-amber-900 dark:text-amber-300">
                    {testimonials[current].name}
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">{testimonials[current].title}</p>
                </div>
              </div>
            </Card>
            {/* Swipe indicators */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 opacity-30">
              <div className="bg-amber-200 dark:bg-amber-700 rounded-full p-2 transform -translate-x-1/2">
                <ChevronLeft className="h-6 w-6 text-amber-800 dark:text-amber-200" />
              </div>
              <div className="bg-amber-200 dark:bg-amber-700 rounded-full p-2 transform translate-x-1/2">
                <ChevronRight className="h-6 w-6 text-amber-800 dark:text-amber-200" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-100/30 dark:hover:bg-amber-800/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoplay(false)
                setCurrent(i)
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === current ? "bg-amber-700 dark:bg-amber-400 w-6" : "bg-amber-300 dark:bg-amber-700",
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-100/30 dark:hover:bg-amber-800/30"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4 text-center text-amber-600 dark:text-amber-400 text-sm hidden md:block">
        <span>← Swipe or use arrows to navigate →</span>
      </div>
    </div>
  )
}
