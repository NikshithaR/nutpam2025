"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface LanyardLogoProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function LanyardLogo({ children, className = "", delay = 0 }: LanyardLogoProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      ref={logoRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: isRevealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        transition: "clip-path 1s cubic-bezier(0.2, 0.9, 0.2, 1)",
      }}
    >
      {children}
    </div>
  )
}
