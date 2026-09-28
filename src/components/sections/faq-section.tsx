"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from "@/content/landing-page"

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <p className="text-preset-5 mb-4 tracking-wide text-primary uppercase">
            {faq.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {faq.title}
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion className="w-full rounded-(--radius) border border-transparent bg-card px-8 py-3 shadow ring-1 ring-foreground/5">
            {faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-dotted"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}