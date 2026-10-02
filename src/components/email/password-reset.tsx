import { Section, Text } from "react-email"

import { EmailButton } from "@/components/email/email-button"
import { EmailShell } from "@/components/email/email-shell"

interface Props {
  resetUrl: string
}

export const PasswordReset = ({ resetUrl }: Props) => (
  <EmailShell preview="Reset your password">
    <Section className="py-12">
      <Text className="font-20 text-fg mb-6">Reset your password</Text>
      <Text className="font-16 text-fg-2 mb-6">
        We received a request to reset your password for your Bookmark Manager
        account. Click the button below to choose a new password. This link
        expires in 30 minutes.
      </Text>
    </Section>

    <Section className="py-12">
      <EmailButton href={resetUrl} label="Reset password" size="md" />
    </Section>

    <Text className="font-14 text-fg-3">
      If the button above does not work, copy and paste the following link into
      your web browser:
    </Text>
    <Text className="font-14 text-fg-3 break-all">{resetUrl}</Text>

    <Text className="font-13 text-fg-3 mt-8">
      If you didn&apos;t request this, you can safely ignore this email.
    </Text>
  </EmailShell>
)
