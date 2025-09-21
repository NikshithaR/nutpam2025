"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { TrueFocusText } from "./true-focus-text"

interface MobileMenuProps {
  onRegisterClick: () => void
}

export function MobileMenu({ onRegisterClick }: MobileMenuProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: t("nav.overview"), href: "#overview" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.timeline"), href: "#timeline" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground hover:text-primary"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-foreground hover:text-primary"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Menu Items */}
            <nav className="flex flex-col items-center space-y-6">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-2xl font-orbitron font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <TrueFocusText>{item.label}</TrueFocusText>
                </a>
              ))}
            </nav>

            {/* Register Button */}
            <Button
              onClick={() => {
                onRegisterClick()
                setIsOpen(false)
              }}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg px-8 py-4"
            >
              {t("nav.register")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
