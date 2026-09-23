import type { SearchParams } from "nuqs/server"

import { LiveBookmarksPage } from "@/components/live-bookmarks-page"

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return <LiveBookmarksPage archived={false} searchParams={searchParams} />
}
