"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, ArrowRight } from "lucide-react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "")

  // Listen to prefers-reduced-motion media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Sync play/pause state with video element
  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
    }
    setIsPlaying(!videoRef.current.paused)
  }

  const marqueeText =
    "STRIDE RUN CLUB • KURUNEGALA • SRI LANKA • ELEPHANT ROCK TRAILS • EVERY TUESDAY, THURSDAY & WEEKEND • JOIN THE PACK • "

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#070707] pt-[72px]">
      {/* 1. Full-bleed Background Video & Poster Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Instant Poster Image (Zero CLS, renders immediately before video starts) */}
        <picture
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            isVideoLoaded && !prefersReducedMotion ? "opacity-0" : "opacity-100"
          }`}
        >
          <source
            media="(max-width: 768px)"
            srcSet={`${baseUrl}/videos/hero-poster-mobile.webp`}
            type="image/webp"
          />
          <source
            media="(max-width: 768px)"
            srcSet={`${baseUrl}/videos/hero-poster-mobile.jpg`}
            type="image/jpeg"
          />
          <source
            srcSet={`${baseUrl}/videos/hero-poster.webp`}
            type="image/webp"
          />
          <img
            src={`${baseUrl}/videos/hero-poster.jpg`}
            alt="Stride Run Club runners in Kurunegala"
            className="w-full h-full object-cover object-center scale-[1.02]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Responsive Background Video (Auto-disabled if reduced-motion preferred) */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setIsVideoLoaded(true)}
            poster={`${baseUrl}/videos/hero-poster.webp`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 scale-[1.02] ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Desktop sources (min-width: 769px) */}
            <source
              media="(min-width: 769px)"
              src={`${baseUrl}/videos/hero-desktop.webm`}
              type="video/webm"
            />
            <source
              media="(min-width: 769px)"
              src={`${baseUrl}/videos/hero-desktop.mp4`}
              type="video/mp4"
            />

            {/* Mobile sources (max-width: 768px) */}
            <source
              media="(max-width: 768px)"
              src={`${baseUrl}/videos/hero-mobile.webm`}
              type="video/webm"
            />
            <source
              media="(max-width: 768px)"
              src={`${baseUrl}/videos/hero-mobile.mp4`}
              type="video/mp4"
            />
          </video>
        )}

        {/* 2. Visual Contrast Layers: Radial Vignette + Multi-stop Gradient */}
        <div
          className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_40%,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-[#070707] pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Subtle Film Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />
      </div>

      {/* Desktop Side Architectural Lines & Editorial Badges */}
      <div
        className="hidden lg:block absolute left-10 top-0 bottom-11 w-px bg-white/[0.08] pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="absolute top-28 -left-3 text-[10px] font-mono tracking-[0.25em] text-white/25 -rotate-90">
          01 // STRIDE
        </span>
      </div>
      <div
        className="hidden lg:block absolute right-10 top-0 bottom-11 w-px bg-white/[0.08] pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="absolute top-28 -right-8 text-[10px] font-mono tracking-[0.25em] text-white/25 rotate-90">
          7.4863° N, 80.3623° E
        </span>
      </div>

      {/* Main Center Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 md:px-14 lg:px-16">
        {/* Top Kicker / Badge */}
        <div className="mb-4 inline-flex items-center gap-2.5 self-start rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#D6FF57] animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-white/70 uppercase">
            CHAPTER 01 • EST. 2023
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="font-black text-white uppercase tracking-[-0.04em] leading-[0.85] text-[15vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[116px] xl:text-[130px] drop-shadow-2xl select-none">
          FIND YOUR
          <br />
          <span className="text-white relative inline-block">
            STRIDE
            <span className="inline-block text-[#D6FF57] ml-2 select-none">.</span>
          </span>
        </h1>

        {/* Secondary Subheading */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-[#D6FF57]" />
          <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-extrabold uppercase tracking-[0.25em] text-white/70">
            UNDER ELEPHANT ROCK
          </h2>
        </div>
      </div>

      {/* Bottom Information Row & CTA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-8 md:px-14 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-t border-white/[0.08] pt-6">
          {/* Left: Club Description & Get Started CTA */}
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="text-[13px] sm:text-[15px] font-light leading-[1.65] text-white/60">
              Kurunegala's premier running community. Connecting runners of all paces around the lake, Ethagala trails, and scenic North Western routes.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#runs"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D6FF57] px-8 py-3.5 text-[12px] font-black tracking-[0.14em] text-black uppercase transition-all duration-300 hover:bg-[#e0ff8a] hover:shadow-[0_0_20px_rgba(214,255,87,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>EXPLORE RUNS</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[12px] font-bold tracking-[0.14em] text-white/80 uppercase backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white cursor-pointer"
              >
                OUR STORY
              </a>
            </div>
          </div>

          {/* Right: Scroll Indicator & Video Controls */}
          <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
            {/* Video Play/Pause Motion Accessibility Control */}
            {!prefersReducedMotion && isVideoLoaded && (
              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause background video" : "Play background video"}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 text-white/70 backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF57] cursor-pointer"
                title={isPlaying ? "Pause background video" : "Play background video"}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  {isPlaying ? "PAUSE" : "PLAY"}
                </span>
              </button>
            )}

            {/* Scroll Indicator (desktop) */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                SCROLL
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF57] animate-[pulse-dot_1.8s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Marquee Ticker at the Very Bottom */}
      <div className="relative z-20 h-11 w-full overflow-hidden border-t border-white/[0.08] bg-black/60 backdrop-blur-md flex items-center">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] select-none whitespace-nowrap">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-white/35 uppercase px-4">
            {marqueeText}
          </span>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-white/35 uppercase px-4" aria-hidden="true">
            {marqueeText}
          </span>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-white/35 uppercase px-4" aria-hidden="true">
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  )
}
