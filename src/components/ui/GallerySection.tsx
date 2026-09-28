"use client"

import { motion } from "framer-motion"

interface GalleryItem {
  src: string
  alt: string
  caption: string
  location: string
  aspect: string
}

export default function GallerySection() {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "")

  const items: GalleryItem[] = [
    {
      src: `${baseUrl}/images/gallery/dawn-lake.jpg`,
      alt: "Runners at dawn by Kurunegala Lake",
      caption: "Dawn Patrol",
      location: "Kurunegala Lake",
      aspect: "aspect-[3/4]",
    },
    {
      src: `${baseUrl}/images/gallery/trail-climb.jpg`,
      alt: "Trail runners ascending Ethagala ridge at sunrise",
      caption: "Ethagala Ascent",
      location: "Elephant Rock Trail",
      aspect: "aspect-[4/3]",
    },
    {
      src: `${baseUrl}/images/gallery/road-shoes.jpg`,
      alt: "Running shoes on wet road at dawn",
      caption: "Rain or Shine",
      location: "Watthimi Road",
      aspect: "aspect-square",
    },
    {
      src: `${baseUrl}/images/gallery/dawn-lake.jpg`,
      alt: "Morning runners by the lakeside path",
      caption: "Community Long Run",
      location: "North Western Circuit",
      aspect: "aspect-[4/3]",
    },
    {
      src: `${baseUrl}/images/gallery/trail-climb.jpg`,
      alt: "Pack formation on trail at golden hour",
      caption: "Pack Formation",
      location: "Ethagala Foothills",
      aspect: "aspect-[3/4]",
    },
    {
      src: `${baseUrl}/images/gallery/road-shoes.jpg`,
      alt: "Post run recovery and coffee",
      caption: "Recovery & Coffee",
      location: "Lake Promenade",
      aspect: "aspect-square",
    },
  ]

  return (
    <section id="gallery" className="relative w-full bg-[#E8E4DD] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
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
              Moments
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl leading-[1] tracking-[-0.02em]">
              On the road
            </h2>
          </div>

          <p className="max-w-xs text-[13px] text-[#1A1A1A]/40 font-light leading-[1.7]">
            Tag <span className="font-medium text-[#1A1A1A]/60">#StrideRunClub</span> on Instagram or Strava to get featured.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-[#1A1A1A] mb-10" />

        {/* Photo Grid — Asymmetric Magazine Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative break-inside-avoid overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className={`${item.aspect} overflow-hidden`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] filter contrast-[1.02] saturate-[0.9]"
                />
              </div>

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end">
                <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-[15px] font-medium tracking-tight">
                    {item.caption}
                  </p>
                  <p className="text-white/60 text-[11px] tracking-wider uppercase mt-1">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
