import type { CSSProperties } from "react"
import { Link, Section } from "react-email"

import { defaultTheme } from "@/components/email/theme-default"

type EmailButtonVariant = "primary" | "secondary"
type EmailButtonSize = "sm" | "md" | "lg"
type EmailButtonAlign = "left" | "center" | "right"

interface Props {
  align?: EmailButtonAlign
  href: string
  label: string
  size?: EmailButtonSize
  variant?: EmailButtonVariant
}

const buttonFont =
  "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"

const sizeStyles: Record<EmailButtonSize, CSSProperties> = {
  lg: { fontSize: "16px", lineHeight: "24px", padding: "12px 24px" },
  md: { fontSize: "14px", lineHeight: "20px", padding: "10px 24px" },
  sm: { fontSize: "13px", lineHeight: "20px", padding: "8px 16px" },
}

export const EmailButton = ({
  align = "center",
  href,
  label,
  size = "md",
  variant = "primary",
}: Props) => {
  const theme = defaultTheme
  const button = theme.button[variant]
  const border = "border" in button ? button.border : undefined

  return (
    <Section style={{ textAlign: align }}>
      <Link
        href={href}
        style={{
          backgroundColor: button.backgroundColor,
          border,
          borderRadius: button.borderRadius,
          color: button.color,
          display: "inline-block",
          fontFamily: buttonFont,
          fontSize: sizeStyles[size].fontSize,
          fontWeight: button.fontWeight,
          lineHeight: sizeStyles[size].lineHeight,
          padding: sizeStyles[size].padding,
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    </Section>
  )
}
