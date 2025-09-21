"use client"

import { useEffect, useRef, useState } from "react"

interface DecryptedTextProps {
  children: string
  className?: string
  delay?: number
}

export function DecryptedText({ children, className = "", delay = 0 }: DecryptedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    const element = textRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              animateDecryption()
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    const animateDecryption = () => {
      setHasAnimated(true)
      const originalText = children
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

      let iteration = 0

      const interval = setInterval(() => {
        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")

        if (iteration >= originalText.length) {
          clearInterval(interval)
          element.textContent = originalText
        }

        iteration += 1 / 3
      }, 30)
    }

    return () => {
      observer.disconnect()
    }
  }, [children, delay, hasAnimated])

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  )
}
