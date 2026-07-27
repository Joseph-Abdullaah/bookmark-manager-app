import { Logo } from "@/components/icons/logo"
export function SidebarBrand() {
  return (
    <div aria-label="Bookmark Manager" className="flex items-center gap-2">
      <Logo />
      <h1 className="text-xl font-bold tracking-[-1px]">Bookmark Manager</h1>
    </div>
  )
}
