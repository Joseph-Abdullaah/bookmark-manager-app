import type { Prisma } from "@/generated/prisma/client"

export type BookmarkWithTags = Prisma.BookmarkGetPayload<{
  include: {
    bookmarkTags: {
      include: {
        tag: true
      }
    }
  }
}>

/**
 * Serializable bookmark shape used by the UI. Both the database-backed app and
 * the demo (data.json) are mapped to it, so components never care where the
 * data came from.
 */
export type BookmarkItem = {
  id: string
  title: string
  url: string
  favicon: string | null
  description: string | null
  tags: string[]
  pinned: boolean
  isArchived: boolean
  visitCount: number
  createdAt: string
  lastVisited: string | null
}

export type TagCount = {
  name: string
  count: number
}

export type TagCounts = {
  active: TagCount[]
  archived: TagCount[]
}

export type BookmarkPage = {
  items: BookmarkItem[]
  total: number
  page: number
  pageCount: number
}

export type ActionResult = { success: true } | { success: false; error: string }
