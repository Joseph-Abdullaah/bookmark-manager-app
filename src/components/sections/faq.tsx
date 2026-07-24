import { ChevronDown } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { faq } from "@/content/landing-page"

export function Faq() {
  return (
    <section id="faq" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-14 text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {faq.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {faq.title}
          </h2>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card open:pb-1"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-foreground marker:content-none">
                <span>{item.q}</span>
                <ChevronDown className="size-4.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-5.5 text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
