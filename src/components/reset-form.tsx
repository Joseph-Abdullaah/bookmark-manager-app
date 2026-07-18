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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/icons/logo"
import Link from "next/link"
export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-xl md:px-3! md:py-10!">
        <CardHeader>
          <div className="flex items-center gap-2 mb-8">
            <Logo />
            <h1 className="text-xl bold">Bookmark Manager</h1>
          </div>
          <CardTitle className="text-preset-1">Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below. Make sure it’s strong and secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  
                </div>
                <Input className="rounded-lg" id="password" type="password" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Conform Password</FieldLabel>
                  
                </div>
                <Input className="rounded-lg" id="password" type="password" required />
              </Field>
              <Field>
                <Button className="rounded-lg" size={"lg"} type="submit">Reset Password</Button>
                <FieldDescription className="text-center">
                  Back to Login <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
