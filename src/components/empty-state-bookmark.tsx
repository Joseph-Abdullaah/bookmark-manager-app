import { Bookmark } from "lucide-react"

import { AddBookmarkDialog } from "@/components/add-bookmark-dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyStateBookmark() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bookmark />
        </EmptyMedia>
        <EmptyTitle>You have no bookmarks</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Create a bookmark to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddBookmarkDialog />
      </EmptyContent>
    </Empty>
  )
}
