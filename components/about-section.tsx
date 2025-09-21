"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import { HackathonBackground } from "./hackathon-background"
import { VariableProximityText } from "./variable-proximity-text"
import { DecryptedText } from "./decrypted-text"
import { Button } from "./ui/button"
import { RegistrationModal } from "./registration-modal"

export function AboutSection() {
  const { t } = useLanguage()
  const [showRegistration, setShowRegistration] = useState(false)

  return (
    <>
      <RegistrationModal isOpen={showRegistration} onClose={() => setShowRegistration(false)} />
      <section id="about" className="relative min-h-screen py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <HackathonBackground variant="code" />

        {/* Background Image Layer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/futuristic-hackathon-coding-workspace-with-multipl.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Title */}
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
                <DecryptedText className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  {t("about.title")}
                </DecryptedText>
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                  <VariableProximityText>{t("about.description")}</VariableProximityText>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {(t("about.features") as string[]).map((feature, index) => (
                <div
                  key={index}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:glow-blue"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-background font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-orbitron font-bold text-primary mb-2">{feature}</h3>
                </div>
              ))}
            </div>

            {/* Event Highlights */}
            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">1</div>
                  <div className="text-lg text-secondary font-semibold mb-1">Day Event</div>
                  <div className="text-sm text-muted-foreground">Intensive Learning</div>
                </div>
                <div>
                  <div className="text-4xl font-orbitron font-bold text-secondary mb-2">6</div>
                  <div className="text-lg text-primary font-semibold mb-1">Key Sessions</div>
                  <div className="text-sm text-muted-foreground">From Workshop to Winners</div>
                </div>
                <div>
                  <div className="text-4xl font-orbitron font-bold text-primary mb-2">∞</div>
                  <div className="text-lg text-secondary font-semibold mb-1">Possibilities</div>
                  <div className="text-sm text-muted-foreground">Innovation Unleashed</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setShowRegistration(true)}
                className="bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg px-8 py-4 hover:scale-105 transition-all duration-300 glow-purple"
              >
                {t("hero.cta")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
