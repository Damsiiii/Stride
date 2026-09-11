"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"

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
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#070707]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40"
          : "bg-black/40 backdrop-blur-md border-b border-white/[0.06]"
      }`}
    >
      <div className="flex h-full w-full items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Left Side: Brand Logo & Wordmark + Left-Aligned Nav Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <a
            href="#"
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF57] rounded-full p-1"
          >
            <div className="relative">
              <img
                src={`${baseUrl}/images/stride-logo-dark.jpeg`}
                alt="Stride Run Club Logo"
                className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-white/15 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#D6FF57] ring-2 ring-[#070707]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[14px] md:text-[15px] font-black tracking-[0.16em] text-white">
                STRIDE
              </span>
              <span className="text-[9px] font-bold tracking-[0.22em] text-white/40 uppercase">
                RUN CLUB
              </span>
            </div>
          </a>

          {/* Left-Aligned Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="relative text-[11px] font-bold tracking-[0.2em] text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-[#D6FF57]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Location Tag & Join Button */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF57] animate-[pulse-dot_2s_ease-in-out_infinite]" />
            <span className="text-[9px] font-bold tracking-[0.25em] text-white/50 uppercase">
              KURUNEGALA
            </span>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick("#contact")
            }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#D6FF57] px-5 py-2 text-[11px] font-extrabold tracking-[0.12em] text-black uppercase transition-all duration-300 hover:bg-[#e0ff8a] hover:shadow-[0_0_15px_rgba(214,255,87,0.45)] hover:scale-[1.02] active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <span>JOIN CLUB</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#D6FF57] focus-visible:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 flex flex-col justify-between bg-[#070707]/95 backdrop-blur-2xl px-8 py-10 md:hidden border-t border-white/[0.08] animate-[fade-in-up_0.25s_ease-out]">
          <div className="flex flex-col gap-6 pt-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
              // NAVIGATION
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="text-2xl font-black tracking-tight text-white/80 hover:text-[#D6FF57] transition-colors py-2 border-b border-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <div className="flex items-center justify-between py-2 text-white/40 text-xs tracking-wider">
              <span>LOCATION</span>
              <span className="text-white font-semibold">KURUNEGALA, LK</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("#contact")
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-[#D6FF57] py-4 text-[13px] font-extrabold tracking-[0.14em] text-black uppercase shadow-lg shadow-[#D6FF57]/20 cursor-pointer"
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
