"use client"

import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

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

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const [authError, setAuthError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: ResetPasswordValues) {
    setAuthError(null)

    if (!token) {
      setAuthError("This password reset link is invalid or expired.")
      return
    }

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    })

    if (error) {
      setAuthError(
        error.message ??
          "Unable to reset your password. The link may have expired."
      )
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push("/sign-in")
    }, 2000)
  }

  if (success) {
    return (
      <Card className="rounded-lg md:px-3! md:py-10!">
        {" "}
        <CardHeader>
          {" "}
          <div className="mb-8 flex items-center gap-2">
            {" "}
            <Logo /> <h1 className="bold text-xl"> Bookmark Manager </h1>{" "}
          </div>{" "}
          <CardTitle className="text-preset-1">
            {" "}
            Password reset successful{" "}
          </CardTitle>{" "}
          <CardDescription>
            {" "}
            Your password has been changed successfully. Redirecting you to sign
            in...{" "}
          </CardDescription>{" "}
        </CardHeader>{" "}
      </Card>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="rounded-xl md:px-3! md:py-10!">
        <CardHeader>
          <div className="mb-8 flex items-center gap-2">
            <Logo />
            <h1 className="bold text-xl">Bookmark Manager</h1>
          </div>
          <CardTitle className="text-preset-1">Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it’s strong and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">New Password</FieldLabel>
                    </div>
                    <Input
                      className="rounded-lg"
                      id="password"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                    </div>
                    <Input
                      className="rounded-lg"
                      id="confirmPassword"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {authError && <FieldError>{authError}</FieldError>}
              <Field>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="rounded-lg"
                  size={"lg"}
                  type="submit"
                >
                  {form.formState.isSubmitting
                    ? "Resetting..."
                    : "Reset Password"}
                </Button>
                <FieldDescription className="text-center">
                  Back to Login <Link href="/sign-in">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
