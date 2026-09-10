import { z } from "zod"

export const bookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(280, "Description must be at most 280 characters"),
  url: z.string().trim().url("Invalid URL format"),
  tags: z
    .array(
      z.string().trim().min(1, "Tag cannot be empty.").max(20, "Tag too long")
    )
    .min(1, "Add at least one tag")
    .max(5, "You can add up to 5 tags"),
})

export const editBookmarkSchema = bookmarkSchema

export type BookmarkFormValues = z.infer<typeof bookmarkSchema>
export type EditBookmarkFormValues = z.infer<typeof editBookmarkSchema>
