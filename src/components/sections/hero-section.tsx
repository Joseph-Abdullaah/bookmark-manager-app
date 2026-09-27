"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/sections/header"
import Image from "next/image"
import { hero } from "@/content/landing-page"
import { useTheme } from "next-themes"
import { useMounted } from "@/lib/use-mounted"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const screenSrc =
    mounted && resolvedTheme === "dark"
      ? "/assets/images/desktop-dark.png"
      : "/assets/images/desktop-light.png"

  return (
    <>
      <Header />
      <main className="[--color-primary:var(--color-indigo-500)]">
        <section className="overflow-hidden">
          <div className="py-20 md:py-36">
            <div className="relative z-10 mx-auto max-w-5xl px-6">
              <div className="relative text-center">
                <h1 className="mx-auto max-w-2xl text-4xl font-bold text-balance md:text-5xl">
                  {hero.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                <p className="mx-auto my-6 max-w-2xl text-xl text-balance text-muted-foreground">
                  {hero.description}
                </p>

                <div className="flex flex-col items-center justify-center gap-3 *:w-full sm:flex-row sm:*:w-auto">
                  <Button
                    nativeButton={false}
                    size="lg"
                    render={
                      <Link href={hero.primaryCta.href}>
                        <span className="text-nowrap">
                          {hero.primaryCta.label}
                        </span>
                      </Link>
                    }
                  />
                  <Button
                    key={2}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    render={
                      <Link href={hero.secondaryCta.href}>
                        <span className="text-nowrap">
                          {hero.secondaryCta.label}
                        </span>
                      </Link>
                    }
                  />
                </div>
              </div>

              <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-black/10 md:mt-20">
                <Image
                  src="https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  fill
                  sizes="90vw"
                  priority
                  className="absolute inset-0 size-full object-cover"
                />

                <div className="relative m-4 overflow-hidden rounded-(--radius) border border-transparent bg-background shadow-xl ring-1 shadow-black/15 ring-black/10 sm:m-8 md:m-12">
                  <Image
                    src={screenSrc}
                    alt="app screen"
                    width="1440"
                    height="960"
                    className="size-full object-cover object-top-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
