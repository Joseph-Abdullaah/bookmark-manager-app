"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

type PageToken = number | "ellipsis-start" | "ellipsis-end"

/** 1 … 4 5 6 … 12 — always keeps first, last and the current neighbours. */
function getPageTokens(page: number, pageCount: number): PageToken[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)
  const tokens: PageToken[] = [1]
  if (start > 2) tokens.push("ellipsis-start")
  for (let p = start; p <= end; p++) tokens.push(p)
  if (end < pageCount - 1) tokens.push("ellipsis-end")
  tokens.push(pageCount)
  return tokens
}

interface BookmarkPaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function BookmarkPagination({
  page,
  pageCount,
  onPageChange,
}: BookmarkPaginationProps) {
  if (pageCount <= 1) return null

  const go = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    if (target >= 1 && target <= pageCount && target !== page) {
      onPageChange(target)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const disabled = "pointer-events-none opacity-50"

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={go(page - 1)}
            aria-disabled={page === 1}
            className={cn("text-preset-4", page === 1 && disabled)}
          />
        </PaginationItem>

        {getPageTokens(page, pageCount).map((token) =>
          typeof token === "number" ? (
            <PaginationItem key={token}>
              <PaginationLink
                href="#"
                isActive={token === page}
                onClick={go(token)}
                aria-label={`Go to page ${token}`}
                className="text-preset-4"
              >
                {token}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={token}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={go(page + 1)}
            aria-disabled={page === pageCount}
            className={cn("text-preset-4", page === pageCount && disabled)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
