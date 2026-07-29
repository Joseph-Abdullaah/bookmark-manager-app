"use client"

import { LogOut, Palette } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "./ui/button"
export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src="./public/assets/images/image-avatar.webp" />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex w-62 flex-col gap-0.5 rounded-sm border p-0"
      >
        <div className="flex items-center gap-3 p-4 py-3">
          <Avatar className="size-10">
            <AvatarImage src="/public/assets/images/image-avatar.webp" />
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-preset-4">Emily Carter</p>
            <p className="text-preset-4-medium text-muted-foreground">
              emily101@email.com
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
        <DropdownMenuItem className="cursor-pointer px-2 py-1">
          <Button
            variant="ghost"
            className="text-preset-4 flex w-full cursor-pointer justify-start gap-2.5 rounded-md! p-2! md:rounded-md! lg:rounded-md!"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
