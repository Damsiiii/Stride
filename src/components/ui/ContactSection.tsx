"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Send, Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    pace: "Casual (6:00 - 7:00 /km)",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.contact) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the server. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative w-full bg-[#F5F3EF] py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column: Warm Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[11px] tracking-[0.25em] text-[#1A1A1A]/40 uppercase">
              Join the Pack
            </p>

            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl lg:text-6xl leading-[1] tracking-[-0.02em]">
              Start your stride.
            </h2>

            <p className="text-[15px] md:text-[17px] font-light leading-[1.8] text-[#1A1A1A]/55">
              No memberships, no subscriptions, zero fees. Just lace up and show up
              to our next morning roll-call. Have questions about paces, routes, or
              what shoes to wear? Drop us a note.
            </p>

            {/* Thin Divider */}
            <div className="w-10 h-px bg-[#1A1A1A]/15 my-2" />

            {/* Quick Details */}
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between py-1 border-b border-[#1A1A1A]/8">
                <span className="text-[#1A1A1A]/40">Home Base</span>
                <span className="text-[#1A1A1A] font-medium">Kurunegala Lake</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A1A]/8">
                <span className="text-[#1A1A1A]/40">Schedule</span>
                <span className="text-[#1A1A1A] font-medium">Tue · Thu · Weekend</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A1A]/8">
                <span className="text-[#1A1A1A]/40">Membership</span>
                <span className="text-[#6B8F63] font-medium">Free, forever</span>
              </div>
            </div>

            {/* Social Links — Plain text */}
            <div className="pt-4 flex flex-col gap-3">
              <span className="text-[11px] tracking-[0.15em] text-[#1A1A1A]/35 uppercase">
                Connect
              </span>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors underline underline-offset-4 decoration-[#1A1A1A]/15"
                >
                  Instagram
                </a>
                <a
                  href="https://strava.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors underline underline-offset-4 decoration-[#1A1A1A]/15"
                >
                  Strava
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors underline underline-offset-4 decoration-[#1A1A1A]/15"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A3C19C]/20 text-[#6B8F63] mb-6">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#1A1A1A] mb-3">
                  You're on the list
                </h3>
                <p className="max-w-sm text-[14px] text-[#1A1A1A]/50 font-light leading-relaxed mb-6">
                  Thanks, {formData.name}. We'll send you the WhatsApp invite and morning meetup
                  location shortly. See you at the lake.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setError(null)
                    setFormData({ name: "", contact: "", pace: "Casual (6:00 - 7:00 /km)", message: "" })
                  }}
                  className="text-[13px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-[24px] text-[#1A1A1A] mb-1">
                    Run with us
                  </h3>
                  <p className="text-[13px] text-[#1A1A1A]/40 font-light">
                    Fill this out to join our weekly briefings & community group.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3.5 text-[15px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                    />
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                      WhatsApp or Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+94 7X XXX XXXX or kasun@gmail.com"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3.5 text-[15px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                    />
                  </div>

                  {/* Pace */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                      Your Pace
                    </label>
                    <select
                      value={formData.pace}
                      onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                      className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3.5 text-[15px] text-[#1A1A1A] transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20 cursor-pointer appearance-none"
                    >
                      <option value="First-Time / Walking Intervals">First-Time Runner</option>
                      <option value="Casual (6:00 - 7:00 /km)">Casual (6:00 – 7:00 /km)</option>
                      <option value="Steady (5:15 - 6:00 /km)">Steady (5:15 – 6:00 /km)</option>
                      <option value="Fast / Race Pace (< 5:00 /km)">Race Pace (&lt; 5:00 /km)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                      Anything else? (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Training goals, questions, or just say hi..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[15px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20 resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-300/50 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#1A1A1A] py-4 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-all duration-300 hover:bg-[#333] hover:shadow-lg active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3C19C] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Join the Club</span>
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
