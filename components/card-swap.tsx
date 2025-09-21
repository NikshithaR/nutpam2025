"use client"

import type React from "react"

import { useState } from "react"

interface CardSwapProps {
  frontCard: React.ReactNode
  backCard: React.ReactNode
  className?: string
}

export function CardSwap({ frontCard, backCard, className = "" }: CardSwapProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`relative w-full h-full perspective-1000 cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">{frontCard}</div>

        {/* Back Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">{backCard}</div>
      </div>
    </div>
  )
}
