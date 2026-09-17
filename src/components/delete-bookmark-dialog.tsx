"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteBookmarkProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void | Promise<void>
}

export function DeleteBookmark({
  open,
  onOpenChange,
  onConfirm,
}: DeleteBookmarkProps) {
  async function handleConfirm() {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-preset-1">
            Delete bookmark
          </AlertDialogTitle>
          <AlertDialogDescription className="text-preset-4-medium">
            Are you sure you want to delete this bookmark?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-preset-3">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="text-preset-3"
            onClick={handleConfirm}
          >
            Delete Permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
