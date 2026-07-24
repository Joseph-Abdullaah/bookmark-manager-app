// Decorative floating cards drawn behind the hero browser preview.
// Colors reference the live theme tokens so the illustration adapts to dark mode.

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 480"
      className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}
      fill="none"
      aria-hidden="true"
    >
      <style>{`
        .float-a { animation: hero-float-a 6s ease-in-out infinite; transform-origin: 100px 90px; }
        .float-b { animation: hero-float-b 7s ease-in-out infinite; transform-origin: 470px 60px; }
        .float-c { animation: hero-float-a 8s ease-in-out infinite; transform-origin: 520px 410px; }
        .float-d { animation: hero-float-b 9s ease-in-out infinite; transform-origin: 100px 380px; }
        @keyframes hero-float-a { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes hero-float-b { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(8px); } }
        @media (prefers-reduced-motion: reduce) {
          .float-a, .float-b, .float-c, .float-d { animation: none; }
        }
      `}</style>
      <g className="float-a" transform="translate(14,30) rotate(-7)">
        <rect width="168" height="118" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="3.2" fill="var(--border)" />
        <circle cx="27" cy="18" r="3.2" fill="var(--border)" />
        <circle cx="38" cy="18" r="3.2" fill="var(--border)" />
        <rect x="14" y="34" width="140" height="9" rx="4.5" fill="var(--border)" />
        <rect x="14" y="54" width="98" height="7" rx="3.5" fill="var(--border)" opacity="0.65" />
        <rect x="14" y="69" width="118" height="7" rx="3.5" fill="var(--border)" opacity="0.65" />
        <rect x="14" y="84" width="80" height="7" rx="3.5" fill="var(--border)" opacity="0.65" />
      </g>
      <g className="float-b" transform="translate(420,42) rotate(6)">
        <rect width="98" height="34" rx="17" fill="var(--primary)" />
        <rect x="16" y="14" width="60" height="7" rx="3.5" fill="var(--primary-foreground)" opacity="0.85" />
      </g>
      <path
        d="M186 92 C 250 62, 340 62, 418 62"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        fill="none"
      />
      <circle cx="186" cy="92" r="4" fill="var(--primary)" />
      <circle cx="418" cy="62" r="4" fill="var(--primary)" />
      <g className="float-c" transform="translate(452,368) rotate(-6)">
        <path
          d="M0 12 a8 8 0 0 1 8-8 h40 l14 14 h68 a8 8 0 0 1 8 8 v66 a8 8 0 0 1-8 8 h-122 a8 8 0 0 1-8-8 Z"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
      </g>
      <g className="float-d" transform="translate(36,336) rotate(8)">
        <rect width="128" height="88" rx="10" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="12" y="14" width="88" height="8" rx="4" fill="var(--primary)" opacity="0.55" />
        <rect x="12" y="30" width="68" height="6" rx="3" fill="var(--border)" />
        <rect x="12" y="44" width="88" height="6" rx="3" fill="var(--border)" />
      </g>
    </svg>
  )
}
