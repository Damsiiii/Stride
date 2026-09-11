"use client"

import { motion } from "framer-motion"
import { Camera, MapPin, Compass } from "lucide-react"

interface GalleryItem {
  title: string
  subtitle: string
  location: string
  aspect: string
  tag: string
  imageUrl: string
}

export default function GallerySection() {
  const items: GalleryItem[] = [
    {
      title: "DAWN PATROL OVER KURUNEGALA LAKE",
      subtitle: "First light hitting the water at 5:45 AM",
      location: "Kurunegala Lake Round",
      aspect: "aspect-[3/4]",
      tag: "TEMPO TUESDAY",
      imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "CONQUERING ETHAGALA ELEVATION",
      subtitle: "Legs burning, mist clearing over the city",
      location: "Elephant Rock Ridge",
      aspect: "aspect-square",
      tag: "TRAIL INTERVALS",
      imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "PACK FORMATION IN UNISON",
      subtitle: "Saturday 21K long-run crew pacing strong",
      location: "North Western Circuit",
      aspect: "aspect-[4/3]",
      tag: "COMMUNITY 21K",
      imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "POST-RUN COOL DOWN & HIGH FIVES",
      subtitle: "Hydration and smiles after the final sprint",
      location: "Lake Promenade",
      aspect: "aspect-square",
      tag: "POST RUN",
      imageUrl: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "RAIN OR SHINE — NO DAYS OFF",
      subtitle: "Monsoon morning miles hitting the asphalt",
      location: "Wathhimi Road",
      aspect: "aspect-[3/4]",
      tag: "ENDURANCE",
      imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "BREW CLUB SHAKEDOWN",
      subtitle: "Filter roast coffee and weekend recovery stories",
      location: "Local Roastery Corner",
      aspect: "aspect-[4/3]",
      tag: "SUNDAY COFFEE",
      imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1000&auto=format&fit=crop",
    },
  ]

  return (
    <section id="gallery" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08] text-left">
      <div className="w-full max-w-7xl px-6 md:px-12 lg:px-16 text-left">
        {/* Header Block - Left Aligned */}
        <div className="flex flex-col items-start text-left gap-4 pb-12 border-b border-white/[0.08] max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D6FF57]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
              GALLERY ARCHIVE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white text-left">
            MOMENTS ON THE ROAD
          </h2>
          <div className="flex items-center gap-2.5 text-white/50 text-xs">
            <Camera className="h-4 w-4 text-[#D6FF57]" />
            <span className="tracking-wider uppercase">Captured during our 2023 - 2024 seasons</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 text-left">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group relative overflow-hidden border border-white/[0.08] bg-[#111111] ${item.aspect} text-left`}
            >
              {/* Image with zoom on hover */}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover object-center grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] font-mono tracking-widest text-[#D6FF57] backdrop-blur-md uppercase">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Details & Caption - Left Aligned */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left items-start">
                <div className="flex items-center gap-1.5 text-[11px] text-[#D6FF57] font-mono tracking-wider uppercase mb-1.5 text-left">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg font-black tracking-tight text-white uppercase leading-snug text-left">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-white/50 font-light line-clamp-1 group-hover:text-white/80 transition-colors text-left">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strava / Community Banner - Left Aligned */}
        <div className="mt-12 flex flex-col sm:flex-row items-start justify-start border border-white/[0.08] bg-white/[0.02] p-6 gap-4 text-left">
          <div className="flex items-center gap-3">
            <Compass className="h-4 w-4 text-[#D6FF57]" />
            <span className="text-xs tracking-wider text-white/70 uppercase text-left">
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
