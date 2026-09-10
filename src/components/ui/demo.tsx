import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Listen to prefers-reduced-motion media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sync play/pause state with video element
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f1416]">
      {/* 1. Full-bleed Background Video & Poster Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
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
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-[#0f1416]/95 backdrop-brightness-[0.88]"
          aria-hidden="true"
        />
      </div>

      {/* Decorative Grid Lines Overlay */}
      <div className="absolute inset-0 z-10 size-full pointer-events-none" aria-hidden="true">
        <div className="grid w-full grid-cols-12 divide-x divide-white/10 h-full">
          <div className="col-span-1 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-4 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-1 h-full" />
        </div>
      </div>

      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
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

        <span className="text-xs font-semibold text-white/90 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm hidden sm:inline-block">
          Kurunegala • Sri Lanka
        </span>
      </header>

      {/* Foreground Hero Content */}
      <div className="relative z-20 max-w-5xl px-6 text-center text-white pt-16 sm:pt-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[#e25822] text-xs uppercase tracking-widest font-bold mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e25822] animate-pulse" />
          Every Tuesday & Saturday Morning
        </div>

        <h1 className="text-center font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight uppercase leading-[1.05] mb-6 drop-shadow-md">
          FIND YOUR STRIDE UNDER ELEPHANT ROCK
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-center font-normal text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow">
          Kurunegala's premier running community. Connecting runners of all levels around the lake, Ethagala trails, and scenic North Western routes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="group not-disabled:inset-shadow-none flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent">
            <span className="rounded-full bg-[#e25822] px-8 py-3.5 text-white text-base font-bold transition-all duration-300 group-hover:bg-[#ff6f3c] shadow-lg shadow-[#e25822]/30">
              Join Stride Run Club
            </span>
            <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e25822] p-4 text-white transition-all duration-300 group-hover:bg-[#ff6f3c] shadow-lg shadow-[#e25822]/30">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Button>
        </div>
      </div>

      {/* Background Play/Pause Motion Accessibility Control */}
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
  );
}
