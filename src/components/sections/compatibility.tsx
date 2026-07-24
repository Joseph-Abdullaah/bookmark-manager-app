import { Globe } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { compatibility } from "@/content/landing-page"

export function Compatibility() {
  return (
    <section className="px-6 pt-6 pb-16">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-preset-5 text-center tracking-wide text-muted-foreground/80 uppercase">
          {compatibility.label}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-11">
          {compatibility.browsers.map((browser) => (
            <div
              key={browser}
              className="flex flex-col items-center gap-2.5 opacity-90"
            >
              <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card">
                <Globe className="size-4.5 text-muted-foreground/70" />
              </div>
              <span className="text-[13px] font-medium text-muted-foreground/80">
                {browser}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
