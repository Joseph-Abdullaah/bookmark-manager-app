import { BrowserWindow } from "@/components/illustrations/browser-window"
import {
  BookmarkCardPreview,
  DashboardPreview,
  SearchBarPreview,
  SidebarPreview,
} from "@/components/illustrations/dashboard-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { showcase } from "@/content/landing-page"
import { lucideIconMap } from "@/lib/lucide-icon-map"

const CALLOUT_POSITION = {
  "top-left": "top-[12%] left-[2%]",
  "top-right": "top-[2%] left-[38%]",
  "bottom-right": "top-[52%] right-[2%] flex-row-reverse text-right",
} as const

function Callout({
  text,
  position,
}: {
  text: string
  position: keyof typeof CALLOUT_POSITION
}) {
  return (
    <div
      className={`absolute z-10 hidden max-w-[190px] items-center gap-2.5 lg:flex ${CALLOUT_POSITION[position]}`}
    >
      <span className="relative size-2.5 shrink-0">
        <span className="absolute -inset-1.5 rounded-full bg-primary opacity-25" />
        <span className="absolute inset-0 rounded-full bg-primary" />
      </span>
      <span className="rounded-lg border border-border bg-card px-3 py-2 text-[13px] font-semibold text-foreground shadow-sm">
        {text}
      </span>
    </div>
  )
}

const DETAIL_PREVIEWS = [SidebarPreview, BookmarkCardPreview, SearchBarPreview]

export function Showcase() {
  return (
    <section id="showcase" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {showcase.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {showcase.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {showcase.description}
          </p>
        </Reveal>

        <Reveal className="relative mx-auto mb-14 max-w-3xl">
          <BrowserWindow url={showcase.browserUrl}>
            <DashboardPreview className="h-[420px]" />
          </BrowserWindow>
          {showcase.callouts.map((callout) => (
            <Callout key={callout.text} text={callout.text} position={callout.position} />
          ))}
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {showcase.details.map((detail, index) => {
            const Preview = DETAIL_PREVIEWS[index]
            const Icon = lucideIconMap[detail.icon]
            return (
              <Reveal key={detail.title}>
                <Card className="overflow-hidden rounded-2xl">
                  <Preview className="h-[130px]" />
                  <CardContent className="pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="size-4 text-primary" />
                      <p className="text-preset-4 text-foreground">{detail.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {detail.description}
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
