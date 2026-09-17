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

interface ArchiveUnarchiveBookmarkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void | Promise<void>
  isArchive: boolean
}

export function ArchiveUnarchiveBookmarkDialog({
  open,
  onOpenChange,
  onConfirm,
  isArchive,
}: ArchiveUnarchiveBookmarkDialogProps) {
  async function handleConfirm() {
    await onConfirm()
    onOpenChange(false)
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-preset-1">
            {isArchive ? "Unarchive" : "Archive"} bookmark
          </AlertDialogTitle>
          <AlertDialogDescription className="text-preset-4-medium">
            {isArchive
              ? "Move this bookmark back to your active list?"
              : "Are you sure you want to archive this bookmark?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-preset-3">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="text-preset-3">
            {isArchive ? "Unarchive" : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
