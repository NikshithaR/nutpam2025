"use client"

import { useRef, useState } from "react"
import { FloatingBlock } from "./floating-block"
import { useLanguage } from "./language-context"
import { Button } from "./ui/button"
import { HyperspeedBackground } from "./hyperspeed-background"
import { TrueFocusText } from "./true-focus-text"
import { DecryptedText } from "./decrypted-text"
import { CursorEffects } from "./cursor-effects"
import { RegistrationModal } from "./registration-modal"

export function HeroSection() {
  const { language, setLanguage, t } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [languageSwitchTrigger, setLanguageSwitchTrigger] = useState(false)

  const englishLetters = ["N", "U", "T", "P", "A", "M"]
  const tamilLetters = ["நு", "ட்", "ப", "ம்"]

  const handleLanguageSwitch = (lang: "en" | "ta") => {
    setLanguage(lang)
    setLanguageSwitchTrigger(true)

    // True Focus animation effect
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
      >
        <HyperspeedBackground />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Club Logo Placeholder */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-background">N</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-orbitron font-bold text-primary">
                  <TrueFocusText trigger={languageSwitchTrigger}>NUTPAM 2025</TrueFocusText>
                </h1>
                <p className="text-sm text-muted-foreground">
                  <TrueFocusText trigger={languageSwitchTrigger}>{t("hero.date")}</TrueFocusText>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#overview" className="text-foreground hover:text-primary transition-colors">
                <TrueFocusText trigger={languageSwitchTrigger}>{t("nav.overview")}</TrueFocusText>
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                <TrueFocusText trigger={languageSwitchTrigger}>{t("nav.about")}</TrueFocusText>
              </a>
              <a href="#timeline" className="text-foreground hover:text-primary transition-colors">
                <TrueFocusText trigger={languageSwitchTrigger}>{t("nav.timeline")}</TrueFocusText>
              </a>
            </nav>

            {/* Register Button */}
            <Button
              onClick={() => setShowRegistration(true)}
              className="bg-gradient-to-r from-primary to-secondary text-background font-semibold hover:scale-105 transition-transform"
            >
              <TrueFocusText trigger={languageSwitchTrigger}>{t("nav.register")}</TrueFocusText>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 pt-20">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                <DecryptedText>{t("hero.title")}</DecryptedText>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              <TrueFocusText trigger={languageSwitchTrigger}>{t("hero.subtitle")}</TrueFocusText>
            </p>
            <p className="text-lg text-primary font-mono">
              <TrueFocusText trigger={languageSwitchTrigger}>{t("hero.mainEvent")}</TrueFocusText>
            </p>
          </div>

          {/* Interactive Language Blocks */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-12">
            {/* English Blocks */}
            <div className="perspective-1000">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {englishLetters.map((letter, index) => (
                  <FloatingBlock
                    key={`en-${letter}-${index}`}
                    letter={letter}
                    index={index}
                    isEnglish={true}
                    onClick={() => handleLanguageSwitch("en")}
                    className={language === "en" ? "ring-2 ring-primary" : ""}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">Click for English</p>
            </div>

            {/* Tamil Blocks */}
            <div className="perspective-1000">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {tamilLetters.map((letter, index) => (
                  <FloatingBlock
                    key={`ta-${letter}-${index}`}
                    letter={letter}
                    index={index + englishLetters.length}
                    isEnglish={false}
                    onClick={() => handleLanguageSwitch("ta")}
                    className={language === "ta" ? "ring-2 ring-secondary" : ""}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">தமிழுக்கு கிளிக் செய்க</p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              <TrueFocusText trigger={languageSwitchTrigger}>{t("hero.description")}</TrueFocusText>
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => setShowRegistration(true)}
            className="bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg px-8 py-4 hover:scale-105 transition-all duration-300 glow-blue"
          >
            <TrueFocusText trigger={languageSwitchTrigger}>{t("hero.cta")}</TrueFocusText>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  )
}
