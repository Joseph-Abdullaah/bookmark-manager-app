import "server-only"

import type { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { PAGE_SIZE, type BookmarkQuery } from "@/lib/bookmark-search-params"
import type {
  BookmarkItem,
  BookmarkPage,
  BookmarkWithTags,
  TagCount,
  TagCounts,
} from "@/types/bookmark"

const withTags = {
  bookmarkTags: { include: { tag: true } },
} satisfies Prisma.BookmarkInclude

export function toBookmarkItem(bookmark: BookmarkWithTags): BookmarkItem {
  return {
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    favicon: bookmark.favicon,
    description: bookmark.description,
    tags: bookmark.bookmarkTags.map(({ tag }) => tag.name),
    pinned: bookmark.pinned,
    isArchived: bookmark.isArchived,
    visitCount: bookmark.visitCount,
    createdAt: bookmark.createdAt.toISOString(),
    lastVisited: bookmark.lastVisited?.toISOString() ?? null,
  }
}

function buildWhere(
  userId: string,
  isArchived: boolean,
  { q, tags }: Pick<BookmarkQuery, "q" | "tags">
): Prisma.BookmarkWhereInput {
  const search = q.trim()
  const and: Prisma.BookmarkWhereInput[] = []

  if (search) {
    const contains = { contains: search, mode: "insensitive" as const }
    and.push({
      OR: [
        { title: contains },
        { url: contains },
        { description: contains },
        { bookmarkTags: { some: { tag: { name: contains } } } },
      ],
    })
  }

  // A bookmark must carry every selected tag.
  for (const tag of tags) {
    and.push({
      bookmarkTags: {
        some: { tag: { name: { equals: tag, mode: "insensitive" } } },
      },
    })
  }

  return { userId, isArchived, AND: and }
}

function buildOrderBy(
  sort: BookmarkQuery["sort"]
): Prisma.BookmarkOrderByWithRelationInput[] {
  const order: Prisma.BookmarkOrderByWithRelationInput[] = [{ pinned: "desc" }]
  switch (sort) {
    case "recently-visited":
      order.push({ lastVisited: { sort: "desc", nulls: "last" } })
      break
    case "most-visited":
      order.push({ visitCount: "desc" })
      break
  }
  // createdAt + id keep pagination stable when the sort key ties.
  order.push({ createdAt: "desc" }, { id: "desc" })
  return order
}

export async function getBookmarkPage(
  userId: string,
  isArchived: boolean,
  query: BookmarkQuery
): Promise<BookmarkPage> {
  const where = buildWhere(userId, isArchived, query)
  const orderBy = buildOrderBy(query.sort)

  const fetchPage = (page: number) =>
    prisma.bookmark.findMany({
      where,
      orderBy,
      include: withTags,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    })

  const requested = Math.max(1, query.page)
  const [total, rows] = await Promise.all([
    prisma.bookmark.count({ where }),
    fetchPage(requested),
  ])

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  if (requested <= pageCount) {
    return {
      items: rows.map(toBookmarkItem),
      total,
      page: requested,
      pageCount,
    }
  }

  // Out-of-range page (e.g. stale URL): fall back to the last page.
  const lastRows = await fetchPage(pageCount)
  return {
    items: lastRows.map(toBookmarkItem),
    total,
    page: pageCount,
    pageCount,
  }
}

/** Does the user own any bookmark in this section (ignoring filters)? */
export async function hasBookmarks(userId: string, isArchived: boolean) {
  const found = await prisma.bookmark.findFirst({
    where: { userId, isArchived },
    select: { id: true },
  })
  return found !== null
}

export async function getTagCounts(userId: string): Promise<TagCounts> {
  const countFor = (isArchived: boolean) =>
    prisma.bookmarkTag.groupBy({
      by: ["tagId"],
      where: { bookmark: { userId, isArchived } },
      _count: { _all: true },
    })

  const [tags, active, archived] = await Promise.all([
    prisma.tag.findMany({
      where: { userId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    countFor(false),
    countFor(true),
  ])

  const toCounts = (
    groups: { tagId: string; _count: { _all: number } }[]
  ): TagCount[] => {
    const byTag = new Map(groups.map((g) => [g.tagId, g._count._all]))
    return tags.flatMap(({ id, name }) => {
      const count = byTag.get(id)
      return count ? [{ name, count }] : []
    })
  }

  return { active: toCounts(active), archived: toCounts(archived) }
}
