import type { SearchParams } from "nuqs/server"

import { LiveBookmarksPage } from "@/components/live-bookmarks-page"

export default function ArchivedPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <LiveBookmarksPage archived={true} searchParams={searchParams} />
}
