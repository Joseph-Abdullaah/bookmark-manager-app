// Stylized mock-up of the Bookmark Manager workspace.
// Built from live theme tokens (not a screenshot) so it re-renders correctly
// in light or dark mode automatically, including inside a locally scoped
// `.dark` wrapper such as the appearance-toggle preview.

const NAV_ITEMS = [
  { width: "60%", active: true },
  { width: "45%", active: false },
  { width: "70%", active: false },
  { width: "40%", active: false },
]

const CARD_TAGS = ["w-10", "w-14", "w-8", "w-12", "w-9", "w-14"]

function FaviconDot({ tone }: { tone: "primary" | "muted" }) {
  return (
    <span
      className={`size-5 shrink-0 rounded-md ${
        tone === "primary" ? "bg-primary/70" : "bg-muted-foreground/30"
      }`}
    />
  )
}

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex size-full min-h-0 bg-background text-foreground ${className ?? ""}`}
    >
      <div className="hidden w-[26%] shrink-0 flex-col gap-1 border-r border-border bg-muted/40 p-3 sm:flex">
        <div className="mb-2 h-4 w-2/3 rounded bg-foreground/20" />
        {NAV_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`flex h-6 items-center rounded-md px-2 ${
              item.active ? "bg-primary/15" : ""
            }`}
          >
            <span
              className={`h-2 rounded-full ${
                item.active ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              style={{ width: item.width }}
            />
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
        <div className="flex h-7 shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3">
          <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/40" />
          <span className="h-1.5 w-1/3 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
          {CARD_TAGS.map((tagWidth, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-2"
            >
              <div className="flex items-center gap-1.5">
                <FaviconDot tone={index % 3 === 0 ? "primary" : "muted"} />
                <span className="h-1.5 flex-1 rounded-full bg-foreground/20" />
              </div>
              <span className="h-1.5 w-4/5 rounded-full bg-muted-foreground/20" />
              <span className={`h-1.5 ${tagWidth} rounded-full bg-primary/25`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SidebarPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex size-full flex-col gap-1.5 bg-muted/40 p-4 ${className ?? ""}`}
    >
      <div className="mb-1 h-4 w-1/2 rounded bg-foreground/20" />
      {NAV_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`flex h-7 items-center gap-2 rounded-md px-2 ${
            item.active ? "bg-primary/15" : ""
          }`}
        >
          <span
            className={`size-3 shrink-0 rounded-sm ${
              item.active ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
          <span
            className={`h-2 rounded-full ${
              item.active ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            style={{ width: item.width }}
          />
        </div>
      ))}
    </div>
  )
}

export function BookmarkCardPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex size-full items-center bg-background p-4 ${className ?? ""}`}
    >
      <div className="flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <FaviconDot tone="primary" />
          <span className="h-2 w-2/3 rounded-full bg-foreground/25" />
        </div>
        <span className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
        <span className="h-1.5 w-3/5 rounded-full bg-muted-foreground/20" />
        <span className="h-1.5 w-12 rounded-full bg-primary/25" />
      </div>
    </div>
  )
}

export function SearchBarPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex size-full flex-col justify-center gap-2 bg-background p-4 ${className ?? ""}`}
    >
      <div className="flex h-8 items-center gap-2 rounded-full border border-border bg-card px-3">
        <span className="size-3 shrink-0 rounded-full bg-muted-foreground/40" />
        <span className="h-1.5 w-1/2 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex gap-2">
        <span className="h-5 w-14 rounded-full bg-primary/20" />
        <span className="h-5 w-10 rounded-full bg-muted-foreground/20" />
        <span className="h-5 w-12 rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  )
}
