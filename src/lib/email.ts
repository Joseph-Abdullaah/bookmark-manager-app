import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: "Bookmark Manager <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Bookmark Manager password",
    html: `<h2>Reset your password</h2>

      <p>
        We received a request to reset your Bookmark Manager password.
      </p>
      <p>
        Click the button below to choose a new password.
      </p>

      <p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      </p>

      <p>
        If you didn't request this, you can safely ignore this email.
      </p>`,
  })
}
