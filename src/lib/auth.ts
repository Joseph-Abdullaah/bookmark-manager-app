import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import { Resend } from "resend"
import { PasswordReset } from "@/components/email/password-reset"
import { EmailVerification } from "@/components/email/email-verification"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Bookmark Manager <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email",
        react: EmailVerification({ verifyHref: url, email: user.email }),
      })
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 30 * 60, // 30 minutes
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Bookmark Manager <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        react: PasswordReset({ resetUrl: url }),
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
