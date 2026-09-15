"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SidebarTagItemProps {
  id: string
  name: string
  count: number
  checked: boolean
  onToggle: (name: string) => void
}

export const SidebarTagItem = React.memo(function SidebarTagItem({
  id,
  name,
  count,
  checked,
  onToggle,
}: SidebarTagItemProps) {
  const inputId = `tag-${id.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent">
      <div className="flex items-center gap-3">
        <Checkbox
          id={inputId}
          checked={checked}
          onCheckedChange={() => onToggle(name)}
        />

        <Label
          htmlFor={inputId}
          className="text-preset-3-medium cursor-pointer"
        >
          {name}
        </Label>
      </div>

      <Badge
        variant="secondary"
        className="text-preset-5 h-6 min-w-6 justify-center rounded-full px-2"
      >
        {count}
      </Badge>
    </div>
  )
})
