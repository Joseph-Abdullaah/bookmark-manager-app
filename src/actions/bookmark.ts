"use server"

import { revalidatePath } from "next/cache"

import type { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import {
  bookmarkSchema,
  editBookmarkSchema,
  type BookmarkFormValues,
  type EditBookmarkFormValues,
} from "@/lib/validations/bookmark"
import { getFaviconUrl } from "@/utils/getFaviconUrl"
import type { ActionResult } from "@/types/bookmark"

const NOT_SIGNED_IN: ActionResult = {
  success: false,
  error: "You must be signed in.",
}
const NOT_FOUND: ActionResult = { success: false, error: "Bookmark not found." }

/** Revalidates the whole app layout so the sidebar tag counts refresh too. */
function revalidateBookmarks() {
  revalidatePath("/", "layout")
}

/** Trim, drop empties and de-duplicate case-insensitively (first spelling wins). */
function normalizeTags(tags: string[]) {
  const seen = new Map<string, string>()
  for (const raw of tags) {
    const name = raw.trim()
    if (name && !seen.has(name.toLowerCase()))
      seen.set(name.toLowerCase(), name)
  }
  return [...seen.values()]
}

/** Finds the user's tags case-insensitively and creates the missing ones. */
async function resolveTagIds(
  tx: Prisma.TransactionClient,
  userId: string,
  names: string[]
) {
  if (names.length === 0) return []

  const existing = await tx.tag.findMany({
    where: { userId },
    select: { id: true, name: true },
  })
  const byName = new Map(
    existing.map((tag) => [tag.name.toLowerCase(), tag.id])
  )

  const missing = names.filter((name) => !byName.has(name.toLowerCase()))
  if (missing.length > 0) {
    await tx.tag.createMany({
      data: missing.map((name) => ({ name, userId })),
      skipDuplicates: true,
    })
    const created = await tx.tag.findMany({
      where: { userId, name: { in: missing } },
      select: { id: true, name: true },
    })
    for (const tag of created) byName.set(tag.name.toLowerCase(), tag.id)
  }

  return names.flatMap((name) => {
    const id = byName.get(name.toLowerCase())
    return id ? [id] : []
  })
}

/** Removes the user's tags that no longer belong to any bookmark. */
function deleteOrphanTags(tx: Prisma.TransactionClient, userId: string) {
  return tx.tag.deleteMany({
    where: { userId, bookmarkTags: { none: {} } },
  })
}

export async function createBookmark(
  data: BookmarkFormValues
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) {
      return {
        success: false,
        error: "You must be signed in to create a bookmark.",
      }
    }

    const parsed = bookmarkSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: "Invalid bookmark data." }
    }

    const { title, description, url, tags } = parsed.data
    const userId = session.user.id

    await prisma.$transaction(async (tx) => {
      const tagIds = await resolveTagIds(tx, userId, normalizeTags(tags))

      await tx.bookmark.create({
        data: {
          title,
          description: description || null,
          url,
          favicon: getFaviconUrl(url),
          userId,
          bookmarkTags: { create: tagIds.map((tagId) => ({ tagId })) },
        },
      })
    })

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Create bookmark error:", error)
    return {
      success: false,
      error: "Something went wrong while creating the bookmark.",
    }
  }
}

export async function editBookmark(
  id: string,
  data: EditBookmarkFormValues
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) return NOT_SIGNED_IN

    const parsed = editBookmarkSchema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: "Invalid bookmark data." }
    }

    const { title, url, description, tags } = parsed.data
    const userId = session.user.id

    const found = await prisma.$transaction(async (tx) => {
      const owned = await tx.bookmark.updateMany({
        where: { id, userId },
        data: {
          title,
          url,
          favicon: getFaviconUrl(url),
          description: description || null,
        },
      })
      if (owned.count === 0) return false

      const tagIds = await resolveTagIds(tx, userId, normalizeTags(tags))

      await tx.bookmarkTag.deleteMany({ where: { bookmarkId: id } })
      await tx.bookmarkTag.createMany({
        data: tagIds.map((tagId) => ({ bookmarkId: id, tagId })),
      })
      await deleteOrphanTags(tx, userId)
      return true
    })

    if (!found) return NOT_FOUND

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Failed to edit bookmark:", error)
    return { success: false, error: "Failed to update bookmark." }
  }
}

export async function deleteBookmark(
  bookmarkId: string
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) return NOT_SIGNED_IN

    const userId = session.user.id

    const found = await prisma.$transaction(async (tx) => {
      const deleted = await tx.bookmark.deleteMany({
        where: { id: bookmarkId, userId },
      })
      if (deleted.count === 0) return false
      await deleteOrphanTags(tx, userId)
      return true
    })

    if (!found) return NOT_FOUND

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Failed to delete bookmark:", error)
    return { success: false, error: "Failed to delete bookmark." }
  }
}

export async function toggleBookmarkPin(
  bookmarkId: string
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) return NOT_SIGNED_IN

    const bookmark = await prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId: session.user.id },
      select: { pinned: true },
    })
    if (!bookmark) return NOT_FOUND

    await prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { pinned: !bookmark.pinned },
    })

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Toggle bookmark pin error:", error)
    return { success: false, error: "Failed to update bookmark." }
  }
}

export async function toggleBookmarkArchive(
  bookmarkId: string
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) return NOT_SIGNED_IN

    const bookmark = await prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId: session.user.id },
      select: { isArchived: true },
    })
    if (!bookmark) return NOT_FOUND

    await prisma.bookmark.update({
      where: { id: bookmarkId },
      // Archived bookmarks cannot be pinned, so archiving also unpins.
      data: { isArchived: !bookmark.isArchived, pinned: false },
    })

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Toggle bookmark archive error:", error)
    return { success: false, error: "Failed to update bookmark." }
  }
}

export async function trackBookmarkVisit(
  bookmarkId: string
): Promise<ActionResult> {
  try {
    const session = await getSession()
    if (!session?.user) return NOT_SIGNED_IN

    const result = await prisma.bookmark.updateMany({
      where: { id: bookmarkId, userId: session.user.id },
      data: { visitCount: { increment: 1 }, lastVisited: new Date() },
    })
    if (result.count === 0) return NOT_FOUND

    revalidateBookmarks()
    return { success: true }
  } catch (error) {
    console.error("Error tracking visit:", error)
    return { success: false, error: "Failed to track visit." }
  }
}
