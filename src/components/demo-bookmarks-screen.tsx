"use client"

import * as React from "react"

import { BookmarksScreen } from "@/components/bookmarks-screen"
import { useDemoBookmarks } from "@/components/demo-provider"
import { useBookmarkFilters } from "@/hooks/use-bookmark-filters"
import { queryBookmarks } from "@/lib/bookmark-query"

export function DemoBookmarksScreen({ archived }: { archived: boolean }) {
  const bookmarks = useDemoBookmarks()
  const { q, tags, sort, page } = useBookmarkFilters()

  // Keep typing responsive while the list re-filters.
  const deferredQuery = React.useDeferredValue(q)

  const result = React.useMemo(
    () =>
      queryBookmarks(bookmarks, archived, {
        q: deferredQuery,
        tags,
        sort,
        page,
      }),
    [bookmarks, archived, deferredQuery, tags, sort, page]
  )
  const hasAny = React.useMemo(
    () => bookmarks.some((bookmark) => bookmark.isArchived === archived),
    [bookmarks, archived]
  )

  return <BookmarksScreen archived={archived} result={result} hasAny={hasAny} />
}
