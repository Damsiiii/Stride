"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface RunEvent {
  day: string
  title: string
  location: string
  time: string
  distance: string
}

export default function ScheduleSection() {
  const [hoveredRun, setHoveredRun] = useState<number | null>(null)

  const runs: RunEvent[] = [
    {
      day: "Tuesday",
      title: "Lake Loop Tempo",
      location: "Kurunegala Lake Round",
      time: "5:30 AM",
      distance: "5 – 10 km",
    },
    {
      day: "Thursday",
      title: "Ethagala Trail Climb",
      location: "Elephant Rock Foothills",
      time: "5:00 AM",
      distance: "6 – 8 km",
    },
    {
      day: "Saturday",
      title: "Community Long Run",
      location: "North Western Circuit",
      time: "5:00 AM",
      distance: "12 – 21 km",
    },
    {
      day: "Sunday",
      title: "Recovery Jog & Coffee",
      location: "Lake Promenade",
      time: "6:00 AM",
      distance: "5 km easy",
    },
  ]

  return (
    <section id="runs" className="relative w-full bg-[#F5F3EF] py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] text-[#1A1A1A]/40 uppercase mb-4">
              Weekly Schedule
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl leading-[1] tracking-[-0.02em]">
              When we run
            </h2>
          </div>

          <p className="max-w-sm text-[14px] text-[#1A1A1A]/45 font-light leading-[1.7]">
            We gather before sunrise. Bag drop and hydration at all starting points.
            Rain or shine — runs only pause during severe storms.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-[#1A1A1A]" />

        {/* Run List */}
        <div className="divide-y divide-[#1A1A1A]/10">
          {runs.map((run, index) => (
            <motion.div
              key={run.day}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onMouseEnter={() => setHoveredRun(index)}
              onMouseLeave={() => setHoveredRun(null)}
              className="group cursor-default py-7 md:py-8 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Day */}
                <div className="md:w-36 shrink-0">
                  <span className="text-[13px] font-medium tracking-[0.08em] text-[#1A1A1A]/40 uppercase">
                    {run.day}
                  </span>
                </div>

                {/* Center: Title + Location */}
                <div className="flex-1">
                  <h3 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-[#1A1A1A] group-hover:text-[#6B8F63] transition-colors duration-300">
                    {run.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#1A1A1A]/40 font-light">
                    {run.location}
                  </p>
                </div>

                {/* Right: Time + Distance */}
                <div className="flex items-center gap-8 md:gap-10">
                  <div className="text-right">
                    <span className="text-[13px] font-medium text-[#1A1A1A]/70">
                      {run.time}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-light text-[#1A1A1A]/40">
                      {run.distance}
                    </span>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                      hoveredRun === index
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                        : "border-[#1A1A1A]/15 text-[#1A1A1A]/30"
                    }`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="h-px w-full bg-[#1A1A1A]" />

        {/* Bottom Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] text-[#1A1A1A]/40 font-light">
            All sessions are free and open to every pace level.
          </p>
          <a
            href="#contact"
            className="text-[12px] font-medium tracking-[0.06em] text-[#1A1A1A] hover:text-[#6B8F63] transition-colors underline underline-offset-4 decoration-[#1A1A1A]/20"
          >
            Join our WhatsApp briefings →
          </a>
        </div>
      </div>
    </section>
  )
}
