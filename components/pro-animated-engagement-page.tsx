"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import CountdownTimer from "@/components/countdown-timer"
import VenueMap from "@/components/venue-map"
import Image from "next/image"
import HandwrittenMessage from "@/components/handwritten-message"
import RSVPSection from "@/components/rsvp-section"
import PhotoSharingSection from "@/components/photo-sharing-section"
import { Variants } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

// Professional animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const slideUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const scaleIn: Variants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

interface ProAnimatedEngagementPageProps {
  onImageLoad?: () => void;
}

export default function ProAnimatedEngagementPage({ onImageLoad }: ProAnimatedEngagementPageProps) {
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const { t } = useLanguage()
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
    onImageLoad?.()
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* Hero Section - full viewport, edge to edge */}
      <motion.section 
        className="relative flex items-center justify-center px-0 py-0 h-screen"
        initial={false}
        animate="visible"
        variants={fadeIn}
      >
        <motion.div 
          className="w-full h-full relative z-10"
          variants={scaleIn}
        >
          {/* Optimized Image with immediate loading */}
          <div className="relative w-full h-full">
            <Image
              src="/invitation-design.png"
              alt="Khaled & Nouran Wedding Invitation"
              fill
              className="object-contain"
              priority
              loading="eager"
              quality={80}
              onLoad={handleImageLoad}
              sizes="100vw"
            />
          </div>
        </motion.div>
        
        {/* Subtle parallax background elements */}
        <motion.div 
          className="absolute -left-20 top-1/4 w-64 h-64 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute -right-20 bottom-1/4 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
          style={{ y: y2 }}
        />
      </motion.section>

      {/* Section 1: Our Special Day */}
      <motion.section 
        className="relative py-16 px-4 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-8"
              variants={slideUp}
            >
              <div className="w-16 h-px bg-accent/30 mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                {t('ourSpecialDay')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-light max-w-2xl mx-auto">
                {t('countingMoments')}
              </p>
            </motion.div>

            <motion.div variants={scaleIn}>
              <CountdownTimer targetDate={new Date("2025-12-17T19:00:00")} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Join Us At */}
      <motion.section 
        className="relative py-16 px-4 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-12"
              variants={slideUp}
            >
              <div className="w-16 h-px bg-accent/30 mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                {t('joinUsAt')}
              </h2>
            </motion.div>

            <motion.div 
              className="max-w-2xl mx-auto space-y-8"
              variants={scaleIn}
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
                  {t('venueName')}
                </h3>
                <p className="text-xl text-gray-700 mb-8">
                  {t('venueLocation')}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-accent/10">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-800 font-bold text-xl">{t('date')}</span>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-accent/20" />
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-800 font-bold text-xl text-accent drop-shadow-sm">{t('time')}</span>
                  </div>
                </div>
              </div>

              <motion.div variants={slideUp}>
                <VenueMap />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Love Message from Husband to Wife */}
      <motion.section 
        className="relative py-16 px-4 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-8"
              variants={slideUp}
            >
              <div className="w-16 h-px bg-accent/30 mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                {t('loveMessageFromHusband')}
              </h2>
            </motion.div>

            <motion.div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              variants={scaleIn}
            >
              <div className="text-center space-y-6" dir="rtl" lang="ar">
                <p className="text-xl md:text-2xl font-light text-gray-900">
                  سَبْعَةُ أَعْوَامٍ
                  <br />
                  وَنَحْنُ نَحْمِلُ بَعْضَنَا فِي قُلُوبٍ لَمْ تَتْعَبْ مِنَ الحُبِّ، رَغْمَ الصِّعَابِ الَّتِي مَرَرْنَا بِهَا، ظَلَّ الحُبُّ بَيْنَ رُوحَيْنَا أَعْمَقَ مِنْ أَيِّ وَجَعٍ، وَأَصْدَقَ مِنْ أَيِّ وَعْدٍ.
                </p>
                
                <p className="text-xl md:text-2xl font-light text-gray-900">
                  وَمَا زِلْتِ أَنْتِ – كَمَا كُنْتِ – حَبِيبَةَ عُمُرِي الَّتِي لَمْ تَتَغَيَّرْ مَلَامِحُهَا فِي قَلْبِي، وَلَا صَمَتَ صَوْتُهَا فِي رُوحِي.
                </p>
                
                <p className="text-xl md:text-2xl font-light text-gray-900">
                  أَمَّا فِي هَذَا اليَوْمِ، فَقَدْ وَضَعْتِ بَصْمَتَكِ عَلَى أَيَّامِي، وَصِرْتِ شَرِيكَةَ الرِّحْلَةِ وَزَوْجَتِي الدَّافِئَةَ، وَمَا زِلْتِ – كَمَا كُنْتِ دَائِمًا – حَبِيبَةَ العُمْرِ، يَا حَبِيبَةَ عُمُرِي.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Our Love Story
      <motion.section 
        className="relative py-16 px-4 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-8"
              variants={slideUp}
            >
              <div className="w-16 h-px bg-accent/30 mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                Our Love Story
              </h2>
            </motion.div>

            <motion.div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              variants={scaleIn}
            >
              <p className="text-xl md:text-2xl font-light mb-6 text-center">
                It all began on May 29, 2025, with a simple, traditional family gathering. From the very first moment, something just felt right. It wasn't loud or dramatic — just a warm, quiet feeling that made us both smile.
              </p>
              
              <p className="text-xl md:text-2xl font-light mb-6 text-center">
                In just a few magical days, our bond grew so effortlessly and beautifully that we found ourselves choosing our rings together, sealing our love with an engagement on June 7, 2025.
              </p>
              
              <p className="text-xl md:text-2xl font-light text-center">
                But this was only the beginning of our fairytale. Our love kept growing, blooming brighter with every heartbeat… until we decided to make it forever and write our own "happily ever after" on November 14, 2025.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      {/* Section 5: Leave Us a Message */}
      <motion.section 
        className="relative py-16 px-4 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.div 
              className="text-center mb-8"
              variants={slideUp}
            >
              <div className="w-16 h-px bg-accent/30 mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                {t('leaveUsAMessage')}
              </h2>
              <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
                {t('leaveMessageDescription')}
              </p>
            </motion.div>

            <motion.div variants={scaleIn}>
              <HandwrittenMessage />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 6: RSVP */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <RSVPSection />
      </motion.section>

      {/* Section 7: Share Your Photos */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <PhotoSharingSection />
      </motion.section>
      
      {/* Footer */}
      <motion.footer 
        className="relative py-16 text-center"
        variants={fadeIn}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.p 
            className="font-serif text-2xl md:text-3xl text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('cantWaitToCelebrate')}
          </motion.p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-accent/30" />
            <motion.span 
              className="text-accent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-6.716-4.405-9.193-8.14C1.02 10.607 2.09 7.5 5.08 6.62c1.86-.56 3.6.23 4.92 1.8 1.32-1.57 3.06-2.36 4.92-1.8 2.99.88 4.06 3.986 2.273 6.24C18.716 16.595 12 21 12 21z"/>
              </svg>
            </motion.span>
            <div className="w-12 h-px bg-accent/30" />
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              <a 
                href="https://www.instagram.com/digitiva.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                {t('designedBy')}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </motion.div>
            <motion.p 
              className="text-xs text-white/40 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              © {new Date().getFullYear()} All rights reserved
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}