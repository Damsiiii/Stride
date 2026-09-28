"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, MessageCircle, Calendar, Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

interface StatCardData {
  label: string
  value: number | null
  icon: typeof Users
  color: string
}

export default function StatsCards() {
  const [stats, setStats] = useState<{ members: number | null; contacts: number | null; events: number | null }>({
    members: null,
    contacts: null,
    events: null,
  })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [membersRes, contactsRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/api/members?page=1&limit=1`),
          fetch(`${API_URL}/api/contacts?page=1&limit=1`),
          fetch(`${API_URL}/api/events?page=1&limit=1`),
        ])

        const [membersJson, contactsJson, eventsJson] = await Promise.all([
          membersRes.json(),
          contactsRes.json(),
          eventsRes.json(),
        ])

        setStats({
          members: membersJson.success ? membersJson.pagination.total : 0,
          contacts: contactsJson.success ? contactsJson.pagination.total : 0,
          events: eventsJson.success ? eventsJson.pagination.total : 0,
        })
      } catch {
        setStats({ members: 0, contacts: 0, events: 0 })
      }
    }

    fetchCounts()
  }, [])

  const cards: StatCardData[] = [
    { label: "Total Members", value: stats.members, icon: Users, color: "#A3C19C" },
    { label: "Messages", value: stats.contacts, icon: MessageCircle, color: "#8FB388" },
    { label: "Events", value: stats.events, icon: Calendar, color: "#6B8F63" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="rounded-2xl bg-[#F5F3EF] border border-[#1A1A1A]/8 p-6 flex items-start justify-between"
          >
            <div>
              <p className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/40 font-medium uppercase mb-2">
                {card.label}
              </p>
              {card.value === null ? (
                <Loader2 className="h-6 w-6 animate-spin text-[#1A1A1A]/20" />
              ) : (
                <p className="font-[family-name:var(--font-serif)] text-[36px] leading-none text-[#1A1A1A] tracking-tight">
                  {card.value}
                </p>
              )}
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${card.color}20` }}
            >
              <Icon className="h-5 w-5" style={{ color: card.color }} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
