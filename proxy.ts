import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Host-based routing for the Liminal subdomain.
 *
 * - liminal.wilcus.com/        -> internally rewritten to /liminal (subdomain root shows the page)
 * - www.wilcus.com/liminal     -> 308 redirect to https://liminal.wilcus.com (single canonical URL)
 *
 * Previews (e.g. liminal-<hash>.vercel.app are not subdomains of wilcus.com, so they keep
 * serving /liminal directly via the normal route; only the production host is special-cased here.
 */
const LIMINAL_HOST = "liminal.wilcus.com";

export function proxy(request: NextRequest) {
    const host = request.headers.get("host") ?? "";
    const { pathname } = request.nextUrl;

    if (host === LIMINAL_HOST) {
        // Serve the Liminal page at the subdomain root; leave deeper paths (icons, assets) alone.
        if (pathname === "/") {
            return NextResponse.rewrite(new URL("/liminal", request.url));
        }
        return NextResponse.next();
    }

    // Local dev / preview hosts have no subdomain, so serve /liminal directly instead of redirecting.
    const isLocalHost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

    // Any other production host: collapse /liminal onto the canonical subdomain to avoid duplicate content.
    if (!isLocalHost && (pathname === "/liminal" || pathname.startsWith("/liminal/"))) {
        return NextResponse.redirect(`https://${LIMINAL_HOST}`, 308);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/liminal", "/liminal/:path*"],
};
