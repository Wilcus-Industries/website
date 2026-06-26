/**
 * Canonical production origin, used by metadata, robots, sitemap, OG image, and JSON-LD.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. Vercel preview URLs); falls back
 * to the production www host so absolute URLs resolve correctly even without the env var.
 */
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wilcus.com";

/**
 * Canonical origin for the standalone Liminal product, reachable at the subdomain
 * (mapped to /liminal at the DNS/Vercel level). Single source of truth for the
 * Liminal page metadata and the sitemap entry.
 */
export const liminalUrl = "https://liminal.wilcus.com";
