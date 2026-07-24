import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { features } from "@/content/landing-page"
import { lucideIconMap } from "@/lib/lucide-icon-map"

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {features.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {features.description}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item) => {
            const Icon = lucideIconMap[item.icon]
            return (
              <Reveal key={item.title}>
                <Card className="h-full rounded-[20px]">
                  <CardContent className="flex h-full flex-col">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-muted">
                      <Icon className="size-[22px] text-primary" />
                    </div>
                    <h3 className="text-preset-3 text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
