import { ProblemIllustration } from "@/components/illustrations/problem-illustration"
import { Reveal } from "@/components/reveal"
import { problem } from "@/content/landing-page"

export function Problem() {
  return (
    <section id="problem" className="bg-muted/40 px-6 py-24">
      <Reveal className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <div>
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {problem.eyebrow}
          </p>
          <h2 className="font-heading text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl">
            {problem.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {problem.description}
          </p>
        </div>
        <ProblemIllustration />
      </Reveal>
    </section>
  )
}
