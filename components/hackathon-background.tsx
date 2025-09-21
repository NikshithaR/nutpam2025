"use client"

import { useEffect, useRef } from "react"

interface HackathonBackgroundProps {
  variant?: "code" | "circuit" | "data"
}

export function HackathonBackground({ variant = "code" }: HackathonBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createElements = () => {
      // Clear existing elements
      container.innerHTML = ""

      if (variant === "code") {
        // Create floating code snippets
        const codeSnippets = [
          "function()",
          "const x =",
          "if (true)",
          "return;",
          "async/await",
          "useState()",
          "useEffect()",
          "API.get()",
          "ML.train()",
          "data.map()",
        ]

        for (let i = 0; i < 15; i++) {
          const element = document.createElement("div")
          element.className = "absolute text-primary/20 font-mono text-sm pointer-events-none select-none animate-pulse"
          element.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          element.style.left = Math.random() * 100 + "%"
          element.style.top = Math.random() * 100 + "%"
          element.style.animationDelay = Math.random() * 3 + "s"
          element.style.animationDuration = Math.random() * 2 + 2 + "s"

          container.appendChild(element)
        }
      } else if (variant === "circuit") {
        // Create circuit-like lines
        for (let i = 0; i < 20; i++) {
          const line = document.createElement("div")
          line.className = "absolute bg-gradient-to-r from-transparent via-secondary/20 to-transparent"

          if (Math.random() > 0.5) {
            // Horizontal lines
            line.style.width = Math.random() * 200 + 100 + "px"
            line.style.height = "1px"
            line.style.left = Math.random() * 80 + "%"
            line.style.top = Math.random() * 100 + "%"
          } else {
            // Vertical lines
            line.style.width = "1px"
            line.style.height = Math.random() * 200 + 100 + "px"
            line.style.left = Math.random() * 100 + "%"
            line.style.top = Math.random() * 80 + "%"
          }

          container.appendChild(line)
        }

        // Add circuit nodes
        for (let i = 0; i < 10; i++) {
          const node = document.createElement("div")
          node.className = "absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
          node.style.left = Math.random() * 100 + "%"
          node.style.top = Math.random() * 100 + "%"
          node.style.animationDelay = Math.random() * 2 + "s"

          container.appendChild(node)
        }
      } else if (variant === "data") {
        // Create data stream effect
        for (let i = 0; i < 25; i++) {
          const dataPoint = document.createElement("div")
          dataPoint.className = "absolute text-secondary/20 font-mono text-xs pointer-events-none animate-pulse"
          dataPoint.textContent = Math.random().toString(36).substring(2, 8)
          dataPoint.style.left = Math.random() * 100 + "%"
          dataPoint.style.top = Math.random() * 100 + "%"
          dataPoint.style.animationDelay = Math.random() * 4 + "s"

          container.appendChild(dataPoint)
        }
      }
    }

    createElements()

    // Recreate elements periodically for dynamic effect
    const interval = setInterval(createElements, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [variant])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-40" />
}
