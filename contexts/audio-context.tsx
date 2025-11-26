'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  setMuted: (muted: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load mute state from localStorage if available
    const savedMuteState = localStorage.getItem('audioMuted')
    if (savedMuteState === 'true') {
      setIsMuted(true)
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(prev => {
      const newState = !prev
      localStorage.setItem('audioMuted', String(newState))
      return newState
    })
  }

  const setMuted = (muted: boolean) => {
    setIsMuted(muted)
    localStorage.setItem('audioMuted', String(muted))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, setMuted }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

