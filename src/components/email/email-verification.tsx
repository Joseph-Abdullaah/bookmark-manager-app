import { Section, Text } from "react-email"

import { EmailButton } from "@/components/email/email-button"
import { EmailShell } from "@/components/email/email-shell"

interface Props {
  verifyHref?: string
  email?: string
}

export const EmailVerification = ({ verifyHref = "#", email }: Props) => (
  <EmailShell preview="Verify your email for Bookmark Manager">
    <Section className="py-12">
      <Text className="font-20 text-fg mb-6">
        {email ? `Verify your email for ${email}` : "Verify your email"}
      </Text>
      <Text className="font-16 text-fg-2 mb-6">
        Thanks for signing up for Bookmark Manager. Click the button below to
        verify your email address.
      </Text>
    </Section>

    <Section className="py-12">
      <EmailButton href={verifyHref} label="Verify email" size="md" />
    </Section>

    <Text className="font-13 text-fg-3 mt-8">
      If you didn&apos;t create an account, you can safely ignore this email.
    </Text>
  </EmailShell>
)
