/**
 * Canonical production origin, used by metadata, robots, sitemap, OG image, and JSON-LD.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. Vercel preview URLs); falls back
 * to the production www host so absolute URLs resolve correctly even without the env var.
 */
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wilcus.com";
