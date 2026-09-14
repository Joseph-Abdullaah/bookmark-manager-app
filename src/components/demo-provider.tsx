"use client"

import * as React from "react"

import {
  BookmarkAppContext,
  type BookmarkActions,
  type BookmarkApp,
} from "@/components/bookmark-app-context"
import { computeTagCounts } from "@/lib/bookmark-query"
import type { BookmarkItem } from "@/types/bookmark"

const DemoBookmarksContext = React.createContext<BookmarkItem[] | null>(null)

export function useDemoBookmarks() {
  const ctx = React.useContext(DemoBookmarksContext)
  if (!ctx) throw new Error("useDemoBookmarks must be used within DemoProvider")
  return ctx
}

const OK = { success: true } as const

function dedupeTags(tags: string[]) {
  const seen = new Map<string, string>()
  for (const raw of tags) {
    const name = raw.trim()
    if (name && !seen.has(name.toLowerCase()))
      seen.set(name.toLowerCase(), name)
  }
  return [...seen.values()]
}

/**
 * Demo mode: data.json is the seed and every change lives in memory only, so
 * a refresh restores the original data. Creating bookmarks is not supported.
 */
export function DemoProvider({
  initial,
  children,
}: {
  initial: BookmarkItem[]
  children: React.ReactNode
}) {
  const [bookmarks, setBookmarks] = React.useState(initial)
  const [isPending, startTransition] = React.useTransition()

  const actions = React.useMemo<BookmarkActions>(() => {
    const update = (id: string, change: (b: BookmarkItem) => BookmarkItem) =>
      setBookmarks((list) => list.map((b) => (b.id === id ? change(b) : b)))

    return {
      togglePin: async (id) => {
        update(id, (b) => ({ ...b, pinned: !b.pinned }))
        return OK
      },
      toggleArchive: async (id) => {
        update(id, (b) => ({ ...b, isArchived: !b.isArchived, pinned: false }))
        return OK
      },
      remove: async (id) => {
        setBookmarks((list) => list.filter((b) => b.id !== id))
        return OK
      },
      edit: async (id, values) => {
        update(id, (b) => ({
          ...b,
          title: values.title,
          url: values.url,
          description: values.description,
          tags: dedupeTags(values.tags),
        }))
        return OK
      },
      visit: async (id) => {
        update(id, (b) => ({
          ...b,
          visitCount: b.visitCount + 1,
          lastVisited: new Date().toISOString(),
        }))
        return OK
      },
    }
  }, [])

  const tagCounts = React.useMemo(
    () => computeTagCounts(bookmarks),
    [bookmarks]
  )

  const value = React.useMemo<BookmarkApp>(
    () => ({
      mode: "demo",
      homePath: "/demo",
      archivedPath: "/demo/archived",
      tagCounts,
      actions,
      isPending,
      startTransition,
    }),
    [tagCounts, actions, isPending]
  )

  return (
    <BookmarkAppContext.Provider value={value}>
      <DemoBookmarksContext.Provider value={bookmarks}>
        {children}
      </DemoBookmarksContext.Provider>
    </BookmarkAppContext.Provider>
  )
}
