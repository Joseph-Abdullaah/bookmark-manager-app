"use client"

import { MobileTrigger } from "@/components/mobile-trigger"
import { SearchInput } from "@/components/search-input"
import { AddBookmarkDialog } from "@/components/add-bookmark-dialog"
import { ProfileMenu } from "@/components/profile-menu"

export function AppHeader() {
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-sidebar px-4 py-3! md:px-8 md:py-4">
      <MobileTrigger />
      <SearchInput />
      <div className="ml-auto flex items-center gap-4">
        <AddBookmarkDialog />
        <ProfileMenu />
      </div>
    </header>
  )
}