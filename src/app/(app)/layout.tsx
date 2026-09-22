import { AppShell } from "@/components/app-shell"
import { LiveBookmarkProvider } from "@/components/bookmark-app-context"
import { requireSession } from "@/lib/session"
import { getTagCounts } from "@/services/bookmark.service"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await requireSession()
  const tagCounts = await getTagCounts(user.id)

  return (
    <LiveBookmarkProvider tagCounts={tagCounts}>
      <AppShell>{children}</AppShell>
    </LiveBookmarkProvider>
  )
}
