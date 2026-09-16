"use client"

import * as React from "react"
import { CalendarDays, Clock3, Eye, Pin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { BookmarkCardMenu } from "@/components/bookmark-card-menu"
import type { BookmarkItem } from "@/types/bookmark"

// UTC keeps server and client renders identical (no hydration mismatch).
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
})

const formatDate = (value: string) => dateFormat.format(new Date(value))

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export const BookmarkCard = React.memo(function BookmarkCard({
  bookmark,
}: {
  bookmark: BookmarkItem
}) {
  return (
    <Card className="flex h-68 w-full flex-col gap-0 rounded-xl! p-0! transition-shadow hover:shadow-lg">
      <div className="flex h-full flex-col justify-between">
        <CardHeader className="flex flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex min-w-0 gap-3">
              <Avatar className="size-11 shrink-0 rounded-xl! border after:rounded-xl!">
                <AvatarImage
                  className="size-11 rounded-xl! after:rounded-xl!"
                  src={bookmark.favicon ?? undefined}
                  alt=""
                />
                <AvatarFallback className="rounded-xl!">
                  {bookmark.title.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="text-preset-2 truncate">{bookmark.title}</h3>
                <p className="text-preset-5 truncate text-muted-foreground">
                  {hostname(bookmark.url)}
                </p>
              </div>
            </div>
            <BookmarkCardMenu bookmark={bookmark} />
          </div>
          <Separator />
          <p className="text-preset-4-medium line-clamp-3 text-muted-foreground">
            {bookmark.description ?? ""}
          </p>
          <ul className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="secondary"
                  className="text-preset-5 rounded-sm!"
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </CardHeader>
        <CardFooter className="w-full border-t px-0! py-0!">
          <div className="flex w-full items-center justify-between px-4 py-3 text-muted-foreground">
            <div className="flex items-center gap-5">
              <div
                className="text-preset-5 flex items-center gap-1"
                title="Visit count"
              >
                <Eye className="size-4" />
                <span>{bookmark.visitCount}</span>
              </div>
              <div
                className="text-preset-5 flex items-center gap-1"
                title="Last visited"
              >
                <Clock3 className="size-4" />
                <span>
                  {bookmark.lastVisited
                    ? formatDate(bookmark.lastVisited)
                    : "Never"}
                </span>
              </div>
              <div
                className="text-preset-5 flex items-center gap-1"
                title="Date added"
              >
                <CalendarDays className="size-4" />
                <span>{formatDate(bookmark.createdAt)}</span>
              </div>
            </div>
            {bookmark.pinned && (
              <div className="text-preset-5 flex items-center gap-1">
                <Pin className="size-4" />
                <span>Pinned</span>
              </div>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  )
})
