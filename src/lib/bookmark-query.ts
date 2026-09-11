import { PAGE_SIZE, type BookmarkQuery } from "@/lib/bookmark-search-params"
import type {
  BookmarkItem,
  BookmarkPage,
  TagCount,
  TagCounts,
} from "@/types/bookmark"

const time = (value: string | null) => (value ? new Date(value).getTime() : 0)

function compare(sort: BookmarkQuery["sort"]) {
  return (a: BookmarkItem, b: BookmarkItem) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    switch (sort) {
      case "recently-visited":
        // Never-visited bookmarks sink to the bottom.
        if (!a.lastVisited !== !b.lastVisited) return a.lastVisited ? -1 : 1
        return time(b.lastVisited) - time(a.lastVisited)
      case "most-visited":
        return (
          b.visitCount - a.visitCount || time(b.createdAt) - time(a.createdAt)
        )
      default:
        return time(b.createdAt) - time(a.createdAt)
    }
  }
}

/** Filter, sort and paginate an in-memory list (used by the demo). */
export function queryBookmarks(
  bookmarks: BookmarkItem[],
  archived: boolean,
  { q, tags, sort, page }: BookmarkQuery
): BookmarkPage {
  const needle = q.trim().toLowerCase()
  const wanted = tags.map((tag) => tag.toLowerCase())

  const matches = bookmarks.filter((bookmark) => {
    if (bookmark.isArchived !== archived) return false
    if (
      needle &&
      !(
        bookmark.title.toLowerCase().includes(needle) ||
        bookmark.url.toLowerCase().includes(needle) ||
        (bookmark.description ?? "").toLowerCase().includes(needle) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(needle))
      )
    ) {
      return false
    }
    if (wanted.length === 0) return true
    const own = bookmark.tags.map((tag) => tag.toLowerCase())
    return wanted.every((tag) => own.includes(tag))
  })

  matches.sort(compare(sort))

  const total = matches.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const current = Math.min(Math.max(1, page), pageCount)
  return {
    items: matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    total,
    page: current,
    pageCount,
  }
}

function countTags(bookmarks: BookmarkItem[]): TagCount[] {
  const counts = new Map<string, TagCount>()
  for (const { tags } of bookmarks) {
    for (const name of tags) {
      const key = name.toLowerCase()
      const existing = counts.get(key)
      if (existing) existing.count += 1
      else counts.set(key, { name, count: 1 })
    }
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export function computeTagCounts(bookmarks: BookmarkItem[]): TagCounts {
  return {
    active: countTags(bookmarks.filter((b) => !b.isArchived)),
    archived: countTags(bookmarks.filter((b) => b.isArchived)),
  }
}
