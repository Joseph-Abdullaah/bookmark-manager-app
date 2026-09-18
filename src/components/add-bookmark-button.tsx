"use client"

import { Plus } from "lucide-react"
import type * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AddBookmarkButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      className={cn(
        "text-preset-3! cursor-pointer rounded-lg text-primary-foreground!",
        className
      )}
      size="lg"
      {...props}
    >
      <div className="block md:hidden">
        <Plus className="size-5" />
      </div>
      <div className="hidden items-center gap-1 md:flex">
        <Plus className="size-5" />
        <span>Add Bookmark</span>
      </div>
    </Button>
  )
}
