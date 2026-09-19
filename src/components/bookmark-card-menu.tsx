"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import {
  Archive,
  Copy,
  ExternalLink,
  MoreVertical,
  Pin,
  PinOff,
  RotateCcw,
  SquarePen,
  Trash,
} from "lucide-react"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"
import type { ActionResult, BookmarkItem } from "@/types/bookmark"

const DeleteBookmark = dynamic(
  () =>
    import("@/components/delete-bookmark-dialog").then((m) => m.DeleteBookmark),
  { ssr: false }
)
const ArchiveUnarchiveBookmarkDialog = dynamic(
  () =>
    import("@/components/archive-unarchive-bookmark-dialogo").then(
      (m) => m.ArchiveUnarchiveBookmarkDialog
    ),
  { ssr: false }
)
const EditBookmarkDialog = dynamic(
  () =>
    import("@/components/edit-bookmark-dialog").then(
      (m) => m.EditBookmarkDialog
    ),
  { ssr: false }
)

type OpenDialog = "edit" | "archive" | "delete" | null

export function BookmarkCardMenu({ bookmark }: { bookmark: BookmarkItem }) {
  const { actions } = useBookmarkApp()
  const [dialog, setDialog] = React.useState<OpenDialog>(null)
  const [isPending, startTransition] = React.useTransition()

  function run(action: () => Promise<ActionResult>, successMessage: string) {
    startTransition(async () => {
      const result = await action()
      toast.add({
        title: result.success ? "Done" : "Something went wrong",
        description: result.success ? successMessage : result.error,
      })
    })
  }

  function handleVisit() {
    window.open(bookmark.url, "_blank", "noopener,noreferrer")
    startTransition(async () => {
      await actions.visit(bookmark.id)
    })
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bookmark.url)
      toast.add({ title: "Copied", description: "Link copied to clipboard." })
    } catch {
      toast.add({
        title: "Could not copy",
        description: "Your browser blocked clipboard access.",
      })
    }
  }

  const closeDialog = (open: boolean) => {
    if (!open) setDialog(null)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="icon"
              variant="ghost"
              aria-label={`Options for ${bookmark.title}`}
              className="cursor-pointer rounded-lg"
              disabled={isPending}
            >
              <MoreVertical className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent
          align="end"
          className="flex w-48 flex-col gap-1 p-2"
        >
          <DropdownMenuItem className="cursor-pointer" onClick={handleVisit}>
            <ExternalLink className="mr-2 size-4" />
            Visit
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
            <Copy className="mr-2 size-4" />
            Copy URL
          </DropdownMenuItem>

          {bookmark.isArchived ? (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setDialog("archive")}
              >
                <RotateCcw className="mr-2 size-4" />
                Unarchive
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setDialog("delete")}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 size-4" />
                Delete Permanently
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  run(
                    () => actions.togglePin(bookmark.id),
                    bookmark.pinned ? "Bookmark unpinned." : "Bookmark pinned."
                  )
                }
              >
                {bookmark.pinned ? (
                  <>
                    <PinOff className="mr-2 size-4" />
                    Unpin
                  </>
                ) : (
                  <>
                    <Pin className="mr-2 size-4" />
                    Pin
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setDialog("edit")}
              >
                <SquarePen className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setDialog("archive")}
              >
                <Archive className="mr-2 size-4" />
                Archive
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === "delete" && (
        <DeleteBookmark
          open
          onOpenChange={closeDialog}
          onConfirm={() =>
            run(() => actions.remove(bookmark.id), "Bookmark deleted.")
          }
        />
      )}

      {dialog === "archive" && (
        <ArchiveUnarchiveBookmarkDialog
          isArchive={bookmark.isArchived}
          open
          onOpenChange={closeDialog}
          onConfirm={() =>
            run(
              () => actions.toggleArchive(bookmark.id),
              bookmark.isArchived
                ? "Bookmark moved back to your list."
                : "Bookmark archived."
            )
          }
        />
      )}

      {dialog === "edit" && (
        <EditBookmarkDialog
          bookmark={bookmark}
          open
          onOpenChange={closeDialog}
        />
      )}
    </>
  )
}
