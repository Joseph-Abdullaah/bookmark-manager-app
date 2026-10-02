"use client"

import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/icons/logo"
import Link from "next/link"

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
})

type ForgotFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotForm() {
  const [authError, setAuthError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: ForgotFormValues) {
    setAuthError(null)
    setMessage(null)

    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/reset-password",
    })

    if (error) {
      setAuthError(error.message ?? "Something went wrong. Please try again.")
      return
    }

    setMessage(
      "If an account exists with this email, we have sent you a password reset link."
    )

    form.reset()
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="rounded-xl md:px-3! md:py-10!">
        <CardHeader>
          <div className="mb-8 flex items-center gap-2">
            <Logo />
            <h1 className="bold text-xl">Bookmark Manager</h1>
          </div>
          <CardTitle className="text-preset-1">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address below and we’ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      className="rounded-lg"
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {authError && <FieldError>{authError}</FieldError>}{" "}
              {message && <FieldDescription> {message} </FieldDescription>}
              <Field>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="rounded-lg"
                  size={"lg"}
                  type="submit"
                >
                  {form.formState.isSubmitting
                    ? "Sending..."
                    : "Send Reset Link"}
                </Button>
                <FieldDescription className="text-center">
                  Remember your password? <Link href="/sign-in">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
