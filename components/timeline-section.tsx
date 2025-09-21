"use client"

import { HackathonBackground } from "./hackathon-background"
import { StepperTimeline } from "./stepper-timeline"

export function TimelineSection() {
  return (
    <section id="timeline" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95" />
      <HackathonBackground variant="circuit" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern h-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <StepperTimeline />
      </div>
    </section>
  )
}
