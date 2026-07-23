// Decorative illustration contrasting scattered browser tabs with an organized
// bookmark grid. Colors reference the live theme tokens for automatic dark-mode support.

export function ProblemIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 280"
      className={className}
      width="100%"
      height="auto"
      fill="none"
      aria-hidden="true"
    >
      <rect x="8" y="76" width="104" height="60" rx="8" transform="rotate(-11 60 106)" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="12" y="80" width="70" height="6" rx="3" transform="rotate(-11 60 106)" fill="var(--border)" />
      <rect x="58" y="40" width="104" height="60" rx="8" transform="rotate(9 110 70)" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="62" y="44" width="70" height="6" rx="3" transform="rotate(9 110 70)" fill="var(--primary)" opacity="0.6" />
      <rect x="28" y="140" width="104" height="60" rx="8" transform="rotate(7 80 170)" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="32" y="144" width="70" height="6" rx="3" transform="rotate(7 80 170)" fill="var(--border)" />
      <rect x="86" y="158" width="104" height="60" rx="8" transform="rotate(-8 138 188)" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="90" y="162" width="70" height="6" rx="3" transform="rotate(-8 138 188)" fill="var(--border)" />
      <path d="M222 160 H 300" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M288 148 L303 160 L288 172" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M340 46 a10 10 0 0 1 10-10 h40 l14 14 h96 a10 10 0 0 1 10 10 v154 a10 10 0 0 1-10 10 H350 a10 10 0 0 1-10-10 Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="358" y="72" width="80" height="56" rx="8" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
      <rect x="374" y="84" width="48" height="6" rx="3" fill="var(--primary)" />
      <rect x="374" y="98" width="34" height="5" rx="2.5" fill="var(--border)" />
      <rect x="448" y="72" width="80" height="56" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="464" y="84" width="48" height="6" rx="3" fill="var(--border)" />
      <rect x="358" y="142" width="80" height="56" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="374" y="154" width="48" height="6" rx="3" fill="var(--border)" />
      <rect x="448" y="142" width="80" height="56" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="464" y="154" width="48" height="6" rx="3" fill="var(--border)" />
    </svg>
  )
}
