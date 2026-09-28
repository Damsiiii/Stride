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
    }
    setIsPlaying(!videoRef.current.paused)
  }

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* 1. Full-bleed Background Video & Poster Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Poster Image */}
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

        {/* Background Video */}
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

        {/* 2. Warm dark overlay — softer than pure black */}
        <div
          className="absolute inset-0 bg-black/50 pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Center-Aligned Headline Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl">
        {/* Main Headline — Serif Editorial */}
        <h1 className="font-[family-name:var(--font-serif)] text-white text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[100px] xl:text-[120px] leading-[0.9] tracking-[-0.02em] select-none">
          Find Your Stride
        </h1>

        {/* Italic Subtitle */}
        <p className="mt-4 md:mt-6 font-[family-name:var(--font-serif)] italic text-white/70 text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] tracking-[0.02em]">
          run smooth, never alone
        </p>

        {/* Thin Divider */}
        <div className="mt-8 w-12 h-px bg-white/30" aria-hidden="true" />

        {/* Location Tag */}
        <p className="mt-6 text-[11px] sm:text-[12px] font-medium tracking-[0.2em] text-white/40 uppercase">
          Kurunegala · Sri Lanka
        </p>
      </div>

      {/* Video Play/Pause — Bottom-Right Corner */}
      {!prefersReducedMotion && isVideoLoaded && (
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 text-white/50 backdrop-blur-md transition-all hover:bg-black/50 hover:text-white/80 cursor-pointer"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          <span className="text-[9px] tracking-widest uppercase">
            {isPlaying ? "Pause" : "Play"}
          </span>
        </button>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/60" />
      </div>
    </section>
  )
}
