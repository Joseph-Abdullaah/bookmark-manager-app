import { ProblemIllustration } from "@/components/illustrations/problem-illustration"
import { Card } from "@/components/ui/card"
import { problem } from "@/content/landing-page"

export function Problem() {
  return (
    <section id="problem" className="bg-muted/40 py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div>
          <p className="text-preset-5 mb-2 tracking-wide text-primary uppercase">
            {problem.eyebrow}
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-foreground">
            {problem.title}
          </h2>
          <p className="mt-4 mb-12 text-lg text-balance text-muted-foreground">
            {problem.description}
          </p>
        </div>

        <Card className="p-6">
          <div className="flex aspect-video items-center justify-center">
            <ProblemIllustration className="w-full" />
          </div>
        </Card>
      </div>
    </section>
  )
}