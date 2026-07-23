import { Reveal } from "@/components/reveal"
import { howItWorks } from "@/content/landing-page"
import { lucideIconMap } from "@/lib/lucide-icon-map"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-18 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {howItWorks.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {howItWorks.title}
          </h2>
        </Reveal>

        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8">
          {howItWorks.steps.map((step) => {
            const Icon = lucideIconMap[step.icon]
            return (
              <Reveal
                key={step.title}
                className="max-w-60 flex-1 basis-55 text-center"
              >
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className="size-6 text-primary" />
                </div>
                <p className="text-preset-5 mb-2 text-primary">{step.step}</p>
                <h3 className="text-[19px] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
