"use client"

import * as React from "react"

import {
  createBookmark,
  deleteBookmark,
  editBookmark,
  toggleBookmarkArchive,
  toggleBookmarkPin,
  trackBookmarkVisit,
} from "@/actions/bookmark"
import type { BookmarkFormValues } from "@/lib/validations/bookmark"
import type { ActionResult, TagCounts } from "@/types/bookmark"

export type BookmarkActions = {
  togglePin: (id: string) => Promise<ActionResult>
  toggleArchive: (id: string) => Promise<ActionResult>
  remove: (id: string) => Promise<ActionResult>
  edit: (id: string, values: BookmarkFormValues) => Promise<ActionResult>
  visit: (id: string) => Promise<ActionResult>
  /** Undefined in the demo, where creating bookmarks is disabled. */
  create?: (values: BookmarkFormValues) => Promise<ActionResult>
}

export type BookmarkApp = {
  mode: "live" | "demo"
  homePath: string
  archivedPath: string
  tagCounts: TagCounts
  actions: BookmarkActions
  /** True while a filter change is waiting on the server to re-render. */
  isPending: boolean
  startTransition: React.TransitionStartFunction
}

export const BookmarkAppContext = React.createContext<BookmarkApp | null>(null)

export function useBookmarkApp() {
  const ctx = React.useContext(BookmarkAppContext)
  if (!ctx) {
    throw new Error("useBookmarkApp must be used within a BookmarkAppProvider")
  }
  return ctx
}

const liveActions: BookmarkActions = {
  togglePin: toggleBookmarkPin,
  toggleArchive: toggleBookmarkArchive,
  remove: deleteBookmark,
  edit: editBookmark,
  visit: trackBookmarkVisit,
  create: createBookmark,
}

/**
 * Database-backed app. Mutations are server actions; they revalidate the
 * layout, so the server re-renders the list and tag counts on its own.
 */
export function LiveBookmarkProvider({
  tagCounts,
  children,
}: {
  tagCounts: TagCounts
  children: React.ReactNode
}) {
  const [isPending, startTransition] = React.useTransition()

  const value = React.useMemo<BookmarkApp>(
    () => ({
      mode: "live",
      homePath: "/home",
      archivedPath: "/archived",
      tagCounts,
      actions: liveActions,
      isPending,
      startTransition,
    }),
    [tagCounts, isPending]
  )

  return (
    <BookmarkAppContext.Provider value={value}>
      {children}
    </BookmarkAppContext.Provider>
  )
}
