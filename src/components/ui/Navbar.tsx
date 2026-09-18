"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight, MapPin } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "RUNS", href: "#runs" },
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#contact" },
  ]

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#070707]/90 backdrop-blur-xl border-b border-white/[0.1] shadow-2xl shadow-black/80"
          : "bg-[#070707]/40 backdrop-blur-md border-b border-white/[0.06]"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Left Side: Brand Identity (Logo + Title + Location Tag) */}
        <div className="flex items-center gap-8 lg:gap-10">
          <a
            href="#"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF57] rounded-full p-1 transition-opacity hover:opacity-90"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={`${baseUrl}/images/stride-logo-dark.jpeg`}
                alt="Stride Run Club Logo"
                className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-white/20 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#D6FF57] ring-2 ring-[#070707]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] md:text-[16px] font-black tracking-[0.18em] text-white leading-none">
                  STRIDE
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.24em] text-white/50 uppercase mt-0.5">
                RUN CLUB
              </span>
            </div>
          </a>

          {/* Location Badge (Desktop/Tablet) */}
          <div className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF57] animate-pulse" />
            <MapPin className="h-3 w-3 text-[#D6FF57]" />
            <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-white/60 uppercase">
              KURUNEGALA
            </span>
          </div>
        </div>

        {/* Center / Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(link.href)
              }}
              className="group relative py-1 text-[11px] font-bold tracking-[0.22em] text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-[#D6FF57]"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D6FF57] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Side: Primary CTA & Mobile Navigation Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick("#contact")
            }}
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D6FF57] px-5 py-2.5 text-[11px] font-black tracking-[0.14em] text-black uppercase transition-all duration-300 hover:bg-[#e0ff8a] hover:shadow-[0_0_20px_rgba(214,255,87,0.45)] hover:scale-[1.02] active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <span>JOIN CLUB</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D6FF57] focus-visible:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#D6FF57]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] z-40 flex flex-col justify-between bg-[#070707]/98 backdrop-blur-3xl px-8 py-8 md:hidden border-t border-white/[0.1] transition-all duration-300">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                // MENU NAVIGATION
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                KURUNEGALA, LK
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className="group flex items-center justify-between py-3.5 text-2xl font-black tracking-tight text-white/80 transition-colors hover:text-[#D6FF57] border-b border-white/[0.05]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#D6FF57]" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center justify-between text-white/50 text-xs tracking-wider">
              <span className="font-mono text-[10px] uppercase">HQ Location</span>
              <span className="text-white font-semibold text-xs flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF57]" />
                Elephant Rock City
              </span>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("#contact")
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-[#D6FF57] py-4 text-[12px] font-black tracking-[0.14em] text-black uppercase shadow-xl shadow-[#D6FF57]/15 cursor-pointer active:scale-98 transition-transform"
            >
              <span>JOIN CLUB TODAY</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
