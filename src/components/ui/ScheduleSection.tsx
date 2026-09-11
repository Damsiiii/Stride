"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, ArrowRight, Activity, Calendar } from "lucide-react"

interface RunEvent {
  day: string
  title: string
  location: string
  time: string
  distance: string
  intensity: "Easy" | "Moderate" | "Challenging"
  paceGroups: string
  note: string
}

export default function ScheduleSection() {
  const [selectedRun, setSelectedRun] = useState<number | null>(null)

  const runs: RunEvent[] = [
    {
      day: "TUESDAY",
      title: "LAKE LOOP TEMPO",
      location: "Kurunegala Lake Round (East Pavilion)",
      time: "5:30 AM",
      distance: "5KM / 10KM",
      intensity: "Moderate",
      paceGroups: "5:15 / 6:00 / 7:00 min/km",
      note: "Continuous rhythm run with structured warm-up strides.",
    },
    {
      day: "THURSDAY",
      title: "ETHAGALA TRAIL CLIMB",
      location: "Elephant Rock Foothills / Clock Tower",
      time: "5:00 AM",
      distance: "6KM - 8KM",
      intensity: "Challenging",
      paceGroups: "Hill repeats & power hiking segments",
      note: "Elevation conditioning with stunning panoramic sunrise views.",
    },
    {
      day: "SATURDAY",
      title: "COMMUNITY LONG RUN",
      location: "Lake Promenade → North Western Circuit",
      time: "5:00 AM",
      distance: "12KM / 16KM / 21KM",
      intensity: "Moderate",
      paceGroups: "Multiple pace pacers + sweeper runner",
      note: "Supported long run with volunteer hydration points every 4km.",
    },
    {
      day: "SUNDAY",
      title: "RECOVERY JOG & COFFEE",
      location: "Lake Round Coffee Corner",
      time: "6:00 AM",
      distance: "5KM EASY",
      intensity: "Easy",
      paceGroups: "All runners stay strictly conversational",
      note: "Low heart rate jog followed by iced filter brews and breakfast chats.",
    },
  ]

  const getIntensityBadge = (intensity: RunEvent["intensity"]) => {
    switch (intensity) {
      case "Easy":
        return "text-[#D6FF57] border-[#D6FF57]/30 bg-[#D6FF57]/10"
      case "Moderate":
        return "text-white border-white/20 bg-white/5"
      case "Challenging":
        return "text-[#D6FF57] border-[#D6FF57]/40 bg-[#D6FF57]/15"
    }
  }

  return (
    <section id="runs" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D6FF57]" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                TIMETABLE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white">
              WEEKLY RUNS
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[13px] md:text-[14px] text-white/50 leading-relaxed font-light">
              We gather before sunrise. Bag drop and hydration available at all starting points. Never miss a session by joining our WhatsApp briefing group.
            </p>
          </div>
        </div>

        {/* Schedule List */}
        <div className="divide-y divide-white/[0.08]">
          {runs.map((run, index) => {
            const isExpanded = selectedRun === index
            return (
              <motion.div
                key={run.day}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedRun(isExpanded ? null : index)}
                className="group cursor-pointer py-8 transition-colors duration-200 hover:bg-white/[0.02] px-2 sm:px-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Day & Title */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 lg:w-1/2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase w-28">
                        {run.day}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#D6FF57] transition-colors">
                        {run.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[12px] text-white/40">
                        <MapPin className="h-3.5 w-3.5 text-white/30" />
                        <span>{run.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Time, Distance & Action */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 lg:w-1/2">
                    <div className="flex items-center gap-4">
                      {/* Time pill */}
                      <div className="flex items-center gap-1.5 text-[12px] font-mono text-white/70">
                        <Clock className="h-3.5 w-3.5 text-[#D6FF57]" />
                        <span>{run.time}</span>
                      </div>

                      {/* Distance badge */}
                      <div className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                        {run.distance}
                      </div>

                      {/* Intensity badge */}
                      <span
                        className={`hidden sm:inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase ${getIntensityBadge(
                          run.intensity
                        )}`}
                      >
                        {run.intensity}
                      </span>
                    </div>

                    {/* Arrow action */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#D6FF57] group-hover:bg-[#D6FF57] group-hover:text-black text-white/50">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details on Click */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-[fade-in-up_0.2s_ease-out]">
                    <div className="flex items-start gap-2 text-white/70">
                      <Activity className="h-4 w-4 text-[#D6FF57] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white uppercase">Pace Groups: </span>
                        <span>{run.paceGroups}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-white/50">
                      <Calendar className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                      <span>{run.note}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 rounded-none border border-white/[0.08] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D6FF57] animate-pulse" />
            <span className="text-xs tracking-wider text-white/70 uppercase">
              Rain or Shine — Runs only adjust during severe thunderstorms.
            </span>
          </div>
          <a
            href="#contact"
            className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#D6FF57] hover:underline"
          >
            Join WhatsApp Briefings →
          </a>
        </div>
      </div>
    </section>
  )
}
