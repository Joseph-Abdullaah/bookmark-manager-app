"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { BrowserWindow } from "@/components/illustrations/browser-window"
import { DashboardPreview } from "@/components/illustrations/dashboard-preview"
import { Reveal } from "@/components/reveal"
import { appearance } from "@/content/landing-page"

export function Appearance() {
  const [previewTheme, setPreviewTheme] = React.useState<"light" | "dark">("dark")

  return (
    <section className="bg-muted/40 px-6 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
          {appearance.eyebrow}
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {appearance.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {appearance.description}
        </p>

        <div className="mt-9 mb-9 inline-flex gap-1 rounded-full border border-border bg-card p-1.5">
          <button
            type="button"
            onClick={() => setPreviewTheme("light")}
            aria-pressed={previewTheme === "light"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              previewTheme === "light"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sun className="size-3.5" />
            Light
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme("dark")}
            aria-pressed={previewTheme === "dark"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              previewTheme === "dark"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Moon className="size-3.5" />
            Dark
          </button>
        </div>

        <div className={cn("mx-auto max-w-xl", previewTheme === "dark" && "dark")}>
          <BrowserWindow url={appearance.browserUrl}>
            <DashboardPreview className="h-[336px]" />
          </BrowserWindow>
        </div>
      </Reveal>
    </section>
  )
}
