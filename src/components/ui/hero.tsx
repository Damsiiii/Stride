"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Bell, Check, Flame, MapPin, Pause, Play, Sparkles } from "lucide-react"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setIsSubmitted(true)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#0b0f11] relative overflow-hidden flex flex-col justify-between font-sans selection:bg-[#e25822] selection:text-white"
    >
      {/* SVG Filters & Glow Effects */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="stride-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ff8c42" />
            <stop offset="70%" stopColor="#e25822" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 1. Full-bleed Background Video & Poster Layer (Preserved Performance Pipeline) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Instant High-Res Poster Image (Zero CLS) */}
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

        {/* Responsive Background Video (FastStart, No Audio, Sub-1MB Mobile, 4.5MB Desktop) */}
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

        {/* 2. Visual Contrast & Atmospheric Mesh Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#0b0f11]/95 backdrop-brightness-[0.85]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e25822]/15 via-transparent to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-10 size-full pointer-events-none" aria-hidden="true">
        <div className="grid w-full grid-cols-12 divide-x divide-white/10 h-full">
          <div className="col-span-1 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-4 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-1 h-full" />
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          className="flex items-center gap-3.5 group cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <img
            src={`${baseUrl}/images/stride-logo-dark.jpeg`}
            alt="Stride Run Club Logo"
            className="h-11 w-11 rounded-full border-2 border-white/20 object-cover shadow-xl group-hover:border-[#e25822] transition-colors duration-300"
          />
          <div className="flex flex-col">
            <span className="font-black text-xl text-white tracking-widest uppercase leading-none">
              STRIDE <span className="text-[#e25822]">RUN CLUB</span>
            </span>
            <span className="text-[10px] font-bold text-white/60 tracking-[0.25em] uppercase mt-0.5">
              Kurunegala • Sri Lanka
            </span>
          </div>
        </motion.div>

        {/* Location & Coming Soon Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-white/90 shadow-md">
            <MapPin className="h-3.5 w-3.5 text-[#e25822]" />
            <span>Ethagala Trails & Lake Loop</span>
          </div>

          <motion.div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e25822]/20 border border-[#e25822]/40 text-[#ff8c42] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-[#e25822]/10"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="h-2 w-2 rounded-full bg-[#e25822] animate-ping" />
            <span>Launching Soon</span>
          </motion.div>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-20 max-w-5xl px-6 md:px-12 mx-auto w-full py-12 md:py-16 flex flex-col items-start justify-center">
        {/* Catchy Coming Soon Badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Sparkles className="h-4 w-4 text-[#ff8c42]" />
          <span className="text-white/95 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            Something Big Is Pacing Your Way • 2026
          </span>
          <Flame className="h-4 w-4 text-[#e25822]" />
        </motion.div>

        {/* Dynamic Catchy Title */}
        <motion.h1
          className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[1.05] mb-6 drop-shadow-2xl text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            className="block font-light text-2xl sm:text-4xl md:text-5xl text-white/90 tracking-widest uppercase mb-1"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #ff9d5c 40%, #e25822 75%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "url(#text-glow)",
            }}
          >
            Find Your Stride
          </motion.span>
          <span className="block font-black text-white drop-shadow-2xl">
            Under Elephant <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e25822] to-[#ff7d47]">Rock</span>
          </span>
        </motion.h1>

        {/* Catchy Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-normal text-white/85 leading-relaxed max-w-2xl mb-8 drop-shadow text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Kurunegala’s premier running movement is gearing up. Sunrise trail climbs, community lake loops, and an unstoppable crew for all paces. Be the first to take the starting line.
        </motion.p>

        {/* Waitlist Subscription & Action Form */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {isSubmitted ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 backdrop-blur-md shadow-xl animate-fade-in">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">You're on the priority list!</p>
                <p className="text-xs text-emerald-200/90">We'll alert you the moment registrations open.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access..."
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-black/50 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#e25822] focus:ring-2 focus:ring-[#e25822]/30 backdrop-blur-md transition-all shadow-inner"
                />
              </div>
              <motion.button
                type="submit"
                className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e25822] to-[#ff6b35] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e25822]/35 hover:shadow-[#e25822]/55 cursor-pointer transition-all duration-300 shrink-0"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Bell className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span>Get Notified</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </main>

      {/* Footer Bottom Bar with Rotating Badge & Video Accessibility */}
      <footer className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
          <span className="h-2 w-2 rounded-full bg-[#e25822]" />
          <span>Stride Run Club &copy; 2026 • Kurunegala, Sri Lanka</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular Rotating Badge */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-none select-none">
            <div className="absolute w-8 h-8 rounded-full bg-[#e25822]/20 border border-[#e25822]/50 flex items-center justify-center shadow-lg">
              <Flame className="h-4 w-4 text-[#ff8c42]" />
            </div>

            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <defs>
                <path id="circle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="text-[9.5px] fill-white/80 font-bold uppercase tracking-[0.22em]">
                <textPath href="#circle" startOffset="0%">
                  • STRIDE RUN CLUB • COMING SOON • KURUNEGALA •
                </textPath>
              </text>
            </motion.svg>
          </div>

          {/* Background Video Play/Pause Motion Accessibility Control */}
          {!prefersReducedMotion && isVideoLoaded && (
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause background video" : "Play background video"}
              className="flex items-center justify-center p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer shadow-lg"
              title={isPlaying ? "Pause background video" : "Play background video"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
