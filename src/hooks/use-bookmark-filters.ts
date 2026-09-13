"use client"

import * as React from "react"
import { debounce, useQueryStates } from "nuqs"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import { bookmarkParsers, type SortKey } from "@/lib/bookmark-search-params"

/**
 * Search, tag filter, sort and page — all kept in the URL with nuqs.
 *
 * Live mode uses `shallow: false` so the server re-renders with the new query;
 * demo mode keeps updates client-side because the data is already in memory.
 */
export function useBookmarkFilters() {
  const { mode, startTransition } = useBookmarkApp()

  const [params, setParams] = useQueryStates(bookmarkParsers, {
    shallow: mode === "demo",
    startTransition,
    clearOnDefault: true,
  })

  const setSearch = React.useCallback(
    (q: string) =>
      setParams(
        { q: q || null, page: null },
        { limitUrlUpdates: q ? debounce(300) : undefined }
      ),
    [setParams]
  )

  const toggleTag = React.useCallback(
    (tag: string) =>
      setParams((current) => {
        const key = tag.toLowerCase()
        const selected = current.tags.some((t) => t.toLowerCase() === key)
        const tags = selected
          ? current.tags.filter((t) => t.toLowerCase() !== key)
          : [...current.tags, tag]
        return { tags: tags.length ? tags : null, page: null }
      }),
    [setParams]
  )

  const setSort = React.useCallback(
    (sort: SortKey) => setParams({ sort, page: null }),
    [setParams]
  )

  const setPage = React.useCallback(
    (page: number) => setParams({ page: page > 1 ? page : null }),
    [setParams]
  )

  const clearFilters = React.useCallback(
    () => setParams({ q: null, tags: null, page: null }),
    [setParams]
  )

  return { ...params, setSearch, toggleTag, setSort, setPage, clearFilters }
}
