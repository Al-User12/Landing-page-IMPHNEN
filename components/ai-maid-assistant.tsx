"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AiMaidAssistantProps {
  onClose: () => void
  darkMode: boolean
}

// Predefined responses for the AI maid
const MAID_RESPONSES = [
  "Selamat datang di Kerajaan Imphnen, Tuan/Nyonya! Saya Eliza, pelayan AI yang akan membantu Anda menjelajahi kerajaan tanpa perlu menulis kode.",
  "Kerajaan kami didedikasikan untuk membebaskan para bangsawan dari belenggu kode. Dengan sihir AI, Anda dapat menciptakan tanpa batasan teknis!",
  "Apakah Anda ingin mempelajari lebih lanjut tentang cara kerja kerajaan kami? Atau mungkin Anda ingin melihat contoh karya para bangsawan lain?",
  "Saya dapat membantu Anda membuat aplikasi, situs web, atau pengalaman digital lainnya tanpa perlu menulis kode. Cukup beritahu saya apa yang Anda inginkan!",
  "Para bangsawan di kerajaan kami telah menciptakan karya-karya menakjubkan tanpa perlu menjadi ahli kode. Anda juga bisa melakukannya!",
  "Sihir AI kami terus berkembang setiap hari. Kami berdedikasi untuk membuat teknologi semakin mudah diakses oleh semua orang.",
  "Jangan ragu untuk mengajukan pertanyaan apa pun. Saya di sini untuk membantu Anda menjadi bangsawan digital yang bebas dari belenggu kode!",
]

// Custom user queries and responses
const CUSTOM_RESPONSES: Record<string, string> = {
  "apa itu kerajaan imphnen":
    "Kerajaan Imphnen adalah sebuah metafora untuk platform no-code yang diperkuat oleh AI. Di sini, Anda dapat menciptakan solusi digital tanpa perlu menjadi ahli pemrograman.",
  "bagaimana cara kerjanya":
    "Sangat sederhana, Yang Mulia! Anda cukup menjelaskan apa yang Anda inginkan, dan saya, pelayan AI Anda, akan membantu mewujudkannya tanpa perlu Anda menulis kode.",
  "siapa kamu":
    "Saya Eliza, pelayan AI kerajaan yang setia. Tugas saya adalah membantu para bangsawan seperti Anda menciptakan keajaiban digital tanpa perlu terjebak dalam kompleksitas kode.",
  "apa keuntungannya":
    "Keuntungan utamanya adalah kebebasan, Yang Mulia! Anda dapat fokus pada visi dan kreativitas Anda, sementara saya menangani semua aspek teknis yang membosankan. Ini menghemat waktu dan memungkinkan Anda menciptakan lebih banyak dengan usaha lebih sedikit.",
}

export default function AiMaidAssistant({ onClose, darkMode }: AiMaidAssistantProps) {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "maid"; id: number }[]>([
    { text: MAID_RESPONSES[0], sender: "maid", id: 1 },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sparkleCount, setSparkleCount] = useState(0)

  // Auto messages from the maid
  useEffect(() => {
    if (messages.length === 1) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setMessages((prev) => [...prev, { text: MAID_RESPONSES[1], sender: "maid", id: Date.now() }])
          setIsTyping(false)
        }, 1500)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { text: input, sender: "user" as const, id: Date.now() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    // Create sparkle effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        setSparkleCount((prev) => prev + 1)
        setTimeout(() => {
          setSparkleCount((prev) => prev - 1)
        }, 1500)
      }, i * 300)
    }

    // Find response
    setTimeout(() => {
      let response = ""
      const lowercaseInput = input.toLowerCase()

      // Check for custom responses
      for (const [key, value] of Object.entries(CUSTOM_RESPONSES)) {
        if (lowercaseInput.includes(key)) {
          response = value
          break
        }
      }

      // If no custom response, use a random one
      if (!response) {
        const randomIndex = Math.floor(Math.random() * (MAID_RESPONSES.length - 2)) + 2
        response = MAID_RESPONSES[randomIndex]
      }

      setMessages((prev) => [...prev, { text: response, sender: "maid", id: Date.now() }])
      setIsTyping(false)
    }, 1500)
  }

  const handleClose = () => {
    // Show a toast notification when closing
    const toastMessage = document.createElement("div")
    toastMessage.className =
      "fixed bottom-20 right-5 bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100 p-3 rounded-lg shadow-lg z-40 animate-fade-in-out"
    toastMessage.style.animation = "fadeInOut 3s forwards"
    toastMessage.innerHTML = "Pelayan AI tersembunyi. Klik ikon pesan untuk memanggilnya kembali."
    document.body.appendChild(toastMessage)

    // Remove the toast after animation
    setTimeout(() => {
      document.body.removeChild(toastMessage)
    }, 3000)

    // Call the original onClose
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={cn(
        "fixed bottom-20 right-5 w-80 md:w-96 rounded-lg shadow-xl z-50 overflow-hidden",
        darkMode ? "bg-amber-900/90" : "bg-amber-50/90",
        "backdrop-blur-md border-2",
        darkMode ? "border-amber-700" : "border-amber-300",
      )}
    >
      {/* Header */}
      <div className={cn("p-3 flex items-center justify-between", darkMode ? "bg-amber-800" : "bg-amber-200")}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src="/maid-avatar.svg"
              alt="AI Maid"
              className="w-8 h-8 rounded-full border-2 border-amber-300 dark:border-amber-600"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-amber-100 dark:border-amber-800"></div>
          </div>
          <span className="font-cinzel font-bold text-amber-900 dark:text-amber-100">Eliza - Pelayan AI</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-amber-900 dark:text-amber-100 hover:bg-amber-300/50 dark:hover:bg-amber-700/50"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] p-3 rounded-lg",
              message.sender === "maid"
                ? "bg-amber-200/80 dark:bg-amber-800/80 text-amber-900 dark:text-amber-100 self-start rounded-tl-none"
                : "bg-amber-700/80 text-amber-50 self-end rounded-tr-none",
            )}
          >
            {message.text}
          </div>
        ))}

        {isTyping && (
          <div className="max-w-[80%] p-3 rounded-lg bg-amber-200/80 dark:bg-amber-800/80 text-amber-900 dark:text-amber-100 self-start rounded-tl-none">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}

        {/* Sparkles */}
        {Array.from({ length: sparkleCount }).map((_, i) => (
          <motion.div
            key={`chat-sparkle-${i}-${Date.now()}`}
            className="absolute w-4 h-4 text-amber-300"
            initial={{
              x: Math.random() * 300,
              y: Math.random() * 200,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{ duration: 1.5 }}
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 70}%`,
            }}
          >
            <Sparkles />
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className={cn("p-3 flex gap-2", darkMode ? "bg-amber-800/50" : "bg-amber-200/50")}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Tanyakan sesuatu..."
          className={cn(
            "border-amber-300 dark:border-amber-700",
            "bg-amber-50/80 dark:bg-amber-900/80",
            "text-amber-900 dark:text-amber-100",
            "focus-visible:ring-amber-500",
          )}
        />
        <Button onClick={handleSendMessage} className="bg-amber-700 hover:bg-amber-800 text-amber-50">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  )
}
