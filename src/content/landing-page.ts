// Central content store for the marketing landing page.
// Update copy here without touching any component markup.

export type LucideIconName =
  | "Search"
  | "FolderOpen"
  | "Tag"
  | "Star"
  | "Archive"
  | "Moon"
  | "BarChart3"
  | "Laptop"
  | "Bookmark"

export const nav = {
  logoLabel: "Bookmark Manager",
  links: [
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  loginLabel: "Log in",
  loginHref: "/login",
  ctaLabel: "Get Started",
  ctaHref: "/register",
}

export const hero = {
  title: ["Every bookmark.", "Perfectly organized."],
  description:
    "Save, tag, and search every link you find. Bookmark Manager keeps your whole web in one clean, fast workspace — built for people who save a lot and lose nothing.",
  primaryCta: { label: "Get Started Free", href: "/register" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  browserUrl: "app.bookmarkmanager.io/home",
}

export const compatibility = {
  label: "Works beautifully in every browser",
  browsers: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
}

export const problem = {
  eyebrow: "The problem",
  title: "Tabs everywhere. Bookmarks nowhere.",
  description:
    "Fifty open tabs, three browsers, and a bookmarks bar you haven’t cleaned out in years. Bookmark Manager gives every link you save a real home — tagged, searchable, and easy to find the moment you need it again.",
}

export const features = {
  eyebrow: "Features",
  title: "Everything you need, nothing you don’t",
  description:
    "A focused set of tools built around how you actually save and revisit links.",
  items: [
    {
      icon: "Search" as LucideIconName,
      title: "Smart Search",
      description:
        "Find any link instantly by title, tag, or content — even ones you saved months ago.",
    },
    {
      icon: "FolderOpen" as LucideIconName,
      title: "Collections",
      description:
        "Group related bookmarks into folders that mirror the way you actually think.",
    },
    {
      icon: "Tag" as LucideIconName,
      title: "Custom Tags",
      description:
        "Layer flexible tags on top of folders so nothing is ever filed in just one place.",
    },
    {
      icon: "Star" as LucideIconName,
      title: "Favorites",
      description:
        "Pin the links you reach for every day straight to the top of your list.",
    },
    {
      icon: "Archive" as LucideIconName,
      title: "Archive",
      description:
        "Retire old links without deleting them — keep your active list lean.",
    },
    {
      icon: "Moon" as LucideIconName,
      title: "Dark Mode",
      description:
        "A carefully tuned dark theme that’s easy on the eyes, day or night.",
    },
    {
      icon: "BarChart3" as LucideIconName,
      title: "Usage Insights",
      description: "See what you actually open, so you can prune what you don’t.",
    },
    {
      icon: "Laptop" as LucideIconName,
      title: "Available Everywhere",
      description:
        "A responsive workspace that feels just as sharp on a laptop or a tablet.",
    },
  ],
}

export const showcase = {
  eyebrow: "Product showcase",
  title: "A closer look at your workspace",
  description: "Every bookmark, organized the moment you save it.",
  browserUrl: "app.bookmarkmanager.io/home",
  callouts: [
    { text: "Organize with tags & folders", position: "top-left" as const },
    { text: "Search finds it instantly", position: "top-right" as const },
    { text: "Pin, edit, or archive in one click", position: "bottom-right" as const },
  ],
  details: [
    {
      icon: "Tag" as LucideIconName,
      title: "Tag-based navigation",
      description: "Jump straight to any collection or tag from the sidebar.",
    },
    {
      icon: "Bookmark" as LucideIconName,
      title: "Rich bookmark cards",
      description: "Titles, favicons, and notes at a glance for every saved link.",
    },
    {
      icon: "Search" as LucideIconName,
      title: "Search & quick actions",
      description: "Filter, pin, or archive links without leaving the search bar.",
    },
  ],
}

export const howItWorks = {
  eyebrow: "How it works",
  title: "From open tab to organized, in seconds",
  steps: [
    {
      step: "Step 1",
      icon: "Bookmark" as LucideIconName,
      title: "Save",
      description: "Grab any link in one click, from any page you’re on.",
    },
    {
      step: "Step 2",
      icon: "FolderOpen" as LucideIconName,
      title: "Organize",
      description: "Drop it into a collection that already makes sense.",
    },
    {
      step: "Step 3",
      icon: "Tag" as LucideIconName,
      title: "Tag",
      description: "Add tags for the cross-cutting stuff — project, priority, type.",
    },
    {
      step: "Step 4",
      icon: "Search" as LucideIconName,
      title: "Find",
      description: "Search or filter and it’s there in under a second.",
    },
  ],
}

export const appearance = {
  eyebrow: "Appearance",
  title: "Light or dark. Your call.",
  description:
    "Switch themes instantly — Bookmark Manager looks just as sharp either way. This whole page just did.",
  browserUrl: "app.bookmarkmanager.io/home",
}

export const testimonials = {
  eyebrow: "Testimonials",
  title: "Loved by people done losing links",
  items: [
    {
      quote:
        "I finally stopped losing links in fifty open tabs. Everything has a place now.",
      name: "Maya R.",
      role: "Product Designer",
      initials: "MR",
    },
    {
      quote:
        "Tags plus collections sounded like overkill until I actually used them together. Can’t go back.",
      name: "Jordan T.",
      role: "Frontend Engineer",
      initials: "JT",
    },
    {
      quote:
        "The search is so fast it feels like cheating. I search half-remembered titles and it just knows.",
      name: "Priya K.",
      role: "Indie Hacker",
      initials: "PK",
    },
  ],
}

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  items: [
    {
      q: "Is my data private?",
      a: "Yes. Your bookmarks are yours — we don't sell your data or your library to anyone.",
    },
    {
      q: "Which browsers are supported?",
      a: "Bookmark Manager works in Chrome, Firefox, Safari, Edge, and Brave — anywhere you can open a web app.",
    },
    {
      q: "Can I import my existing bookmarks?",
      a: "Yes. Import straight from your browser's bookmarks bar or an exported HTML file in a couple of clicks.",
    },
    {
      q: "Does it sync across devices?",
      a: "Everything you save, tag, or archive syncs automatically, so your library matches on every device.",
    },
    {
      q: "Is Bookmark Manager free?",
      a: "Yes — Bookmark Manager is free to start, no credit card required.",
    },
  ],
}

export const cta = {
  title: "Give every bookmark a home.",
  description:
    "Join a workspace built for people who save a lot — and actually want to find it again.",
  ctaLabel: "Get Started Free",
  ctaHref: "/register",
}

export const footer = {
  description: "Organize your web, beautifully.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Showcase", href: "#showcase" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightName: "Bookmark Manager",
}
