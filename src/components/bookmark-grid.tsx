import { BookmarkCard } from "@/components/bookmark-card"
import type { BookmarkItem } from "@/types/bookmark"

export function BookmarkGrid({ bookmarks }: { bookmarks: BookmarkItem[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-6">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id} className="flex">
          <BookmarkCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  )
}
