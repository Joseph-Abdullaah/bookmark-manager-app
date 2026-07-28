"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
export function MobileTrigger() {
  return (
    <div className="size-fit cursor-pointer rounded-lg border hover:bg-muted md:hidden">
      <SidebarTrigger className="cursor-pointer p-5!" />
    </div>
  )
}
