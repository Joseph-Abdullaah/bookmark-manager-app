"use client"

import Link from "next/link"
import { LogOut, Palette, UserPlus } from "lucide-react"

import { useBookmarkApp } from "@/components/bookmark-app-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"

// Only the demo uses a static avatar; real users get theirs from the backend.
const DEMO_AVATAR_SRC = "/assets/images/image-avatar.webp"

type ProfileMenuViewProps = {
  name: string
  email: string
  image?: string | null
  action: React.ReactNode
}

function ProfileMenuView({ name, email, image, action }: ProfileMenuViewProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open profile menu"
        className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={image ?? undefined} alt="" />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex w-62 flex-col gap-0.5 rounded-sm border p-0"
      >
        <div className="flex items-center gap-3 p-4 py-3">
          <Avatar className="size-10">
            <AvatarImage src={image ?? undefined} alt="" />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-0.5">
            <p className="text-preset-4 truncate">{name}</p>
            <p className="text-preset-4-medium truncate text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
        <Separator />
        <div className="px-2 py-1">
          <div className="flex items-center justify-between px-2">
            <div className="text-preset-4 flex items-center gap-2.5">
              <Palette className="size-4" />
              <span>Theme</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <Separator />
        {action}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LiveProfileMenu() {
  const { data: session, isPending } = authClient.useSession()

  async function handleSignOut() {
    const { error } = await authClient.signOut()
    if (error) {
      console.error(error)
      return
    }
    window.location.href = "/sign-in"
  }

  if (isPending || !session?.user) {
    return <Skeleton className="size-10 rounded-full" />
  }

  return (
    <ProfileMenuView
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
      action={
        <DropdownMenuItem
          className="text-preset-4 flex cursor-pointer items-center gap-2.5 px-4 py-3"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      }
    />
  )
}

function DemoProfileMenu() {
  return (
    <ProfileMenuView
      name="Demo User"
      email="demo@bookmarkmanager.app"
      image={DEMO_AVATAR_SRC}
      action={
        <DropdownMenuItem
          className="text-preset-4 cursor-pointer px-4 py-3"
          render={
            <Link href="/sign-up" className="flex items-center gap-2.5" />
          }
        >
          <UserPlus className="size-4" />
          Create your account
        </DropdownMenuItem>
      }
    />
  )
}

export function ProfileMenu() {
  const { mode } = useBookmarkApp()
  return mode === "demo" ? <DemoProfileMenu /> : <LiveProfileMenu />
}
