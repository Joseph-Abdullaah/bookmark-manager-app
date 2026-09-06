"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/** Hoisted via React 19 <style href precedence> — no Tailwind config edits. */
const KEYFRAMES = `@keyframes zti-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}`

export interface TagsInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  /** Controlled list of tags — the component never owns it. */
  value: string[]
  onChange: (tags: string[]) => void
  /** Hard cap; reaching it disables the inner input and shows an "N/max" counter. */
  maxTags?: number
  /** Allow the same tag twice (default false: duplicates are rejected with a shake). */
  allowDuplicates?: boolean
}

export const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value,
      onChange,
      maxTags,
      allowDuplicates = false,
      placeholder,
      disabled,
      className,
      onKeyDown,
      onPaste,
      ...props
    },
    ref
  ) => {
    const [draft, setDraft] = React.useState("")
    const [shakingTag, setShakingTag] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const atMax = maxTags !== undefined && value.length >= maxTags

    /** Split on commas, trim, drop empties; add what fits under maxTags.
     *  Returns the last rejected duplicate (null when none). */
    const addTokens = (raw: string): string | null => {
      const tokens = raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
      const next = [...value]
      let duplicate: string | null = null
      for (const token of tokens) {
        if (maxTags !== undefined && next.length >= maxTags) break
        if (!allowDuplicates && next.includes(token)) {
          duplicate = token
          continue
        }
        next.push(token)
      }
      if (next.length !== value.length) onChange(next)
      return duplicate
    }

    const commitDraft = () => {
      const duplicate = addTokens(draft)
      if (duplicate) {
        // Reject with feedback but keep the typed text so nothing is lost.
        setShakingTag(duplicate)
      } else {
        setDraft("")
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!e.nativeEvent.isComposing) {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault()
          commitDraft()
        } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
          onChange(value.slice(0, -1))
        }
      }
      onKeyDown?.(e)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData("text")
      if (text.includes(",")) {
        e.preventDefault()
        const duplicate = addTokens(draft + text)
        if (duplicate) setShakingTag(duplicate)
        setDraft("")
      }
      onPaste?.(e)
    }

    return (
      <div
        className={cn(
          "flex min-h-9 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => {
          if (!disabled) inputRef.current?.focus()
        }}
      >
        <style href="zyeon-tags-input" precedence="medium">
          {KEYFRAMES}
        </style>

        {value.map((tag, i) => (
          <span
            className={cn(
              "inline-flex max-w-full min-w-0 items-center gap-1 rounded-md bg-secondary py-0.5 pr-1 pl-2 text-xs font-medium text-secondary-foreground",
              shakingTag === tag &&
                "[animation:zti-shake_0.18s_ease-in-out_2] motion-reduce:[animation:none]"
            )}
            key={`${tag}-${i}`}
            onAnimationEnd={() => setShakingTag(null)}
          >
            <span className="truncate">{tag}</span>
            <button
              aria-label={`Remove ${tag}`}
              className="rounded-sm p-0.5 hover:bg-secondary-foreground/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none"
              disabled={disabled}
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              type="button"
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </span>
        ))}

        <input
          className="h-6 min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          disabled={disabled || atMax}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={atMax ? "" : placeholder}
          ref={inputRef}
          value={draft}
          {...props}
        />

        {maxTags !== undefined && (
          <span
            aria-live="polite"
            className="ml-auto text-xs text-muted-foreground tabular-nums"
          >
            {value.length}/{maxTags}
          </span>
        )}
      </div>
    )
  }
)

TagsInput.displayName = "TagsInput"

export default TagsInput
