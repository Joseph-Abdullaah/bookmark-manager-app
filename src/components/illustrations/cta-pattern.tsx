// Decorative background pattern for the final call-to-action band.
// Uses the section's own foreground token so it stays visible against
// `bg-primary` in both light mode (dark band) and dark mode (light band).

export function CtaPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 260"
      className={`pointer-events-none absolute right-0 bottom-0 h-auto w-[44%] opacity-70 ${className ?? ""}`}
      fill="none"
      aria-hidden="true"
    >
      <rect x="20" y="60" width="34" height="20" rx="6" transform="rotate(-14 37 70)" fill="var(--primary-foreground)" opacity="0.14" />
      <rect x="70" y="30" width="34" height="20" rx="6" transform="rotate(10 87 40)" fill="var(--primary-foreground)" opacity="0.14" />
      <rect x="120" y="66" width="34" height="20" rx="6" transform="rotate(-8 137 76)" fill="var(--primary-foreground)" opacity="0.14" />
      <path d="M40 100 C 90 150, 200 170, 260 210" stroke="var(--primary-foreground)" strokeWidth="2" strokeDasharray="3 7" opacity="0.3" fill="none" />
      <path d="M100 90 C 150 160, 220 180, 280 215" stroke="var(--primary-foreground)" strokeWidth="2" strokeDasharray="3 7" opacity="0.3" fill="none" />
      <line x1="220" y1="230" x2="480" y2="230" stroke="var(--primary-foreground)" strokeWidth="2" opacity="0.3" />
      <rect x="230" y="190" width="26" height="40" rx="4" fill="var(--primary-foreground)" opacity="0.22" />
      <rect x="262" y="170" width="26" height="60" rx="4" fill="var(--primary-foreground)" opacity="0.3" />
      <rect x="294" y="200" width="26" height="30" rx="4" fill="var(--primary-foreground)" opacity="0.22" />
      <rect x="326" y="160" width="26" height="70" rx="4" fill="var(--primary-foreground)" opacity="0.3" />
      <rect x="358" y="195" width="26" height="35" rx="4" fill="var(--primary-foreground)" opacity="0.22" />
    </svg>
  )
}
