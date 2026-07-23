import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CtaPattern } from "@/components/illustrations/cta-pattern"
import { Reveal } from "@/components/reveal"
import { cta } from "@/content/landing-page"

export function Cta() {
  return (
    <section id="get-started" className="relative overflow-hidden bg-primary px-6 py-24">
      <CtaPattern />
      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/85">
          {cta.description}
        </p>
        <Button
          size="lg"
          className="mt-9 h-13 rounded-xl bg-background px-8 text-base text-foreground hover:bg-background/90"
          render={<Link href={cta.ctaHref} />}
        >
          {cta.ctaLabel}
        </Button>
      </Reveal>
    </section>
  )
}
