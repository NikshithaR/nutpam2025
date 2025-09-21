"use client"

import { useEffect, useRef, useState } from "react"

interface TrueFocusTextProps {
  children: string
  className?: string
  trigger?: boolean
}

export function TrueFocusText({ children, className = "", trigger = false }: TrueFocusTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!trigger || isAnimating) return

    const element = textRef.current
    if (!element) return

    setIsAnimating(true)

    // Split text into characters
    const originalText = children
    const chars = originalText.split("")

    // Create scrambled version
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

    let iteration = 0
    const maxIterations = 20

    const interval = setInterval(() => {
      element.textContent = chars
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        })
        .join("")

      if (iteration >= originalText.length) {
        clearInterval(interval)
        element.textContent = originalText
        setIsAnimating(false)
      }

      iteration += 1 / 3
    }, 30)

    return () => {
      clearInterval(interval)
      setIsAnimating(false)
    }
  }, [trigger, children, isAnimating])

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  )
}
