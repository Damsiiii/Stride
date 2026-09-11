"use client"
import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

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
      setIsPlaying(false)
    }
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-start overflow-hidden bg-[#0f1416]">
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
            className="w-full h-full object-cover object-center"
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
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
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

        {/* 2. Visual Contrast Layer: Vignette + Multi-stop Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#0f1416]/95 backdrop-brightness-[0.88]"
          aria-hidden="true"
        />
      </div>


      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img
            src={`${baseUrl}/images/stride-logo-dark.jpeg`}
            alt="Stride Run Club Logo"
            className="h-11 w-11 rounded-full border border-white/20 object-cover shadow-lg"
          />
          <span className="font-extrabold text-xl text-white tracking-wider">
            STRIDE <span className="text-[#e25822]">RUN CLUB</span>
          </span>
        </div>

        {/* Kurunegala • Sri Lanka pill (as in screenshot 3) */}
        <span className="text-xs font-semibold text-white/90 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-sm hidden sm:inline-block">
          KURUNEGALA • SRI LANKA
        </span>
      </header>

      {/* Foreground Hero Content (Left-Aligned as in example layout) */}
      <div className="relative z-20 max-w-4xl px-6 md:px-16 lg:px-24 text-left text-white pt-24 sm:pt-16 pb-12 w-full">
        {/* Headline */}
        <h1 className="text-left font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.06] mb-6 drop-shadow-md">
          FIND YOUR STRIDE UNDER ELEPHANT ROCK
        </h1>

        {/* Subtitle (Left-aligned as in example) */}
        <p className="mb-8 max-w-2xl text-left font-normal text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow">
          Kurunegala's premier running community. Connecting runners of all levels around the lake, Ethagala trails, and scenic North Western routes.
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-start pt-2">
          <button className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#e25822] px-9 py-3.5 text-base font-bold text-white shadow-lg shadow-[#e25822]/35 transition-all duration-300 hover:bg-[#ea622b] hover:scale-[1.02] hover:shadow-[#e25822]/50 active:scale-95">
            Get Started
          </button>
        </div>
      </div>

      {/* Subtle Video Play/Pause Motion Accessibility Control */}
      {!prefersReducedMotion && isVideoLoaded && (
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-6 z-30 flex items-center justify-center p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer shadow-lg"
          title={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      )}
    </section>
  )
}
