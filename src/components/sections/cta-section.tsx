import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cta } from "@/content/landing-page"

export function Cta() {
  return (
    <section id="get-started" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
            {cta.title}
          </h2>
          <p className="mt-4 text-lg text-balance text-muted-foreground">
            {cta.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={cta.ctaHref} />}
            >
              {cta.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
