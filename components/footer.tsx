"use client"

import { useLanguage } from "./language-context"
import { Dock } from "./dock"
import { HackathonBackground } from "./hackathon-background"
import { ScrollStack } from "./scroll-stack"
import { Instagram, Globe, Mail, MapPin, Calendar } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const socialItems = [
    {
      icon: <Instagram className="w-6 h-6 text-primary" />,
      label: "Instagram",
      href: "https://instagram.com/nutpam2025",
    },
    {
      icon: <Globe className="w-6 h-6 text-secondary" />,
      label: "Website",
      href: "https://nutpam2025.com",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      label: "Email",
      href: "mailto:contact@nutpam2025.com",
    },
  ]

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background Effects */}
      <HackathonBackground variant="data" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/90" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <ScrollStack className="text-center mb-12">
          {/* Footer Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-background font-orbitron">N</span>
              </div>
              <div>
                <h3 className="text-3xl font-orbitron font-bold text-primary">NUTPAM 2025</h3>
                <p className="text-sm text-muted-foreground">நுட்பம் 2025</p>
              </div>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Join us for an innovative hackathon experience that bridges technology and creativity, bringing together
              the brightest minds to solve tomorrow's challenges.
            </p>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/30 transition-all duration-300">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-primary mb-2">Event Date</h4>
              <p className="text-sm text-muted-foreground">September 22, 2025</p>
              <p className="text-xs text-muted-foreground mt-1">9:00 AM - 5:30 PM</p>
            </div>

            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/30 transition-all duration-300">
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-secondary mb-2">Location</h4>
              <p className="text-sm text-muted-foreground">Innovation Hub</p>
              <p className="text-xs text-muted-foreground mt-1">Chennai, Tamil Nadu</p>
            </div>

            <div className="bg-card/20 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/30 transition-all duration-300">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-orbitron font-bold text-primary mb-2">Contact</h4>
              <p className="text-sm text-muted-foreground">contact@nutpam2025.com</p>
              <p className="text-xs text-muted-foreground mt-1">+91 98765 43210</p>
            </div>
          </div>

          {/* Social Links with Dock */}
          <div className="flex justify-center mb-8">
            <Dock items={socialItems} />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#timeline" className="text-muted-foreground hover:text-primary transition-colors">
              Timeline
            </a>
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with ❤️ for the future of innovation • Powered by cutting-edge technology
            </p>
          </div>
        </ScrollStack>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  )
}
