"use client"

import { useEffect, useRef } from "react"

export function HyperspeedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create hyperspeed lines
    const createLine = () => {
      const line = document.createElement("div")
      line.className = "absolute w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hyperspeed-line"
      line.style.height = "200px"
      line.style.left = Math.random() * 100 + "%"
      line.style.top = "-200px"
      line.style.animationDelay = Math.random() * 2 + "s"
      line.style.animationDuration = Math.random() * 2 + 1 + "s"

      container.appendChild(line)

      // Remove line after animation
      setTimeout(() => {
        if (container.contains(line)) {
          container.removeChild(line)
        }
      }, 3000)
    }

    // Create lines periodically
    const interval = setInterval(createLine, 100)

    // Create initial lines
    for (let i = 0; i < 20; i++) {
      setTimeout(createLine, i * 50)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ perspective: "1000px" }}
    />
  )
}
