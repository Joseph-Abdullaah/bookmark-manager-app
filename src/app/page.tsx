import type { Metadata } from "next"

import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Compatibility } from "@/components/sections/compatibility"
import { Problem } from "@/components/sections/problem"
import { Features } from "@/components/sections/features"
import { Showcase } from "@/components/sections/showcase"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Appearance } from "@/components/sections/appearance"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { Cta } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Bookmark Manager — Every bookmark, perfectly organized",
  description:
    "Save, tag, and search every link you find. Bookmark Manager keeps your whole web in one clean, fast workspace.",
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main>
        <Hero />
        <Compatibility />
        <Problem />
        <Features />
        <Showcase />
        <HowItWorks />
        <Appearance />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
