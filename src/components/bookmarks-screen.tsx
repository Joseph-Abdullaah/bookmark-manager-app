"use client"

import { SearchX } from "lucide-react"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import { BookmarkGrid } from "@/components/bookmark-grid"
import { BookmarkPagination } from "@/components/bookmark-pagination"
import { EmptyStateArchive } from "@/components/empty-state-archive"
import { EmptyStateBookmark } from "@/components/empty-state-bookmark"
import { Sort } from "@/components/sort"
import { Button } from "@/components/ui/button"
import { useBookmarkFilters } from "@/hooks/use-bookmark-filters"
import { cn } from "@/lib/utils"
import type { BookmarkPage } from "@/types/bookmark"

interface BookmarksScreenProps {
  archived: boolean
  result: BookmarkPage
  /** Whether the section holds any bookmark at all, ignoring filters. */
  hasAny: boolean
}

export function BookmarksScreen({
  archived,
  result,
  hasAny,
}: BookmarksScreenProps) {
  const { isPending } = useBookmarkApp()
  const { q, tags, setPage, clearFilters } = useBookmarkFilters()

  if (!hasAny) {
    return archived ? <EmptyStateArchive /> : <EmptyStateBookmark />
  }

  const search = q.trim()
  const title = search
    ? `Results for “${search}”`
    : archived
      ? "Archived Bookmarks"
      : "All Bookmarks"

  return (
    <div className="flex w-full flex-col gap-5 px-4 py-4 md:px-8 md:pt-6 lg:pt-8">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-preset-1 truncate">{title}</h1>
        <Sort />
      </div>

      {result.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted/30 px-6 py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="text-preset-2">No bookmarks match your filters</p>
          <p className="text-preset-4-medium max-w-xs text-pretty text-muted-foreground">
            Try a different search term or remove some filters to see more
            results.
          </p>
          {(search || tags.length > 0) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div
          aria-busy={isPending}
          className={cn(
            "flex flex-col gap-8 transition-opacity",
            isPending && "opacity-60"
          )}
        >
          <BookmarkGrid bookmarks={result.items} />
          <BookmarkPagination
            page={result.page}
            pageCount={result.pageCount}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
