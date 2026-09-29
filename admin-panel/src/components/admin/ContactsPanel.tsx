import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Trash2, Loader2, MessageSquareOff, ChevronDown, ChevronUp } from "lucide-react"
import Pagination from "@/components/admin/Pagination"

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "")

interface Contact {
  _id: string
  name: string
  contact: string
  pace: string
  message: string
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

export default function ContactsPanel() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({ total: 0, page: 1, limit: 15, pages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchContacts = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/contacts?page=${p}&limit=15`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Failed to fetch contacts")
      setContacts(json.data)
      setPagination(json.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts(page)
  }, [page, fetchContacts])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the submission from "${name}"? This cannot be undone.`)) return

    try {
      const res = await fetch(`${API_URL}/api/contacts/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      if (expandedId === id) setExpandedId(null)
      fetchContacts(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete contact submission.")
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setExpandedId(null)
  }

  const filtered = contacts.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.contact.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-[#F5F3EF] border border-[#1A1A1A]/8 p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-[24px] text-[#1A1A1A]">
            Contact Submissions
          </h2>
          <p className="text-[13px] text-[#1A1A1A]/40 font-light">
            Messages from the contact form
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/25" />
          <input
            type="text"
            placeholder="Search by name, contact, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#1A1A1A]/10 bg-white pl-10 pr-4 py-2.5 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 transition-colors focus:border-[#A3C19C] focus:outline-none focus:ring-2 focus:ring-[#A3C19C]/20"
          />
        </div>
      </div>

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
      ) : filtered.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A]/5 mb-4">
            <MessageSquareOff className="h-6 w-6 text-[#1A1A1A]/25" />
          </div>
          <p className="text-[15px] text-[#1A1A1A]/50 font-light">
            {search ? "No submissions match your search." : "No contact submissions yet."}
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]/12">
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4">Name</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden md:table-cell">Contact</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden lg:table-cell">Pace</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden sm:table-cell">Message</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4">Date</th>
                  <th className="w-20 pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c._id} className="group">
                    <td colSpan={6} className="p-0">
                      <div className="border-b border-[#1A1A1A]/8 hover:bg-[#EDE9E3] transition-colors">
                        <div className="flex items-center">
                          <div className="flex-1 grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr_1fr_auto] lg:grid-cols-[1fr_1fr_0.7fr_1.5fr_auto] items-center gap-0">
                            <div className="py-3.5 pr-4">
                              <p className="text-[14px] text-[#1A1A1A] font-medium">{c.name}</p>
                              <p className="text-[12px] text-[#1A1A1A]/40 md:hidden">{c.contact}</p>
                            </div>
                            <div className="py-3.5 pr-4 text-[14px] text-[#1A1A1A]/70 hidden md:block">{c.contact}</div>
                            <div className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/60 hidden lg:block">{c.pace}</div>
                            <div className="py-3.5 pr-4 hidden sm:block">
                              <p className="text-[13px] text-[#1A1A1A]/60 truncate max-w-[200px]">
                                {c.message || "—"}
                              </p>
                            </div>
                            <div className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/40">{formatDate(c.createdAt)}</div>
                          </div>
                          <div className="flex items-center gap-1 pr-2">
                            {c.message && (
                              <button
                                type="button"
                                onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
                                aria-label={expandedId === c._id ? "Collapse message" : "Expand message"}
                                className="flex items-center justify-center rounded-lg p-2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
                              >
                                {expandedId === c._id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDelete(c._id, c.name)}
                              aria-label={`Delete submission from ${c.name}`}
                              className="flex items-center justify-center rounded-lg p-2 text-[#1A1A1A]/30 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Message */}
                        {expandedId === c._id && c.message && (
                          <div className="pb-4 px-1">
                            <div className="rounded-lg bg-white border border-[#1A1A1A]/8 p-4">
                              <p className="text-[11px] tracking-[0.06em] text-[#1A1A1A]/40 font-medium uppercase mb-2">
                                Full Message
                              </p>
                              <p className="text-[14px] text-[#1A1A1A]/80 leading-relaxed whitespace-pre-wrap">
                                {c.message}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </motion.div>
  )
}
