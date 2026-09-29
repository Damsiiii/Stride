import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Trash2, Loader2, CalendarX, Plus, Send } from "lucide-react"
import Pagination from "@/components/admin/Pagination"

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "")

interface Event {
  _id: string
  title: string
  date: string
  location: string
  distance: string
  description: string
  paceGroup: string
  createdAt: string
}

interface PaginationInfo {
  total: number
  page: number
  limit: number
  pages: number
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const emptyForm = {
  title: "",
  date: "",
  location: "",
  distance: "",
  description: "",
  paceGroup: "",
}

export default function EventsPanel() {
  const [events, setEvents] = useState<Event[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({ total: 0, page: 1, limit: 15, pages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // Create form state
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const fetchEvents = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/events?page=${p}&limit=15`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Failed to fetch events")
      setEvents(json.data)
      setPagination(json.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents(page)
  }, [page, fetchEvents])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return

    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      fetchEvents(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event.")
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.date || !formData.location) return

    setCreating(true)
    setFormError(null)
    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
          location: formData.location,
          distance: formData.distance || undefined,
          description: formData.description || undefined,
          paceGroup: formData.paceGroup || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed to create event")

      setFormData(emptyForm)
      setShowForm(false)
      fetchEvents(1)
      setPage(1)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setCreating(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Create Event Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl bg-[#F5F3EF] border border-[#1A1A1A]/8 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-[#1A1A1A]">
              Events
            </h2>
            <p className="text-[13px] text-[#1A1A1A]/40 font-light">
              Manage club runs and events
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-[12px] font-semibold tracking-[0.06em] text-white uppercase transition-all duration-300 hover:bg-[#333] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Event</span>
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleCreate}
            className="border-t border-[#1A1A1A]/8 pt-6 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saturday Morning Run"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurunegala Lake Road"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                />
              </div>

              {/* Distance */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                  Distance
                </label>
                <input
                  type="text"
                  placeholder="5K / 10K"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                />
              </div>

              {/* Pace Group */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                  Pace Group
                </label>
                <input
                  type="text"
                  placeholder="All Paces"
                  value={formData.paceGroup}
                  onChange={(e) => setFormData({ ...formData, paceGroup: e.target.value })}
                  className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] tracking-[0.06em] text-[#1A1A1A]/50 font-medium">
                Description
              </label>
              <textarea
                placeholder="Brief description of the event..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20 resize-none"
              />
            </div>

            {/* Form Error */}
            {formError && (
              <div className="rounded-lg border border-red-300/50 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                {formError}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={creating}
                className="flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-6 py-3 text-[13px] font-semibold tracking-[0.06em] text-white uppercase transition-all duration-300 hover:bg-[#333] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Create Event</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormData(emptyForm)
                  setFormError(null)
                }}
                className="rounded-full px-6 py-3 text-[13px] font-medium text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>

      {/* Events Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-2xl bg-[#F5F3EF] border border-[#1A1A1A]/8 p-6"
      >
        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-300/50 bg-red-50 px-4 py-3 text-[13px] text-red-600 mb-4">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[#A3C19C]" />
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]/5 mb-4">
              <CalendarX className="h-6 w-6 text-[#1A1A1A]/25" />
            </div>
            <p className="text-[15px] text-[#1A1A1A]/50 font-light">
              No events scheduled yet. Create one above!
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1A1A1A]/12">
                    <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4">Title</th>
                    <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4">Date</th>
                    <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden sm:table-cell">Location</th>
                    <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden md:table-cell">Distance</th>
                    <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden lg:table-cell">Pace Group</th>
                    <th className="w-12 pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event._id}
                      className="border-b border-[#1A1A1A]/8 hover:bg-[#EDE9E3] transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <p className="text-[14px] text-[#1A1A1A] font-medium">{event.title}</p>
                        {event.description && (
                          <p className="text-[12px] text-[#1A1A1A]/40 mt-0.5 truncate max-w-[250px]">{event.description}</p>
                        )}
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="text-[14px] text-[#1A1A1A]/70">{formatDate(event.date)}</p>
                      </td>
                      <td className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/60 hidden sm:table-cell">{event.location}</td>
                      <td className="py-3.5 pr-4 hidden md:table-cell">
                        <span className="inline-block rounded-full bg-[#A3C19C]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#6B8F63]">
                          {event.distance}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/50 hidden lg:table-cell">{event.paceGroup}</td>
                      <td className="py-3.5">
                        <button
                          type="button"
                          onClick={() => handleDelete(event._id, event.title)}
                          aria-label={`Delete event ${event.title}`}
                          className="flex items-center justify-center rounded-lg p-2 text-[#1A1A1A]/30 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={pagination.page}
              pages={pagination.pages}
              total={pagination.total}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </motion.div>
    </div>
  )
}
