"use client"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SidebarTagItemProps {
  name: string
  count: number
}

export function SidebarTagItem({ name, count }: SidebarTagItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent">
      <div className="flex items-center gap-3">
        <Checkbox id={name} />

        <Label htmlFor={name} className="cursor-pointer text-sm font-medium">
          {name}
        </Label>
      </div>

      <Badge
        variant="secondary"
        className="h-6 min-w-6 justify-center rounded-full px-2"
      >
        {count}
      </Badge>
    </div>
  )
}
