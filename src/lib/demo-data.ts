import data from "../../data.json"
import type { BookmarkItem } from "@/types/bookmark"

/** data.json favicons are relative ("./assets/..."); serve them from /public. */
export function getDemoBookmarks(): BookmarkItem[] {
  return data.bookmarks.map((bookmark) => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    favicon: bookmark.favicon ? bookmark.favicon.replace(/^\.\//, "/") : null,
    description: bookmark.description ?? null,
    tags: bookmark.tags,
    pinned: bookmark.pinned,
    isArchived: bookmark.isArchived,
    visitCount: bookmark.visitCount,
    createdAt: bookmark.createdAt,
    lastVisited: bookmark.lastVisited ?? null,
  }))
}
