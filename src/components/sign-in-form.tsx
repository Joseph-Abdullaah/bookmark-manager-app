"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

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
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
})

type SignInFormValues = z.infer<typeof loginSchema>

export function SignInForm() {
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInFormValues) {
    setAuthError(null)

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setAuthError(error.message ?? "Invalid email or password.")
    }

    console.log("Signed in successfully.")
    router.push("/dashboard")
  }

  async function handleGoogleSignIn() {
    setAuthError(null)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })

    if (error) {
      setAuthError(error.message ?? "Unable to sign in with Google.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="rounded-xl md:px-3! md:py-10!">
        <CardHeader>
          <div className="mb-8 flex items-center gap-2">
            <Logo />
            <h1 className="bold text-xl">Bookmark Manager</h1>
          </div>
          <CardTitle className="text-preset-1">Login to your account</CardTitle>
          <CardDescription>
            Welcome back! Please enter your details.
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
                      required
                      {...field}
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
                  <Field data-invalied={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      className="rounded-lg"
                      id="password"
                      type="password"
                      required
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {authError && <FieldError>{authError}</FieldError>}

              <Field>
                <Button className="rounded-lg" size={"lg"} type="submit">
                  Sign In
                </Button>
                <Button
                  className="rounded-lg"
                  size={"lg"}
                  variant="outline"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  Sign In with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
