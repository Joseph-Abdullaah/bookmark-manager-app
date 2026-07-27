"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarTagItem } from "@/components/sidebar-tag-item"
import { tags } from "@/sidebar-data"

export function SidebarTags() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>TAGS</SidebarGroupLabel>
      <SidebarGroupContent>
        <ScrollArea className="h-[calc(100dvh-240px)]">
          <div className="space-y-1">
            {tags.map((tag) => (
              <SidebarTagItem
                key={tag.name}
                name={tag.name}
                count={tag.count}
              />
            ))}
          </div>
        </ScrollArea>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
