import { Suspense } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

/** Sidebar + header chrome shared by the real app and the demo. */
export function AppShell({
  banner,
  children,
}: {
  banner?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <NuqsAdapter>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 74)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset className="bg-app-background">
          {banner}
          <AppHeader />
          <Suspense>{children}</Suspense>
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  )
}
