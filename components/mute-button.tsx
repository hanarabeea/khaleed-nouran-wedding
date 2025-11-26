'use client'

import { useAudio } from '@/contexts/audio-context'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'

export default function MuteButton() {
  const { isMuted, toggleMute } = useAudio()
  const { t } = useLanguage()

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center shadow-md transition-all duration-300 border border-gray-400"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMuted ? (
        <svg 
          className="w-5 h-5 text-gray-900" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" 
          />
        </svg>
      ) : (
        <svg 
          className="w-5 h-5 text-gray-900" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
          />
        </svg>
      )}
    </motion.button>
  )
}

