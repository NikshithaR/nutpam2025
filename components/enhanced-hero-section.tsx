"use client"

import { useRef, useState, useEffect } from "react"
import { FloatingBlock } from "./floating-block"
import { useLanguage } from "./language-context"
import { Button } from "./ui/button"
import { TrueFocusText } from "./true-focus-text"
import { DecryptedText } from "./decrypted-text"
import { CursorEffects } from "./cursor-effects"
import { RegistrationModal } from "./registration-modal"
import { LanyardLogo } from "./lanyard-logo"
import { MobileMenu } from "./mobile-menu"

export function EnhancedHeroSection() {
  const { language, setLanguage, t } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [languageSwitchTrigger, setLanguageSwitchTrigger] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const englishLetters = ["N", "U", "T", "P", "A", "M"]
  const tamilLetters = ["நு", "ட்", "ப", "ம்"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLanguageSwitch = (lang: "en" | "ta") => {
    setLanguage(lang)
    setLanguageSwitchTrigger(true)

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.style.transform = "scale(1.02)"
      heroElement.style.filter = "blur(2px)"

      setTimeout(() => {
        heroElement.style.transform = "scale(1)"
        heroElement.style.filter = "blur(0px)"
        setLanguageSwitchTrigger(false)
      }, 300)
    }
  }

  return (
    <>
      <CursorEffects />
      <RegistrationModal isOpen={showRegistration} onClose={() => setShowRegistration(false)} />

      <section
        ref={heroRef}
        className="relative min-h-screen bg-gray-50 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LanyardLogo delay={500}>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                  <span className="text-sm font-bold text-white">N</span>
                </div>
              </LanyardLogo>
              <h1 className="text-lg font-bold text-gray-900">NUTPAM '25</h1>
            </div>

            <div className="hidden md:block text-sm font-mono">
              <span className="text-blue-600">&lt;date&gt;</span>
              <span className="text-gray-900 mx-2">September 22, 2025</span>
              <span className="text-blue-600">&lt;/date&gt;</span>
            </div>

            <MobileMenu onRegisterClick={() => setShowRegistration(true)} />
          </div>
        </header>

        <div className="relative z-10 pt-24 pb-20 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              <div className="space-y-8">
                <div>
                  <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-none">
                    <DecryptedText delay={300}>NUTPAM</DecryptedText>
                  </h1>
                  <h2 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-none">
                    <DecryptedText delay={600}>2025</DecryptedText>
                  </h2>
                  <p className="text-lg text-gray-600 mt-4 font-medium">
                    <TrueFocusText trigger={languageSwitchTrigger}>September 22, 2025</TrueFocusText>
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowRegistration(true)}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 text-base font-medium"
                  >
                    <TrueFocusText trigger={languageSwitchTrigger}>Register Now</TrueFocusText>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 lg:ml-auto perspective-1000">
                  <div className="col-span-3 flex justify-center gap-4">
                    <FloatingBlock
                      letter={language === "en" ? "N" : "நு"}
                      index={0}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-orange-500 hover:bg-orange-400"
                    />
                    <FloatingBlock
                      letter={language === "en" ? "U" : "ட்"}
                      index={1}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-purple-500 hover:bg-purple-400"
                    />
                  </div>

                  <div className="col-span-3 flex justify-center gap-4">
                    <FloatingBlock
                      letter={language === "en" ? "T" : "ப"}
                      index={2}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-blue-500 hover:bg-blue-400"
                    />
                    <FloatingBlock
                      letter={language === "en" ? "P" : "ம்"}
                      index={3}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-yellow-500 hover:bg-yellow-400"
                    />
                    <FloatingBlock
                      letter={language === "en" ? "A" : ""}
                      index={4}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-green-500 hover:bg-green-400"
                    />
                  </div>

                  <div className="col-span-3 flex justify-center">
                    <FloatingBlock
                      letter={language === "en" ? "M" : ""}
                      index={5}
                      isEnglish={language === "en"}
                      onClick={() => handleLanguageSwitch(language === "en" ? "ta" : "en")}
                      className="bg-pink-500 hover:bg-pink-400"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20">
                  <svg viewBox="0 0 64 64" className="w-full h-full text-gray-400">
                    <path d="M8 8h48v48H8z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="16" cy="16" r="2" fill="currentColor" />
                    <circle cx="32" cy="16" r="2" fill="currentColor" />
                    <circle cx="48" cy="16" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              {[
                { label: "Overview", active: true },
                { label: "Tracks & Prizes", active: false },
                { label: "Sponsors", active: false },
                { label: "Events", active: false },
                { label: "FAQ", active: false },
                { label: "Results", active: false },
                { label: "Discord", active: false },
                { label: "Winners", active: false },
              ].map((item, index) => (
                <button
                  key={item.label}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-r border-blue-500 hover:bg-blue-700 transition-colors ${
                    item.active ? "bg-blue-700" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-auto p-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}
