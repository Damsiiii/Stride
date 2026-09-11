"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Send } from "lucide-react"

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    pace: "Casual (6:00 - 7:00 /km)",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.contact) return
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative w-full bg-[#070707] py-28 md:py-36 border-t border-white/[0.08] text-left">
      <div className="w-full max-w-7xl px-6 md:px-12 lg:px-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start text-left">
          {/* Left Column: Community Info & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D6FF57]" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#D6FF57] uppercase">
                JOIN THE PACK
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-white text-left">
              START YOUR
              <br />
              <span className="text-[#D6FF57]">STRIDE.</span>
            </h2>

            <p className="text-[14px] md:text-[15px] font-light leading-[1.7] text-white/60 text-left">
              No memberships, no subscriptions, zero fees. Just lace up and turn up to our next morning roll-call. Have questions about paces, routes, or what shoes to wear? Drop us a note or join our direct WhatsApp group.
            </p>

            {/* Quick Contact Specs - Left Aligned */}
            <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-xs text-white/60 text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 text-left gap-1">
                <span className="text-white/40 uppercase tracking-widest font-mono">HOME BASE</span>
                <span className="text-white font-semibold">Kurunegala Lake Round, Sri Lanka</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 text-left gap-1">
                <span className="text-white/40 uppercase tracking-widest font-mono">SCHEDULE</span>
                <span className="text-white font-semibold">Tuesday • Thursday • Weekend</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-1 text-left gap-1">
                <span className="text-white/40 uppercase tracking-widest font-mono">MEMBERSHIP</span>
                <span className="text-[#D6FF57] font-semibold">100% Free Forever</span>
              </div>
            </div>

            {/* Social Connect Buttons */}
            <div className="pt-4 flex flex-col items-start gap-3 text-left">
              <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase text-left">
                CONNECT DIRECTLY
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Stride Run Club on Instagram"
                  className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[12px] font-bold tracking-wider text-white transition-all hover:border-[#D6FF57] hover:bg-[#D6FF57] hover:text-black cursor-pointer"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Stride Run Club on Strava"
                  className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[12px] font-bold tracking-wider text-white transition-all hover:border-[#D6FF57] hover:bg-[#D6FF57] hover:text-black cursor-pointer"
                >
                  STRAVA
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join Stride WhatsApp Community"
                  className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[12px] font-bold tracking-wider text-white transition-all hover:border-[#D6FF57] hover:bg-[#D6FF57] hover:text-black cursor-pointer"
                >
                  WHATSAPP
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Intake Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 relative text-left"
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-start py-12 text-left animate-[fade-in-up_0.4s_ease-out]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D6FF57]/10 text-[#D6FF57] mb-6">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 text-left">
                  YOU'RE ON THE LIST!
                </h3>
                <p className="max-w-md text-sm text-white/60 font-light leading-relaxed mb-6 text-left">
                  Thanks for reaching out, {formData.name}. We'll send you the WhatsApp community invite and morning meetup drop pin shortly. See you at the lake!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", contact: "", pace: "Casual (6:00 - 7:00 /km)", message: "" })
                  }}
                  className="text-xs font-mono tracking-widest text-[#D6FF57] hover:underline uppercase"
                >
                  Submit Another Response →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white text-left">
                    RUN WITH US
                  </h3>
                  <p className="text-xs text-white/40 mt-1 text-left">
                    Fill this out to get added to our weekly announcements & gear discounts.
                  </p>
                </div>

                <div className="flex flex-col gap-6 text-left">
                  {/* Name input */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase text-left">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-white/20 transition-colors focus:border-[#D6FF57] focus:outline-none text-left"
                    />
                  </div>

                  {/* Email or WhatsApp */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase text-left">
                      WHATSAPP NUMBER OR EMAIL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+94 7X XXX XXXX or kasun@gmail.com"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-white/20 transition-colors focus:border-[#D6FF57] focus:outline-none text-left"
                    />
                  </div>

                  {/* Pace Preference */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase text-left">
                      YOUR CURRENT COMFORTABLE PACE
                    </label>
                    <select
                      value={formData.pace}
                      onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                      className="w-full border-b border-white/20 bg-[#070707] py-3 text-[14px] text-white transition-colors focus:border-[#D6FF57] focus:outline-none cursor-pointer text-left"
                    >
                      <option value="First-Time / Walking Intervals">First-Time Runner / Walking Intervals</option>
                      <option value="Casual (6:00 - 7:00 /km)">Casual Jogger (6:00 - 7:00 min/km)</option>
                      <option value="Steady (5:15 - 6:00 /km)">Steady Pace (5:15 - 6:00 min/km)</option>
                      <option value="Fast / Race Pace (< 5:00 /km)">Speed / Race Pace (&lt; 5:00 min/km)</option>
                    </select>
                  </div>

                  {/* Optional Message */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase text-left">
                      GOALS OR NOTES (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Training for a marathon, new to Kurunegala, or just looking for running buddies..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border-b border-white/20 bg-transparent py-2.5 text-[14px] text-white placeholder:text-white/20 transition-colors focus:border-[#D6FF57] focus:outline-none resize-none text-left"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#D6FF57] py-4 text-[13px] font-black uppercase tracking-[0.16em] text-black transition-all duration-300 hover:bg-[#e0ff8a] hover:shadow-[0_0_20px_rgba(214,255,87,0.45)] hover:scale-[1.01] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>JOIN CLUB TODAY</span>
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
