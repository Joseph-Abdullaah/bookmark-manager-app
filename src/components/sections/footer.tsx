import Link from "next/link"

import { Logo } from "@/components/icons/logo"
import { Separator } from "@/components/ui/separator"
import { footer, nav } from "@/content/landing-page"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-muted/40 px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-between gap-12 pb-12">
          <div className="max-w-70">
            <Link href="#top" className="flex items-center gap-2.5 text-preset-3 text-foreground">
              <Logo />
              {nav.logoLabel}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground/80">{footer.description}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-preset-5 mb-4 tracking-wide text-muted-foreground/80 uppercase">
                {column.title}
              </p>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <p className="text-[13px] text-muted-foreground/80">
            © {year} {footer.copyrightName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-muted-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
