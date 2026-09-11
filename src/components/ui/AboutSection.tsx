"use client"

import { motion } from "framer-motion"
import { Users, Compass, Zap, Heart } from "lucide-react"

export default function AboutSection() {
  const stats = [
    { number: "120+", label: "Active Members", desc: "Runners across Kurunegala" },
    { number: "4", label: "Weekly Sessions", desc: "Intervals, tempos & long runs" },
    { number: "15K+", label: "KM Logged Monthly", desc: "Covering city roads & trails" },
    { number: "2023", label: "Est. Year", desc: "Founded under Elephant Rock" },
  ]

  const pillars = [
    { icon: Users, title: "All Paces Welcome", desc: "From casual 6:30/km joggers to 3:45/km pacers." },
    { icon: Compass, title: "Scenic City Routes", desc: "Kurunegala Lake loops, Ethagala ridges, and green rural stretches." },
    { icon: Zap, title: "Zero Ego Culture", desc: "We start together, we finish together. Nobody runs alone." },
    { icon: Heart, title: "Community First", desc: "Free to join forever. Hydration, banter, and post-run coffee included." },
  ]

  return (
    <section id="about" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden text-left">
      {/* Background subtle radial glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D6FF57]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl px-6 md:px-12 lg:px-16 text-left">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start text-left">
          {/* Left Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D6FF57]" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                ABOUT STRIDE
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white text-left">
              WE RUN
              <br />
              <span className="text-white">TOGETHER.</span>
            </h2>

            <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-white/60 text-left">
              Founded in 2023 under the towering shadow of Ethagala (Elephant Rock), Stride Run Club was born out of a simple desire: to bring the runners of Kurunegala together onto shared roads and trails.
            </p>

            <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-white/60 text-left">
              Whether you are training for your debut half-marathon or looking to run your very first 5K around the serene lake, you will find encouragement, rhythm, and belonging here. No fees. No gatekeeping. Just your shoes and the morning breeze.
            </p>

            {/* Micro Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
              {pillars.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-1.5 border-l border-white/10 pl-3.5 py-1 text-left"
                  >
                    <div className="flex items-center gap-2 text-white text-[13px] font-bold">
                      <Icon className="h-3.5 w-3.5 text-[#D6FF57]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed text-left">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Key Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 transition-all duration-300 hover:border-[#D6FF57]/40 hover:bg-white/[0.04] text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-white/30">
                      0{idx + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#D6FF57] transition-colors" />
                  </div>

                  <div className="my-6 text-left">
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#D6FF57] tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
                      {stat.number}
                    </div>
                    <div className="text-[12px] font-bold tracking-[0.2em] text-white/70 uppercase mt-2">
                      {stat.label}
                    </div>
                  </div>

                  <p className="text-[12px] text-white/40 font-light border-t border-white/[0.06] pt-3 text-left">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Editorial quote block below stats */}
            <div className="mt-4 border border-white/[0.08] bg-black/40 p-6 sm:p-8 flex flex-col items-start gap-2 text-left">
              <p className="text-[13px] md:text-[14px] font-mono uppercase tracking-[0.15em] text-white/70 text-left">
                "THE HARDEST PART IS TYING YOUR LACES. WE HANDLE THE REST."
              </p>
              <span className="text-[11px] text-[#D6FF57] font-semibold tracking-wider uppercase">
                — Stride Crew Captain
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
