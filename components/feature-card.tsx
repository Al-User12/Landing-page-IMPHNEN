"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay: number
}

export default function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="p-6 h-full bg-amber-50/90 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 backdrop-blur-sm hover:shadow-lg hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-800/60 text-amber-700 dark:text-amber-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
            {icon}
          </div>
          <h3 className="font-cinzel text-xl md:text-2xl mb-4 text-amber-900 dark:text-amber-300">{title}</h3>
          <p className="text-amber-800 dark:text-amber-100">{description}</p>
        </div>
      </Card>
    </motion.div>
  )
}
