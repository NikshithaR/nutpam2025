"use client"

import { useEffect, useRef, useState } from "react"

interface VariableProximityTextProps {
  children: string
  className?: string
  maxDistance?: number
}

export function VariableProximityText({ children, className = "", maxDistance = 100 }: VariableProximityTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const chars = element.querySelectorAll(".char")
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect()
      const charX = rect.left + rect.width / 2
      const charY = rect.top + rect.height / 2

      const distance = Math.sqrt(Math.pow(mousePosition.x - charX, 2) + Math.pow(mousePosition.y - charY, 2))

      const proximity = Math.max(0, 1 - distance / maxDistance)
      const scale = 1 + proximity * 0.5
      const brightness = 1 + proximity * 0.8
      ;(char as HTMLElement).style.transform = `scale(${scale})`
      ;(char as HTMLElement).style.filter = `brightness(${brightness})`
      ;(char as HTMLElement).style.color = proximity > 0.3 ? "rgb(125, 211, 252)" : ""
    })
  }, [mousePosition, maxDistance])

  return (
    <div ref={textRef} className={`inline-block ${className}`}>
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block transition-all duration-200 ease-out"
          style={{ transformOrigin: "center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}
