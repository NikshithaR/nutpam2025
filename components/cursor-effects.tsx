"use client"

import { useEffect, useRef, useState } from "react"

export function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sparkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)

    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      createClickSpark(mousePosition.x, mousePosition.y)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [mousePosition.x, mousePosition.y, isMobile])

  const createClickSpark = (x: number, y: number) => {
    const spark = document.createElement("div")
    spark.className = "fixed pointer-events-none z-50"
    spark.style.left = x + "px"
    spark.style.top = y + "px"
    spark.innerHTML = `
      <div class="relative">
        ${Array.from(
          { length: 8 },
          (_, i) => `
          <div class="absolute w-1 h-1 bg-primary rounded-full animate-ping"
               style="
                 transform: rotate(${i * 45}deg) translateX(20px);
                 animation-delay: ${i * 0.1}s;
                 animation-duration: 0.6s;
               "></div>
        `,
        ).join("")}
      </div>
    `

    document.body.appendChild(spark)

    setTimeout(() => {
      if (document.body.contains(spark)) {
        document.body.removeChild(spark)
      }
    }, 1000)
  }

  if (isMobile) return null

  return (
    <>
      {/* Crosshair Cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="w-5 h-5 border border-primary rounded-full opacity-60" />
        <div className="absolute top-1/2 left-1/2 w-3 h-px bg-primary transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-px h-3 bg-primary transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Target Cursor */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transition: "all 0.2s ease-out",
          transform: isClicking ? "scale(0.8)" : "scale(1)",
        }}
      >
        <div className="w-10 h-10 border-2 border-secondary/30 rounded-full animate-pulse" />
      </div>
    </>
  )
}
