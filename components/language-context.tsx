"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "../lib/i18n/en"
import { ta } from "../lib/i18n/ta"

type Language = "en" | "ta"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en,
  ta,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("nutpam-language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "ta")) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("nutpam-language", language)
  }, [language])

  const t = (key: string): any => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
