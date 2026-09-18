"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  bookmarkSchema,
  type BookmarkFormValues,
} from "@/lib/validations/bookmark"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TagsInput } from "@/components/ui/tags-input"
import { toast } from "@/components/ui/toast"
import { AddBookmarkButton } from "@/components/add-bookmark-button"
import { useState } from "react"
import {
  useBookmarkApp,
  type BookmarkActions,
} from "@/components/bookmark-app-context"

function LiveAddBookmarkDialog({
  create,
}: {
  create: NonNullable<BookmarkActions["create"]>
}) {
  const [open, setOpen] = useState(false)
  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      tags: [],
    },
  })

  async function onSubmit(data: BookmarkFormValues) {
    try {
      const result = await create(data)
      if (!result.success) {
        toast.add({
          title: "Could not add bookmark",
          description: result.error,
        })
        return
      }
      toast.add({
        title: "Bookmark added",
        description: "Your bookmark has been added successfully.",
      })
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error("Failed to create bookmark:", error)
      toast.add({
        title: "Could not add bookmark",
        description: "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<AddBookmarkButton />} />
      <DialogContent className="sm:max-w-140">
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogDescription>
              Save a link with details to keep your collection organized. We
              extract the favicon automatically from the URL.
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

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add Bookmark"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export function AddBookmarkDialog() {
  const { actions } = useBookmarkApp()

  // The demo is read-only for new bookmarks.
  if (!actions.create) {
    return (
      <span title="Adding bookmarks is disabled in the demo">
        <AddBookmarkButton disabled />
      </span>
    )
  }

  return <LiveAddBookmarkDialog create={actions.create} />
}
