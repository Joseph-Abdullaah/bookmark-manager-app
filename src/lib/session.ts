import "server-only"

import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

/** Per-request memoised session so layout + page share a single lookup. */
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
)

export async function requireSession() {
  const session = await getSession()
  if (!session) redirect("/sign-in")
  return session
}
