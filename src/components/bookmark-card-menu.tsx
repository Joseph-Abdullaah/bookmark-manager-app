"use client";

import {
  MoreVertical,
  SquarePen,
  Copy,
  Pin,
  Archive,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function BookmarkCardMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-lg cursor-pointer"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer">
          <ExternalLink className="mr-2 size-4" />
          Visit
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Copy className="mr-2 size-4" />
          Copy URL
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Pin className="mr-2 size-4" />
          Unpin
        </DropdownMenuItem>


        <DropdownMenuItem className="cursor-pointer">
          <SquarePen className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>


        <DropdownMenuItem className="cursor-pointer">
          <Archive className="mr-2 size-4" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}