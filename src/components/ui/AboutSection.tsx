"use client"

import { motion } from "framer-motion"
import { Users, Compass, Zap, Heart, ArrowRight, ShieldCheck } from "lucide-react"

export default function AboutSection() {
  const pillars = [
    {
      icon: Users,
      title: "All Paces Welcome",
      desc: "From conversational 6:30/km joggers to competitive pacers. Nobody runs alone.",
    },
    {
      icon: Compass,
      title: "Scenic City Routes",
      desc: "Kurunegala Lake loops, Ethagala ridges, and green rural stretches off the beaten track.",
    },
    {
      icon: Zap,
      title: "Zero Ego Culture",
      desc: "We start together, we finish together. Supportive pacing and encouragement at every mile.",
    },
    {
      icon: Heart,
      title: "Community First",
      desc: "100% free to join forever. Hydration, banter, and post-run morning coffee always included.",
    },
  ]

  return (
    <section id="about" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      {/* Background subtle radial glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D6FF57]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D6FF57]" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                ABOUT STRIDE
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white">
              WE RUN
              <br />
              <span className="text-white">TOGETHER.</span>
            </h2>

            <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-white/60">
              Founded under the towering shadow of Ethagala (Elephant Rock), Stride Run Club was born out of a simple desire: to bring the runners of Kurunegala together onto shared roads and trails.
            </p>

            <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-white/60">
              Whether you are training for your debut half-marathon or looking to run your very first laps around the serene lake, you will find encouragement, rhythm, and belonging here. No fees. No gatekeeping. Just your shoes and the morning breeze.
            </p>

            {/* Club Commitment Badge */}
            <div className="mt-2 border border-white/[0.08] bg-white/[0.02] p-5 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6FF57]/10 text-[#D6FF57]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Open Community • Free Forever
                </span>
                <span className="text-[11px] text-white/50 leading-relaxed mt-0.5">
                  No subscription, membership dues, or prerequisites. Just check our timetable and turn up.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#runs"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D6FF57] uppercase hover:underline"
              >
                <span>View Weekly Running Schedule</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Core Pillars / Ethos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between border border-white/[0.08] bg-white/[0.02] p-8 sm:p-9 transition-all duration-300 hover:border-[#D6FF57]/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-[#D6FF57] group-hover:border-[#D6FF57]/30 group-hover:bg-[#D6FF57]/10 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-[#D6FF57] transition-colors" />
                    </div>

                    <div className="my-5">
                      <h3 className="text-[15px] sm:text-[16px] font-bold tracking-tight text-white uppercase group-hover:text-[#D6FF57] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-white/50 font-light leading-relaxed mt-2.5">
                        {item.desc}
                      </p>
                    </div>

                    <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-[10px] font-mono tracking-widest text-white/30 uppercase">
                      <span>CORE PILLAR</span>
                      <span className="group-hover:text-[#D6FF57] transition-colors">STRIDE</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Editorial quote block below pillars */}
            <div className="mt-4 border border-white/[0.08] bg-black/40 p-6 sm:p-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] md:text-[14px] font-mono uppercase tracking-[0.15em] text-white/70">
                  "THE HARDEST PART IS TYING YOUR LACES. WE HANDLE THE REST."
                </p>
                <span className="text-[11px] text-[#D6FF57] font-semibold tracking-wider uppercase mt-1 block">
                  — Stride Crew Captain
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
