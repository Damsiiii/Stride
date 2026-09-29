"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Trash2, Loader2, UserX } from "lucide-react"
import Pagination from "@/components/admin/Pagination"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

interface Member {
  _id: string
  name: string
  email: string
  phone?: string
  pace: string
  experienceLevel: "Beginner" | "Intermediate" | "Advanced"
  joinedAt: string
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

const experienceBadgeClass = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-[#A3C19C]/15 text-[#6B8F63]"
    case "Intermediate":
      return "bg-amber-100 text-amber-700"
    case "Advanced":
      return "bg-[#1A1A1A]/8 text-[#1A1A1A]"
    default:
      return "bg-[#1A1A1A]/5 text-[#1A1A1A]/60"
  }
}

export default function MembersPanel() {
  const [members, setMembers] = useState<Member[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({ total: 0, page: 1, limit: 15, pages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const fetchMembers = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/members?page=${p}&limit=15`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Failed to fetch members")
      setMembers(json.data)
      setPagination(json.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers(page)
  }, [page, fetchMembers])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return

    try {
      const res = await fetch(`${API_URL}/api/members/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      fetchMembers(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete member.")
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const filtered = members.filter((m) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
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
            Members
          </h2>
          <p className="text-[13px] text-[#1A1A1A]/40 font-light">
            All registered club members
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/25" />
          <input
            type="text"
            placeholder="Search by name or email..."
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
            <UserX className="h-6 w-6 text-[#1A1A1A]/25" />
          </div>
          <p className="text-[15px] text-[#1A1A1A]/50 font-light">
            {search ? "No members match your search." : "No members yet."}
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
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden md:table-cell">Email</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden lg:table-cell">Phone</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden sm:table-cell">Pace</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4 hidden sm:table-cell">Level</th>
                  <th className="text-left text-[12px] font-medium tracking-[0.04em] text-[#1A1A1A]/50 uppercase pb-3 pr-4">Joined</th>
                  <th className="w-12 pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-[#1A1A1A]/8 hover:bg-[#EDE9E3] transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <p className="text-[14px] text-[#1A1A1A] font-medium">{member.name}</p>
                      <p className="text-[12px] text-[#1A1A1A]/40 md:hidden">{member.email}</p>
                    </td>
                    <td className="py-3.5 pr-4 text-[14px] text-[#1A1A1A]/70 hidden md:table-cell">{member.email}</td>
                    <td className="py-3.5 pr-4 text-[14px] text-[#1A1A1A]/50 hidden lg:table-cell">{member.phone || "—"}</td>
                    <td className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/60 hidden sm:table-cell">{member.pace}</td>
                    <td className="py-3.5 pr-4 hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${experienceBadgeClass(member.experienceLevel)}`}>
                        {member.experienceLevel}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-[13px] text-[#1A1A1A]/40">{formatDate(member.joinedAt)}</td>
                    <td className="py-3.5">
                      <button
                        type="button"
                        onClick={() => handleDelete(member._id, member.name)}
                        aria-label={`Delete member ${member.name}`}
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
