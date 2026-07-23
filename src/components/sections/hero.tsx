import Link from "next/link"

import { Button } from "@/components/ui/button"
import { BrowserWindow } from "@/components/illustrations/browser-window"
import { DashboardPreview } from "@/components/illustrations/dashboard-preview"
import { HeroIllustration } from "@/components/illustrations/hero-illustration"
import { hero } from "@/content/landing-page"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-18 pb-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl leading-[1.06] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[58px]">
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button size="lg" className="h-13 rounded-xl px-7 text-base" render={<Link href={hero.primaryCta.href} />}>
              {hero.primaryCta.label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 rounded-xl px-7 text-base"
              render={<Link href={hero.secondaryCta.href} />}
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center">
          <HeroIllustration />
          <div className="relative z-10 w-full max-w-xl">
            <BrowserWindow url={hero.browserUrl}>
              <DashboardPreview className="h-[336px]" />
            </BrowserWindow>
          </div>
        </div>
      </div>
    </section>
  )
}
