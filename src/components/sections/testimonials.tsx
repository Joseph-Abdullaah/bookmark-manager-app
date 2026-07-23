import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { testimonials } from "@/content/landing-page"

const AVATAR_TONES = ["bg-primary", "bg-primary/80", "bg-primary/60"]

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {testimonials.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {testimonials.title}
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.items.map((item, index) => (
            <Reveal key={item.name} className="max-w-85 flex-1 basis-70">
              <Card className="h-full rounded-2xl">
                <CardContent>
                  <p className="text-[15px] leading-relaxed text-foreground">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-preset-4 text-foreground">{item.name}</p>
                      <p className="text-[13px] text-muted-foreground/80">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
