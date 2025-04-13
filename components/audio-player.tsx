"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  darkMode: boolean
}

// Define multiple audio sources to try
const AUDIO_SOURCES = [
  "/medieval-music.mp3",
  "https://pixabay.com/music/ambient-stellar-guardian-medieval-music-282967/", // Fallback to a remote source
]

export default function AudioPlayer({ darkMode }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/medieval-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Try to autoplay
    const playAudio = async () => {
      try {
        await audioRef.current?.play()
        setIsPlaying(true)
      } catch (err) {
        console.warn("Autoplay was prevented:", err)
        toast({
          title: "Audio Playback Blocked",
          description: "Your browser blocked autoplay. Click the music button to enable sound.",
        })
      }
    }

    playAudio()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [toast])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-amber-800/80 backdrop-blur-sm border-amber-600 hover:bg-amber-700 shadow-glow"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 text-amber-100" />
      ) : (
        <VolumeX className="h-5 w-5 text-amber-100" />
      )}
    </Button>
  )
}
