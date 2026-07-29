import { Moon, Sun } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ThemeToggle() {
  return (
    <ToggleGroup
      className="w-fit gap-1! rounded-sm bg-background p-0.5"
      defaultValue={["light"]}
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
