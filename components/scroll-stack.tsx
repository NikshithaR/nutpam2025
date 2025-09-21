"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollStackProps {
  children: React.ReactNode
  className?: string
  threshold?: number
}

export function ScrollStack({ children, className = "", threshold = 0.1 }: ScrollStackProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
    >
      {children}
    </div>
  )
}
