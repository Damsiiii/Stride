"use client"

import { ArrowUp } from "lucide-react"

export default function Footer() {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-[#070707] border-t border-white/[0.08] text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-4">
            <img
              src={`${baseUrl}/images/stride-logo-dark.jpeg`}
              alt="Stride Run Club"
              className="h-12 w-12 rounded-full border border-white/20 object-cover"
            />
            <div>
              <span className="block text-lg font-black tracking-widest text-white">
                STRIDE <span className="text-[#D6FF57]">RUN CLUB</span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                KURUNEGALA • SRI LANKA
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="#about"
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 transition-colors hover:text-white uppercase"
            >
              ABOUT
            </a>
            <a
              href="#runs"
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 transition-colors hover:text-white uppercase"
            >
              RUNS
            </a>
            <a
              href="#gallery"
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 transition-colors hover:text-white uppercase"
            >
              GALLERY
            </a>
            <a
              href="#contact"
              className="text-[11px] font-bold tracking-[0.2em] text-white/40 transition-colors hover:text-white uppercase"
            >
              JOIN US
            </a>
          </div>
        </div>

        {/* Editorial Tagline & Back to Top */}
        <div className="py-12 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D6FF57] uppercase block mb-2">
              // MOTTO
            </span>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white/90 leading-tight">
              NEVER RUN ALONE.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="self-start md:self-auto flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] font-mono tracking-widest text-white/60 transition-all hover:border-[#D6FF57] hover:bg-[#D6FF57] hover:text-black cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-white/30 uppercase">
          <p>© {new Date().getFullYear()} STRIDE RUN CLUB. ALL RIGHTS RESERVED.</p>
          <p>ETHAGALA RIDGES • 7.4863° N, 80.3623° E</p>
        </div>
      </div>
    </footer>
  )
}
