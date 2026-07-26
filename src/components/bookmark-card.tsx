"use client";

import { CalendarDays, Clock3, Eye, Pin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { BookmarkCardMenu } from "@/components/bookmark-card-menu";
// import { AppCardProps } from "./types";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

const cardData = [
  {
    title: "Frontend Mentor",
    url: "frontendmentor.io",
    favicon: "./assets/images/favicon-frontend-mentor.png",
    description:
      "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    pinned: true,
    isArchived: false,
    visitCount: 47,
    createdAt: "2024-01-15T10:30:00Z",
    lastVisited: "2025-09-23T14:45:00Z",
  },
];

export function BookmarkCard() {
  return (
    <Card className="flex w-full max-w-85.75 flex-col gap-0 rounded-xl! p-0! transition-all hover:shadow-lg md:max-w-84 lg:max-w-84.5">
      {/* Header */}
      {cardData.map((card, index) => (
        <div key={index}>
          <CardHeader className="flex flex-col gap-4 p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-3">
                <Avatar className="size-11 rounded-xl! border after:rounded-xl!">
                  <AvatarImage
                    className="size-11 rounded-xl! after:rounded-xl!"
                    src={card.favicon}
                    alt="Bookmark Logo"
                  />
                  <AvatarFallback>FM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-preset-2">{card.title}</h3>
                  <p className="text-preset-5 text-muted-foreground">{card.url}</p>
                </div>
              </div>
              <BookmarkCardMenu />
            </div>
            <Separator />
            {/* Description */}
            <p className="text-preset-4-medium text-muted-foreground">
              {card.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-sm! text-preset-5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardFooter className="w-full border-t px-4 py-3">
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1 text-preset-5">
                  <Eye className="size-4" />
                  <span>{card.visitCount}</span>
                </div>
                <div className="flex items-center gap-1 text-preset-5">
                  <Clock3 className="size-4" />
                  <span>{formatDate(card.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1 text-preset-5">
                  <CalendarDays className="size-4" />
                  <span>{formatDate(card.lastVisited)}</span>
                </div>
              </div>
              {card.pinned && (
                <div className="flex items-center gap-1 text-preset-5">
                  <Pin className="size-4" />
                  <span>Pinned</span>
                </div>
              )}
            </div>
          </CardFooter>
        </div>
      ))}
    </Card>
  );
}