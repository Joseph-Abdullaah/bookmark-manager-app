"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Archive, House } from "lucide-react"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function SidebarNav() {
  const pathname = usePathname()
  const { homePath, archivedPath } = useBookmarkApp()
  const { setOpenMobile } = useSidebar()

  const items = [
    { title: "Home", href: homePath, icon: House },
    { title: "Archived", href: archivedPath, icon: Archive },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                className="rounded-md"
                isActive={pathname === href}
                render={
                  <Link
                    href={href}
                    onClick={() => setOpenMobile(false)}
                    className="text-preset-3 flex items-center gap-2"
                  />
                }
              >
                <Icon className="size-4" />
                <span>{title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
