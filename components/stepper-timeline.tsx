"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./language-context"
import { CountUp } from "./count-up"
import { VariableProximityText } from "./variable-proximity-text"

interface TimelineEvent {
  time: string
  title: string
  description: string
}

export function StepperTimeline() {
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  const eventsData = t("timeline.events")
  const events: TimelineEvent[] = Array.isArray(eventsData) ? eventsData : []

  useEffect(() => {
    if (hasAnimated || events.length === 0) return

    const element = timelineRef.current
    if (!element) return

    const animateSteps = () => {
      events.forEach((_, index) => {
        setTimeout(() => {
          setActiveStep(index)
        }, index * 800)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateSteps()
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [events, hasAnimated])

  if (events.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">Loading timeline...</p>
      </div>
    )
  }

  return (
    <div ref={timelineRef} className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
          <VariableProximityText className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("timeline.title")}
          </VariableProximityText>
        </h2>
        <p className="text-xl text-secondary font-mono">{t("timeline.subtitle")}</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary transform md:-translate-x-1/2" />

        {/* Timeline Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center transition-all duration-800 ${
                index <= activeStep ? "opacity-100 translate-y-0" : "opacity-30 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Node */}
              <div
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 transform md:-translate-x-1/2 transition-all duration-500 ${
                  index <= activeStep
                    ? "bg-primary border-primary glow-blue scale-125"
                    : "bg-background border-muted-foreground"
                }`}
              />

              {/* Event Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-gradient-to-r from-primary to-secondary text-background px-3 py-1 rounded-full font-mono text-sm font-bold">
                      <CountUp end={Number.parseInt(event.time.split(":")[0])} duration={1000} suffix=":00" />
                    </div>
                    <h3 className="text-xl font-orbitron font-bold text-primary">{event.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
