"use client"

import { memo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  pages: number
  total: number
  onPageChange: (page: number) => void
}

const Pagination = memo(function Pagination({
  page,
  pages,
  total,
  onPageChange,
}: PaginationProps) {
  if (pages <= 1) return null

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-[13px] text-[#1A1A1A]/40">
        Page {page} of {pages} · {total} total
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="flex items-center justify-center rounded-lg border border-[#1A1A1A]/10 px-3 py-2 text-[13px] text-[#1A1A1A]/60 transition-all hover:bg-[#EDE9E3] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="flex items-center justify-center rounded-lg border border-[#1A1A1A]/10 px-3 py-2 text-[13px] text-[#1A1A1A]/60 transition-all hover:bg-[#EDE9E3] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
})

export default Pagination

