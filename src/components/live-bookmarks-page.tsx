import type { SearchParams } from "nuqs/server"

import { BookmarksScreen } from "@/components/bookmarks-screen"
import { bookmarkSearchParamsCache } from "@/lib/bookmark-search-params"
import { requireSession } from "@/lib/session"
import { getBookmarkPage, hasBookmarks } from "@/services/bookmark.service"

export async function LiveBookmarksPage({
  archived,
  searchParams,
}: {
  archived: boolean
  searchParams: Promise<SearchParams>
}) {
  const { user } = await requireSession()
  const query = await bookmarkSearchParamsCache.parse(searchParams)

  const result = await getBookmarkPage(user.id, archived, query)

  // With active filters an empty result does not mean an empty section.
  const hasAny = result.total > 0 || (await hasBookmarks(user.id, archived))

  return <BookmarksScreen archived={archived} result={result} hasAny={hasAny} />
}
