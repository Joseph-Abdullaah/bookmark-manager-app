import type { Metadata } from "next"

import { HeroSection } from "@/components/sections/hero-section"
import { Problem } from "@/components/sections/problem"
import { Features } from "@/components/sections/features"
import { Showcase } from "@/components/sections/showcase"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Testimonials } from "@/components/sections/testimonial-section"
import { Faq } from "@/components/sections/faq-section"
import { Cta } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer-section"
export const metadata: Metadata = {
  title: "Bookmark Manager — Every bookmark, perfectly organized",
  description:
    "Save, tag, and search every link you find. Bookmark Manager keeps your whole web in one clean, fast workspace.",
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <HeroSection />
      <Problem />
      <Features />
      <Showcase />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </div>
  )
}
