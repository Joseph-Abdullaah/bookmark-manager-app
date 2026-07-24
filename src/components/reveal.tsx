"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
}

// Fades + slides a section into view on scroll. Content always renders
// visible by default (SSR-safe, no-JS-safe); it is only hidden client-side
// for sections that start below the fold, and respects reduced-motion.
export function Reveal({ children, className }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const alreadyVisible = node.getBoundingClientRect().top < window.innerHeight * 0.92

    if (prefersReducedMotion || alreadyVisible) {
      return
    }

    setHidden(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}
