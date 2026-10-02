import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email"

import { createEmailTailwindConfig } from "@/components/email/email-theme"
import { defaultTheme } from "@/components/email/theme-default"

interface Props {
  verifyHref?: string
  email?: string
}

export const EmailVerification = ({ verifyHref = "#", email }: Props) => {
  const t = defaultTheme

  return (
    <Html>
      <Head />
      <Preview>Verify your email for Bookmark Manager</Preview>
      <Tailwind config={createEmailTailwindConfig(t)}>
        <Body className="bg-background font-sans">
          <Container className="max-w-container mx-auto p-8">
            <Section className="py-12">
              <Text className="mb-6 text-xl font-medium text-foreground">
                Verify your email {email}
              </Text>
              <Text className="text-foreground-muted mb-6 text-base leading-snug">
                Thanks for signing up for Bookmark Manager. Click the button
                below to verify your email address.
              </Text>
            </Section>

            <Section className="py-12">
              <Button
                href={verifyHref}
                className="text-primary-fg inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium no-underline"
              >
                Verify email
              </Button>
            </Section>

            <Text className="text-foreground-muted mt-8 text-sm">
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
