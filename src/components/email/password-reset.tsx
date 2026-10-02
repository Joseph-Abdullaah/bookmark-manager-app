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
  resetUrl: string
}

export const PasswordReset = ({ resetUrl }: Props) => {
  const t = defaultTheme

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind config={createEmailTailwindConfig(t)}>
        <Body className="bg-background font-sans">
          <Container className="max-w-container mx-auto p-8">
            <Section className="py-12">
              <Text className="mb-6 text-xl font-medium text-foreground">
                Reset your password
              </Text>
              <Text className="text-foreground-muted mb-2 text-base leading-snug">
                We received a request to reset your password for your Bookmark
                Manager account. Click the button below to choose a new
                password. This link expires in 30 minutes.
              </Text>
            </Section>

            <Section className="py-4">
              <Button
                href={resetUrl}
                className="text-primary-fg inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium no-underline"
              >
                Reset password
              </Button>
            </Section>
            <Section>
              <Text>
                If the button above does not work, copy and paste the following
                link into your web browser:
              </Text>
              <Text className="text-foreground-muted text-sm break-all">
                {resetUrl}
              </Text>
            </Section>

            <Text className="text-foreground-muted mt-8 text-sm">
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
