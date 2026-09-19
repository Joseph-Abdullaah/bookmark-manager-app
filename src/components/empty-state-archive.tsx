import { Archive } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyStateArchive() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Archive />
        </EmptyMedia>
        <EmptyTitle>No Archived Bookmarks</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You have no archived bookmarks.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
