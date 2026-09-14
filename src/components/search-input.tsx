"use client"

import { SearchIcon, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useBookmarkFilters } from "@/hooks/use-bookmark-filters"

export function SearchInput() {
  const { q, setSearch } = useBookmarkFilters()

  return (
    <div className="relative h-fit w-full max-w-xs">
      <SearchIcon className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        aria-label="Search bookmarks"
        value={q}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by title, tag or URL..."
        className="text-preset-4-medium w-full border-border bg-card rounded-lg py-5.75! pr-9 pl-9 [&::-webkit-search-cancel-button]:hidden"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setSearch("")}
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full p-0.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
