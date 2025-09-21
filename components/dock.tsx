"use client"

import type React from "react"

import { useState } from "react"

interface DockItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface DockProps {
  items: DockItem[]
  className?: string
}

export function Dock({ items, className = "" }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={`flex items-end gap-2 p-4 bg-card/20 backdrop-blur-sm rounded-2xl border border-border ${className}`}
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 transition-all duration-300 hover:scale-125 hover:glow-blue ${
            hoveredIndex === index ? "scale-125 glow-blue" : ""
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {item.icon}

          {/* Tooltip */}
          <div
            className={`absolute bottom-full mb-2 px-2 py-1 bg-background border border-border rounded text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {item.label}
          </div>
        </a>
      ))}
    </div>
  )
}
