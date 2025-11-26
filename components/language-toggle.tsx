'use client'

import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 w-14 h-14 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center shadow-md transition-all duration-300 border border-gray-400"
      aria-label="Toggle language"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm font-semibold text-gray-900">
        {language === 'en' ? 'عربي' : 'EN'}
      </span>
    </motion.button>
  )
}

