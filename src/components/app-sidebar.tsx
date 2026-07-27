import { Sidebar, SidebarHeader, SidebarContent } from "@/components/ui/sidebar"
import { SidebarBrand } from "@/components/sidebar-brand"
import { SidebarNav } from "@/components/sidebar-nav"
import { SidebarTags } from "@/components/sidebar-tags"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-5 pt-5">
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent className="flex flex-col px-2">
        <SidebarNav />
        <SidebarTags />
      </SidebarContent>
    </Sidebar>
  )
}
