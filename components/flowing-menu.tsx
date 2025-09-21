"use client"

import type React from "react"

import { useState } from "react"

interface FlowingMenuProps {
  items: Array<{
    label: string
    href: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function FlowingMenu({ items, className = "" }: FlowingMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={`relative px-4 py-2 rounded-lg transition-all duration-300 ease-out ${
            hoveredIndex === index
              ? "bg-primary/20 text-primary scale-105"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </div>

          {/* Flowing background effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg transition-all duration-500 ${
              hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              background:
                hoveredIndex === index
                  ? "linear-gradient(45deg, rgba(125, 211, 252, 0.1), rgba(178, 140, 255, 0.1))"
                  : "transparent",
            }}
          />
        </a>
      ))}
    </nav>
  )
}
