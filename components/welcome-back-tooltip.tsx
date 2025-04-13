"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface WelcomeBackTooltipProps {
  darkMode: boolean
}

export default function WelcomeBackTooltip({ darkMode }: WelcomeBackTooltipProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if the user has closed the maid assistant before
    if (typeof window === "undefined") return

    try {
      const savedState = localStorage.getItem("maidAssistantState")
      if (savedState) {
        const { hidden } = JSON.parse(savedState)
        if (hidden) {
          // Show the tooltip after a delay
          const timer = setTimeout(() => {
            setShow(true)
          }, 5000)

          // Hide the tooltip after some time
          const hideTimer = setTimeout(() => {
            setShow(false)
          }, 15000)

          return () => {
            clearTimeout(timer)
            clearTimeout(hideTimer)
          }
        }
      }
    } catch (error) {
      console.error("Error checking maid state:", error)
    }
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={cn(
          "fixed bottom-20 right-20 p-3 rounded-lg shadow-lg z-40 max-w-[200px]",
          darkMode ? "bg-amber-800/90 text-amber-100" : "bg-amber-100/90 text-amber-800",
          "border border-amber-300 dark:border-amber-700 backdrop-blur-sm",
        )}
      >
        <div className="flex items-start gap-2">
          <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Butuh bantuan? Klik ikon pesan untuk memanggil pelayan AI kerajaan.</p>
        </div>
        <div className="absolute -top-2 -right-2">
          <button
            onClick={() => setShow(false)}
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-xs",
              darkMode ? "bg-amber-700 text-amber-100" : "bg-amber-200 text-amber-800",
            )}
          >
            ×
          </button>
        </div>

        {/* Arrow pointing to the message button */}
        <div className="absolute bottom-[20px] right-[-15px] w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-amber-100 dark:border-l-amber-800"></div>
      </motion.div>
    </AnimatePresence>
  )
}
