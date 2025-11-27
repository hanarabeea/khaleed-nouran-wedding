"use client"

import { useEffect, useRef } from "react"
import { useAudio } from "@/contexts/audio-context"

interface BackgroundAudioProps {
  shouldPlay: boolean
  volume?: number
}

export default function BackgroundAudio({ shouldPlay, volume = 0.3 }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isMuted } = useAudio()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set volume and loop properties
    audio.volume = isMuted ? 0 : volume
    audio.loop = true

    if (shouldPlay) {
      // Try to play the audio
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            console.log("Background music started playing")
          })
          .catch((error) => {
            // Autoplay was prevented - user interaction required
            console.log("Audio autoplay prevented:", error)
            // Audio will play when user interacts with the page
            // Try to play again on first user interaction
            const handleUserInteraction = () => {
              audio.play().catch(() => {})
              document.removeEventListener('click', handleUserInteraction)
              document.removeEventListener('touchstart', handleUserInteraction)
            }
            document.addEventListener('click', handleUserInteraction, { once: true })
            document.addEventListener('touchstart', handleUserInteraction, { once: true })
          })
      }
    } else {
      // Pause audio if video intro is showing
      audio.pause()
    }

    return () => {
      // Cleanup: pause audio when component unmounts
      if (audio) {
        audio.pause()
      }
    }
  }, [shouldPlay, volume, isMuted])

  // Update volume when mute state changes - immediate effect
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Immediately set volume to 0 when muted, or restore volume when unmuted
      audio.volume = isMuted ? 0 : volume
      // Also pause if muted to ensure no sound
      if (isMuted) {
        audio.pause()
      } else if (shouldPlay && !document.hidden) {
        // Resume if unmuted and should be playing
        audio.play().catch(() => {})
      }
    }
  }, [isMuted, volume, shouldPlay])

  // Pause audio when page becomes hidden or user navigates away
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden - pause audio
        audio.pause()
      } else if (shouldPlay && !isMuted) {
        // Page is visible again - resume if it should be playing
        audio.play().catch(() => {})
      }
    }

    const handleBeforeUnload = () => {
      // User is navigating away - pause audio
      audio.pause()
    }

    const handlePageHide = () => {
      // Page is being hidden - pause audio
      audio.pause()
    }

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Listen for navigation away
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
      // Also pause on cleanup
      if (audio) {
        audio.pause()
      }
    }
  }, [shouldPlay, isMuted])

  return (
    <audio
      ref={audioRef}
      preload="auto"
      loop
    >
      <source src="/background-music.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}

