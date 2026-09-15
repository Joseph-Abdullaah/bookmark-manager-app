"use client"

import { usePathname } from "next/navigation"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import { SidebarTagItem } from "@/components/sidebar-tag-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { useBookmarkFilters } from "@/hooks/use-bookmark-filters"

export function SidebarTags() {
  const pathname = usePathname()
  const { archivedPath, tagCounts } = useBookmarkApp()
  const { tags: selected, toggleTag } = useBookmarkFilters()

  const tags = pathname === archivedPath ? tagCounts.archived : tagCounts.active
  const selectedKeys = new Set(selected.map((tag) => tag.toLowerCase()))

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-preset-4">TAGS</SidebarGroupLabel>
      <SidebarGroupContent>
        <ScrollArea className="h-[calc(100dvh-240px)]">
          {tags.length === 0 ? (
            <p className="text-preset-4-medium px-3 py-2 text-muted-foreground">
              No tags yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {tags.map(({ name, count }) => (
                <li key={name}>
                  <SidebarTagItem
                    id={name}
                    name={name}
                    count={count}
                    checked={selectedKeys.has(name.toLowerCase())}
                    onToggle={toggleTag}
                  />
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
