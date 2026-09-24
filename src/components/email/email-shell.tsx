import type { ReactNode } from "react"
import { Body, Container, Head, Html, Preview, Tailwind } from "react-email"

import { createEmailTailwindConfig } from "@/components/email/email-theme"
import type { EmailTheme } from "@/components/email/email-theme"
import { DefaultFonts } from "@/components/email/font-default"
import { defaultTheme } from "@/components/email/theme-default"

interface Props {
  children: ReactNode
  preview: string
  theme?: EmailTheme
}

export const EmailShell = ({
  children,
  preview,
  theme = defaultTheme,
}: Props) => (
  <Html>
    <Head>
      <DefaultFonts />
    </Head>
    <Preview>{preview}</Preview>
    <Tailwind config={createEmailTailwindConfig(theme)}>
      <Body className="bg-bg m-0 font-sans">
        <Container className="max-w-email mx-auto p-8">{children}</Container>
      </Body>
    </Tailwind>
  </Html>
)
