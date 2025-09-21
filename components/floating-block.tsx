"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./language-context"

interface FloatingBlockProps {
  letter: string
  tamilLetter?: string
  index: number
  isEnglish: boolean
  onClick: () => void
  className?: string
}

export function FloatingBlock({ letter, tamilLetter, index, isEnglish, onClick, className = "" }: FloatingBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const block = blockRef.current
    if (!block) return

    // GSAP-like animation using CSS transforms
    const animationDelay = index * 0.1
    block.style.animationDelay = `${animationDelay}s`

    // Add entrance animation
    block.style.transform = `translateY(100px) rotateX(45deg) rotateY(45deg) scale(0)`
    block.style.opacity = "0"

    setTimeout(() => {
      block.style.transition = "all 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)"
      block.style.transform = `translateY(0) rotateX(0deg) rotateY(0deg) scale(1)`
      block.style.opacity = "1"
    }, animationDelay * 1000)
  }, [index])

  const displayLetter = isEnglish ? letter : tamilLetter || letter
  const glowClass = isEnglish ? "glow-blue" : "glow-purple"
  const textGlowClass = isEnglish ? "text-glow-blue" : "text-glow-purple"

  return (
    <div
      ref={blockRef}
      className={`
        relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
        bg-gradient-to-br from-card/80 to-card/40
        border border-border
        rounded-lg
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300
        preserve-3d
        float-animation
        ${isHovered ? glowClass : ""}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? "translateY(-10px) rotateX(10deg) rotateY(10deg) scale(1.1)"
          : "translateY(0) rotateX(0deg) rotateY(0deg) scale(1)",
        animationDelay: `${index * 0.5}s`,
      }}
    >
      <span
        className={`
          text-2xl md:text-3xl lg:text-4xl font-bold font-orbitron
          transition-all duration-300
          ${isHovered ? textGlowClass : ""}
          ${isEnglish ? "text-primary" : "text-secondary"}
        `}
      >
        {displayLetter}
      </span>

      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-lg pointer-events-none" />
    </div>
  )
}
