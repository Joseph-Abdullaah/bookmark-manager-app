export function getFaviconUrl(url: string): string | null {
  try {
    const { hostname } = new URL(url)
    if (!hostname) return null
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return null
  }
}
