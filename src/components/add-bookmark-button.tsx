"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AddBookmarkButton() {
  return (
    <Button
      className="text-preset-3! cursor-pointer rounded-lg text-primary-foreground!"
      size="lg"
    >
      <Plus size="lg" />
      Add Bookmark
    </Button>
  )
}
