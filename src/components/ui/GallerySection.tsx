"use client"

import { motion } from "framer-motion"
import { MapPin, Compass, Mountain, Flame, Route, Coffee, Droplets, Trophy } from "lucide-react"

interface GalleryItem {
  title: string
  subtitle: string
  location: string
  aspect: string
  tag: string
  distance: string
  elevation: string
  icon: typeof Mountain
  accentColor?: string
}

export default function GallerySection() {
  const items: GalleryItem[] = [
    {
      title: "DAWN PATROL OVER KURUNEGALA LAKE",
      subtitle: "First light hitting the water at 5:45 AM",
      location: "Kurunegala Lake Round",
      aspect: "aspect-[3/4]",
      tag: "TEMPO TUESDAY",
      distance: "5.2 KM",
      elevation: "+12M",
      icon: Route,
    },
    {
      title: "CONQUERING ETHAGALA ELEVATION",
      subtitle: "Legs burning, mist clearing over the city",
      location: "Elephant Rock Ridge",
      aspect: "aspect-square",
      tag: "TRAIL INTERVALS",
      distance: "8.5 KM",
      elevation: "+340M",
      icon: Mountain,
    },
    {
      title: "PACK FORMATION IN UNISON",
      subtitle: "Saturday 21K long-run crew pacing strong",
      location: "North Western Circuit",
      aspect: "aspect-[4/3]",
      tag: "COMMUNITY 21K",
      distance: "21.1 KM",
      elevation: "+85M",
      icon: Trophy,
    },
    {
      title: "POST-RUN COOL DOWN & HIGH FIVES",
      subtitle: "Hydration and smiles after the final sprint",
      location: "Lake Promenade",
      aspect: "aspect-square",
      tag: "POST RUN",
      distance: "RECOVERY",
      elevation: "ZONE 1",
      icon: Flame,
    },
    {
      title: "RAIN OR SHINE — NO DAYS OFF",
      subtitle: "Monsoon morning miles hitting the asphalt",
      location: "Wathhimi Road",
      aspect: "aspect-[3/4]",
      tag: "ENDURANCE",
      distance: "10.0 KM",
      elevation: "+45M",
      icon: Droplets,
    },
    {
      title: "BREW CLUB SHAKEDOWN",
      subtitle: "Filter roast coffee and weekend recovery stories",
      location: "Local Roastery Corner",
      aspect: "aspect-[4/3]",
      tag: "SUNDAY COFFEE",
      distance: "5.0 KM",
      elevation: "SOCIAL",
      icon: Coffee,
    },
  ]

  return (
    <section id="gallery" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D6FF57]" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                ROUTE ARCHIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white">
              SESSIONS & CIRCUITS
            </h2>
          </div>

          <div className="flex items-center gap-4 text-white/50 text-xs">
            <Route className="h-4 w-4 text-[#D6FF57]" />
            <span className="tracking-wider uppercase">Verified Kurunegala Run Formats</span>
          </div>
        </div>

        {/* Gallery / Route Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group relative overflow-hidden border border-white/[0.08] bg-[#0c0c0c] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#D6FF57]/40 hover:bg-[#111111] ${item.aspect}`}
              >
                {/* Background Subtle Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Bar: Tag & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[9px] font-mono tracking-widest text-[#D6FF57] backdrop-blur-md uppercase">
                    {item.tag}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#D6FF57] group-hover:border-[#D6FF57]/40 group-hover:bg-[#D6FF57]/10 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Center Route Graphic / Badges */}
                <div className="relative z-10 my-6 flex items-center justify-between border-y border-white/[0.06] py-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest text-white/35 uppercase">DISTANCE</span>
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">{item.distance}</span>
                  </div>
                  <div className="h-8 w-px bg-white/[0.08]" />
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-mono tracking-widest text-white/35 uppercase">ELEVATION</span>
                    <span className="text-xl sm:text-2xl font-black text-[#D6FF57] tracking-tight">{item.elevation}</span>
                  </div>
                </div>

                {/* Bottom Details & Caption */}
                <div className="relative z-10 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#D6FF57] font-mono tracking-wider uppercase mb-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white uppercase leading-snug group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/50 font-light line-clamp-2 group-hover:text-white/80 transition-colors">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Strava / Community Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border border-white/[0.08] bg-white/[0.02] p-6 gap-4">
          <div className="flex items-center gap-3">
            <Compass className="h-4 w-4 text-[#D6FF57]" />
            <span className="text-xs tracking-wider text-white/70 uppercase">
              Tag <span className="text-[#D6FF57] font-bold">#StrideRunClub</span> on Instagram or Strava to get featured in our weekly dispatch.
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-white/30 uppercase">
            @STRIDERUNCLUB
          </span>
        </div>
      </div>
    </section>
  )
}
