import Link from "next/link"

import { Logo } from "@/components/icons/logo"
import { footer, nav } from "@/content/landing-page"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-b bg-background pt-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              href="/"
              aria-label="go home"
              className="flex size-fit items-center gap-2.5 text-preset-3 text-foreground"
            >
              <Logo />
              <span>{nav.logoLabel}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground/80">
              {footer.description}
            </p>
          </div>

          <div className="col-span-3 grid grid-cols-3 gap-6">
            {footer.columns.map((column, index) => (
              <div key={index} className="space-y-4">
                <span className="text-preset-5 block font-medium text-muted-foreground/80 uppercase">
                  {column.title}
                </span>
                {column.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-sm text-muted-foreground duration-150 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="order-last block text-center text-sm text-muted-foreground md:order-first">
            © {year} {footer.copyrightName}. All rights reserved.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-muted-foreground hover:text-primary"
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