import { testimonials } from "@/content/landing-page"

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {testimonials.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item) => (
            <div
              key={item.name}
              className="flex h-full flex-col rounded-2xl rounded-bl border border-transparent bg-background p-6 ring-1 ring-foreground/10"
            >
              <p className="text-[15px] leading-relaxed text-foreground">
                “{item.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.initials}
                </div>
                <div>
                  <p className="text-preset-4 text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground/80">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}