import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { AudioProvider } from "@/contexts/audio-context"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Welcome to Our Wedding",
    template: "%s | hamoody",
  },
  description: "Celebrating our wedding - Khaled & Nouran",
  applicationName: "hamoody",
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khaled-nouran.digitivaa.com'),
  openGraph: {
    title: "Welcome to Our Wedding",
    description: "Celebrating our wedding - Khaled & Nouran",
    type: "website",
    siteName: "hamoody",
    images: [
      {
        url: "/invitation-design.png",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation - Khaled & Nouran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Our Wedding",
    description: "Celebrating our wedding - Khaled & Nouran",
    images: ["/invitation-design.png"],
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images for immediate loading */}
        <link 
          rel="preload" 
          href="/invitation-design.png" 
          as="image" 
          type="image/png"
        />
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <AudioProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}