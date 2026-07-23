"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icons/logo"
import { nav } from "@/content/landing-page"
import { useMounted } from "@/lib/use-mounted"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-lg">
      <div className="mx-auto flex h-19 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="#top" className="flex shrink-0 items-center gap-2.5 text-preset-3 text-foreground">
          <Logo />
          {nav.logoLabel}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3.5 md:flex">
          <ThemeToggle />
          <Link
            href={nav.loginHref}
            className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {nav.loginLabel}
          </Link>
          <Button size="lg" className="rounded-xl" render={<Link href={nav.ctaHref} />}>
            {nav.ctaLabel}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-border px-6 py-3 md:hidden">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-medium text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.loginHref}
            onClick={() => setMenuOpen(false)}
            className="py-3 text-base font-medium text-muted-foreground"
          >
            {nav.loginLabel}
          </Link>
          <Button
            size="lg"
            className="mt-2 w-full rounded-xl"
            render={<Link href={nav.ctaHref} onClick={() => setMenuOpen(false)} />}
          >
            {nav.ctaLabel}
          </Button>
        </div>
      )}
    </header>
  )
}
