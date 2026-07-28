"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  return (
    <div className="relative h-fit w-full max-w-xs">
      <SearchIcon className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search by title..."
        className="text-preset-4-medium w-full rounded-lg py-5.75! pl-9"
      />
    </div>
  )
}
