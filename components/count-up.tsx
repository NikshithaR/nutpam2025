"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CountUp({ end, duration = 2000, className = "", prefix = "", suffix = "" }: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return

    const element = countRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCount()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    const animateCount = () => {
      setHasAnimated(true)
      const startTime = Date.now()
      const startValue = 0

      const updateCount = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(startValue + (end - startValue) * easeOut)

        element.textContent = `${prefix}${currentValue}${suffix}`

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          element.textContent = `${prefix}${end}${suffix}`
        }
      }

      updateCount()
    }

    return () => {
      observer.disconnect()
    }
  }, [end, duration, prefix, suffix, hasAnimated])

  return (
    <span ref={countRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
