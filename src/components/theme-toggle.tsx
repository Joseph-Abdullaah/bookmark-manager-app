"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMounted } from "@/lib/use-mounted"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  return (
    <ToggleGroup
      className="w-fit gap-1! rounded-sm bg-background p-0.5"
      // Until mounted the real theme is unknown, so render nothing selected.
      value={mounted && resolvedTheme ? [resolvedTheme] : []}
      onValueChange={(value) => {
        // Clicking the active item empties the group; keep the current theme.
        if (value[0]) setTheme(value[0])
      }}
    >
      <ToggleGroupItem
        className="cursor-pointer rounded-sm"
        value="light"
        aria-label="Light theme"
      >
        <Sun className="size-3.5" />
      </ToggleGroupItem>

      <ToggleGroupItem
        className="cursor-pointer rounded-sm"
        value="dark"
        aria-label="Dark theme"
      >
        <Moon className="size-3.5" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
