"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Scroll, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MaklumatSectionProps {
  darkMode: boolean
}

const maklumatItems = [
  {
    title: "Bebas dari Belenggu Kode",
    content:
      "Di kerajaan kami, Anda tidak perlu menjadi ahli kode untuk menciptakan karya digital yang megah. Pelayan AI kami siap membantu Anda mewujudkan visi tanpa perlu menulis satu baris kode pun.",
    icon: "/scroll-icon.svg",
  },
  {
    title: "Kekuatan Sihir AI",
    content:
      "Dengan kekuatan sihir AI, Anda dapat menciptakan aplikasi, situs web, dan pengalaman digital yang sebelumnya membutuhkan batalion pengembang. Sekarang, Anda adalah komandan dari kerajaan digital Anda sendiri.",
    icon: "/magic-icon.svg",
  },
  {
    title: "Aliansi Para Bangsawan",
    content:
      "Bergabunglah dengan aliansi para bangsawan digital yang telah membebaskan diri dari tirani kode. Bersama-sama, kita akan membangun kerajaan digital yang lebih kuat dan lebih inklusif.",
    icon: "/alliance-icon.svg",
  },
]

export default function MaklumatSection({ darkMode }: MaklumatSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="maklumat" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl mb-6 text-amber-900 dark:text-amber-300 royal-glow">
            Maklumat Kerajaan
          </h2>
          <p className="text-lg text-amber-800 dark:text-amber-100">
            Pelajari tentang kerajaan kami dan bagaimana kami membebaskan para bangsawan dari belenggu kode
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {maklumatItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full overflow-hidden transition-all duration-300 backdrop-blur-sm border-2",
                  expandedIndex === index
                    ? "bg-amber-50/95 dark:bg-amber-900/70 border-amber-500 dark:border-amber-500 transform scale-105 shadow-xl z-10"
                    : "bg-amber-50/80 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600",
                )}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-center mb-4">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                        expandedIndex === index ? "bg-amber-200 dark:bg-amber-800" : "bg-amber-100 dark:bg-amber-900",
                      )}
                    >
                      <Scroll className="h-8 w-8 text-amber-700 dark:text-amber-300" />
                    </div>
                  </div>

                  <h3 className="font-cinzel text-xl text-center mb-4 text-amber-900 dark:text-amber-300">
                    {item.title}
                  </h3>

                  <div
                    className={cn(
                      "transition-all duration-300 overflow-hidden flex-grow",
                      expandedIndex === index ? "max-h-96" : "max-h-24",
                    )}
                  >
                    <p className="text-amber-800 dark:text-amber-100 text-center">{item.content}</p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:bg-amber-100/50 dark:hover:bg-amber-800/50"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      {expandedIndex === index ? "Tutup" : "Baca Selengkapnya"}
                      <ChevronRight
                        className={cn("ml-1 h-4 w-4 transition-transform", expandedIndex === index ? "rotate-90" : "")}
                      />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
