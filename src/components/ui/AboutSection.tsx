"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden">
      {/* Top warm section — Story intro */}
      <div className="bg-[#E8E4DD] py-24 md:py-36">
        <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Section Label */}
            <p className="text-[11px] tracking-[0.25em] text-[#1A1A1A]/40 uppercase mb-8">
              Our Story
            </p>

            {/* Editorial Headline */}
            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.02em]">
              We run together.
            </h2>

            {/* Thin Divider */}
            <div className="mx-auto mt-10 w-10 h-px bg-[#1A1A1A]/20" aria-hidden="true" />

            {/* Narrative Paragraphs */}
            <div className="mt-10 flex flex-col gap-6 text-[15px] md:text-[17px] leading-[1.8] text-[#1A1A1A]/65 font-light">
              <p>
                Founded under the towering shadow of Ethagala — the Elephant Rock — Stride was born
                from a simple desire: bring Kurunegala's runners onto shared roads and trails before
                the sun wakes the city.
              </p>
              <p>
                Whether you're training for your debut half-marathon or tying your laces for the very
                first time, you'll find rhythm, encouragement, and belonging here. We start together.
                We finish together. No fees. No ego. Just your shoes and the morning breeze.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed atmospheric divider — dark photo strip */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#1A1A1A] overflow-hidden">
        {/* We use a CSS gradient here to simulate an atmospheric dark band */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] via-[#1A1A1A] to-[#2a2a2a]"
          aria-hidden="true"
        />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />

        {/* Centered quote over the dark band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 flex h-full items-center justify-center px-6"
        >
          <blockquote className="text-center max-w-2xl">
            <p className="font-[family-name:var(--font-serif)] italic text-white/80 text-[22px] sm:text-[28px] md:text-[34px] leading-[1.3] tracking-[-0.01em]">
              "The hardest part is tying your laces. We handle the rest."
            </p>
            <footer className="mt-6 text-[11px] tracking-[0.2em] text-white/35 uppercase">
              — Stride Crew Captain
            </footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Pillars — clean warm cards below */}
      <div className="bg-[#E8E4DD] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1A1A1A]/10"
          >
            {[
              {
                title: "All Paces Welcome",
                desc: "From conversational 6:30/km joggers to competitive pacers. Nobody runs alone.",
              },
              {
                title: "Scenic City Routes",
                desc: "Kurunegala Lake loops, Ethagala ridges, and quiet green rural stretches off the beaten path.",
              },
              {
                title: "Zero Ego Culture",
                desc: "We start together, we finish together. Supportive pacing and encouragement at every mile.",
              },
              {
                title: "Free Forever",
                desc: "No subscription or membership dues. Just check our timetable and turn up. Coffee included.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#E8E4DD] p-10 md:p-14 flex flex-col gap-4 group hover:bg-[#E1DDD5] transition-colors duration-300"
              >
                <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-[#1A1A1A] group-hover:text-[#6B8F63] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#1A1A1A]/50 font-light leading-[1.7]">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
