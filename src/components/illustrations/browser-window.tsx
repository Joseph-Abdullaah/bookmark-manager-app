// Decorative macOS/Chrome-style browser chrome used to frame product previews.
// Purely presentational — the tab title and URL are static dressing, not real navigation.

type BrowserWindowProps = {
  url: string
  title?: string
  className?: string
  children?: React.ReactNode
}

export function BrowserWindow({
  url,
  title = "Bookmark Manager",
  className,
  children,
}: BrowserWindowProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-full flex-col overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.1)] ${className ?? ""}`}
    >
      <div className="flex h-11 items-center gap-1 bg-[#202124] pr-2">
        <div className="flex items-center gap-2 px-3.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-full flex-1 items-end pl-1">
          <div className="relative flex h-[34px] min-w-[120px] max-w-[220px] items-center gap-2 rounded-t-lg bg-[#35363a] px-3 font-sans text-xs text-[#e8eaed]">
            <span className="size-3.5 shrink-0 rounded-full bg-[#5f6368]" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-10 items-center gap-1 bg-[#35363a] px-2">
        <div className="flex size-7 items-center justify-center">
          <span className="size-4 rounded-full bg-[#9aa0a6] opacity-40" />
        </div>
        <div className="mx-1.5 flex h-[30px] flex-1 items-center gap-2 rounded-full bg-[#282a2d] px-3.5">
          <span className="size-3 shrink-0 rounded-full bg-[#9aa0a6] opacity-40" />
          <span className="truncate font-sans text-[13px] text-[#e8eaed]">{url}</span>
        </div>
        <div className="flex size-7 items-center justify-center">
          <span className="size-4 rounded-full bg-[#9aa0a6] opacity-40" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-background">{children}</div>
    </div>
  )
}
