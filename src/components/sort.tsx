"use client"

import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useBookmarkFilters } from "@/hooks/use-bookmark-filters"
import {
  SORT_KEYS,
  SORT_LABELS,
  type SortKey,
} from "@/lib/bookmark-search-params"

export function Sort() {
  const { sort, setSort } = useBookmarkFilters()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="text-preset-4 cursor-pointer" variant="outline">
            <ArrowUpDown /> Sort by
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-50">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => setSort(value as SortKey)}
          >
            {SORT_KEYS.map((key) => (
              <DropdownMenuRadioItem key={key} value={key}>
                {SORT_LABELS[key]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
