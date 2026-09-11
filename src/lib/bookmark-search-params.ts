import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server"

export const SORT_KEYS = [
  "recently-added",
  "recently-visited",
  "most-visited",
] as const

export type SortKey = (typeof SORT_KEYS)[number]

export const SORT_LABELS: Record<SortKey, string> = {
  "recently-added": "Recently added",
  "recently-visited": "Recently visited",
  "most-visited": "Most visited",
}

export const PAGE_SIZE = 12

/** URL state shared by the server (cache) and the client (useQueryStates). */
export const bookmarkParsers = {
  q: parseAsString.withDefault(""),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsStringLiteral(SORT_KEYS).withDefault("recently-added"),
  page: parseAsInteger.withDefault(1),
}

export const bookmarkSearchParamsCache =
  createSearchParamsCache(bookmarkParsers)

export type BookmarkQuery = {
  q: string
  tags: string[]
  sort: SortKey
  page: number
}
