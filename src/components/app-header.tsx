"use client"

import { MobileTrigger } from "@/components/mobile-trigger"
import { SearchInput } from "@/components/search-input"
import { AddBookmarkButton } from "@/components/add-bookmark-button"
import { ProfileMenu } from "@/components/profile-menu"

export function AppHeader() {
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-sidebar px-6">
      <MobileTrigger />
      <SearchInput />
      <div className="ml-auto flex items-center gap-4">
        <AddBookmarkButton />
        <ProfileMenu />
      </div>
    </header>
  )
}
