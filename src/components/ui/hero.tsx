"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { ArrowUpRight, Flame, MapPin, Sparkles, Bell } from "lucide-react"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const MeshGradientComp = MeshGradient as unknown as React.ComponentType<any>
  const PulsingBorderComp = PulsingBorder as unknown as React.ComponentType<any>

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-between">
      <svg className="absolute inset-0 w-0 h-0">
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
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f97316" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradientComp
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#ea580c", "#f97316", "#9a3412", "#06b6d4"]}
        speed={0.3}
        backgroundColor="#000000"
      />
      <MeshGradientComp
        className="absolute inset-0 w-full h-full opacity-50"
        colors={["#000000", "#ffffff", "#f97316", "#06b6d4"]}
        speed={0.2}
        wireframe="true"
        backgroundColor="transparent"
      />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/stride-logo-dark.jpeg`}
            alt="Stride Run Club Logo"
            className="size-11 rounded-full border border-white/20 object-cover shadow-lg"
          />
          <div className="flex flex-col">
            <span className="font-black text-xl text-white tracking-widest leading-none">
              STRIDE <span className="text-orange-500">RUN CLUB</span>
            </span>
            <span className="text-[10px] text-white/70 font-semibold tracking-wider flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-orange-400 inline" /> KURUNEGALA • SRI LANKA
            </span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center space-x-2">
          <a
            href="#about"
            className="text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            About Us
          </a>
          <a
            href="#routes"
            className="text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Lake & Ethagala Routes
          </a>
          <a
            href="#community"
            className="text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Community
          </a>
        </nav>

        {/* Action Button Group */}
        <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <button className="absolute right-0 px-2.5 py-2 rounded-full bg-orange-500 text-white font-normal text-xs transition-all duration-300 hover:bg-orange-600 cursor-pointer h-9 flex items-center justify-center -translate-x-10 group-hover:-translate-x-20 z-0">
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-black font-semibold text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-9 flex items-center gap-2 z-10 shadow-md">
            <Flame className="w-4 h-4 text-orange-500" />
            Join Club
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-20 max-w-4xl px-8 my-auto py-12">
        <div className="text-left">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 relative border border-white/20"
            style={{
              filter: "url(#glass-effect)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent rounded-full" />
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest relative z-10">
              Launching Soon • Official Run Club of Kurunegala
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-medium text-white/90 text-3xl md:text-5xl lg:text-6xl mb-2 tracking-wider uppercase"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f97316 40%, #ea580c 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#text-glow)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              FIND YOUR STRIDE
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl uppercase">
              UNDER ELEPHANT <span className="text-orange-500">ROCK</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-normal text-white/80 mb-8 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Kurunegala's premier running community is lacing up. From morning lake loops to Ethagala trail runs—be the first to run with us.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm transition-all duration-300 hover:from-orange-600 hover:to-amber-600 cursor-pointer shadow-xl hover:shadow-orange-500/20 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-4 h-4" /> Get Early Access
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-400/50 hover:text-orange-200 cursor-pointer backdrop-blur-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-4 h-4 text-orange-400" /> Explore Routes
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Rotating Pulsing Badge */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <PulsingBorderComp
            colors={["#f97316", "#ea580c", "#9a3412", "#ffffff", "#06b6d4"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spotsPerColor={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            rotation={0}
            frame={9161408.251009725}
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
            }}
          />

          {/* Rotating Text Around the Pulsing Border */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.5)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[11px] fill-white/90 font-bold uppercase tracking-wider">
              <textPath href="#circle" startOffset="0%">
                • STRIDE RUN CLUB • KURUNEGALA • COMING SOON •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </div>
  )
}
