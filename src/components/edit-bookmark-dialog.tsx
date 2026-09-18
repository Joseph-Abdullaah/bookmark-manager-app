"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useTransition } from "react"
import {
  bookmarkSchema,
  type BookmarkFormValues,
} from "@/lib/validations/bookmark"
import type { BookmarkItem } from "@/types/bookmark"
import { useBookmarkApp } from "@/components/bookmark-app-context"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TagsInput } from "@/components/ui/tags-input"
import { toast } from "@/components/ui/toast"

interface EditBookmarkDialogProps {
  bookmark: BookmarkItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBookmarkDialog({
  bookmark,
  open,
  onOpenChange,
}: EditBookmarkDialogProps) {
  const { actions } = useBookmarkApp()
  const [isPending, startTransition] = useTransition()
  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: bookmark.title,
      description: bookmark.description ?? "",
      url: bookmark.url,
      tags: bookmark.tags,
    },
  })

  async function onSubmit(data: BookmarkFormValues) {
    startTransition(async () => {
      const result = await actions.edit(bookmark.id, {
        title: data.title,
        description: data.description,
        url: data.url,
        tags: data.tags,
      })

      if (!result.success) {
        toast.add({
          title: "Error",
          description: result.error,
        })
        return
      }

      toast.add({
        title: "Success",
        description: "Bookmark updated successfully.",
      })

      onOpenChange(false)
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140">
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
            <DialogDescription>
              Update your saved link details — change the title, description,
              URL, or tags anytime.
            </DialogDescription>
          </DialogHeader>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title *</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  placeholder=""
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description *</FieldLabel>

                <Textarea
                  {...field}
                  id="description"
                  maxLength={280}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />

                <div className="flex justify-between">
                  <div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {(field.value ?? "").length}/280
                  </span>
                </div>
              </Field>
            )}
          />
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="url">Website URL *</FieldLabel>

                <Input
                  {...field}
                  id="url"
                  type="url"
                  placeholder=""
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <TagsInput {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Bookmark"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
