import type { Metadata } from "next"
import Link from "next/link"

import { AppShell } from "@/components/app-shell"
import { DemoProvider } from "@/components/demo-provider"
import { getDemoBookmarks } from "@/lib/demo-data"

// URL state (search, tags, sort, page) is read per request, so skip prerendering.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Demo — Bookmark Manager",
  description: "Try Bookmark Manager with sample data. No account needed.",
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider initial={getDemoBookmarks()}>
      <AppShell
        banner={
          <div className="text-preset-4-medium flex flex-wrap items-center justify-center gap-x-2 bg-primary px-4 py-2 text-center text-primary-foreground">
            <span>
              You are exploring a demo. Changes are not saved and adding
              bookmarks is disabled.
            </span>
            <Link href="/sign-up" className="text-preset-4 underline">
              Create a free account
            </Link>
          </div>
        }
      >
        {children}
      </AppShell>
    </DemoProvider>
  )
}
