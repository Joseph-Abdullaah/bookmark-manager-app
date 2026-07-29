"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AddBookmarkButton() {
  return (
    <Button
      className="text-preset-3! cursor-pointer rounded-lg text-primary-foreground!"
      size="lg"
    >
      <div className="block md:hidden">
        <Plus size="lg" />
      </div>
      <div className="hidden items-center gap-1 md:flex">
        <Plus size="lg" />
        <span>Add Bookmark</span>
      </div>
    </Button>
  )
}
