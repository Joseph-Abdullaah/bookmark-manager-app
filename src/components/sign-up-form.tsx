"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

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
import { Logo } from "./icons/logo"
import { authClient } from "@/lib/auth-client"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignUpForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignupFormValues) {
    setAuthError(null)

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (error) {
      setAuthError(error.message ?? "Something went wrong. Please try again.")
      return
    }

    // Signup was successful.
    // We can redirect to the dashboard later.
    console.log("Account created successfully.")
  }

  async function handleGoogleSignUp() {
    setAuthError(null)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })

    if (error) {
      setAuthError(error.message ?? "Unable to sign up with Google.")
    }
  }

  return (
    <Card className="rounded-lg md:px-3! md:py-10!" {...props}>
      <CardHeader>
        <div className="mb-8 flex items-center gap-2">
          <Logo />
          <h1 className="bold text-xl">Bookmark Manager</h1>
        </div>

        <CardTitle className="text-preset-1">Create an account</CardTitle>

        <CardDescription>
          Join us and start saving your favorite links — organized, searchable,
          and always within reach.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>

                  <Input
                    className="rounded-lg"
                    id="name"
                    type="text"
                    placeholder="John Doe"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    className="rounded-lg"
                    id="password"
                    type="password"
                    placeholder="Password"
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
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>

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

            <FieldGroup>
              <Field>
                <Button
                  className="rounded-lg"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>

                <Button
                  className="rounded-lg"
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={form.formState.isSubmitting}
                >
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
