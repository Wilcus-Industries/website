import type { Metadata, Viewport } from "next";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import JsonLd from "@/components/seo/jsonLd";
import { siteUrl } from "@/app/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"]
})

// Redaction - a free type family by Titus Kaphar / Reginald Dwayne Betts / Forest Young.
// Ships as 7 "grades": the base face plus 6 increasingly halftone/dotted variants
// (10 = finest dots → 100 = coarsest). Each grade is its own CSS variable so it can be
// targeted with a Tailwind `font-redaction-*` utility (see globals.css @theme).
// next/font requires each loader be called directly at module scope (no wrapper fn).
const redaction = localFont({
    variable: "--font-redaction",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction10 = localFont({
    variable: "--font-redaction-10",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_10-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_10-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_10-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction20 = localFont({
    variable: "--font-redaction-20",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_20-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_20-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_20-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction35 = localFont({
    variable: "--font-redaction-35",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_35-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_35-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_35-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction50 = localFont({
    variable: "--font-redaction-50",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_50-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_50-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_50-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction70 = localFont({
    variable: "--font-redaction-70",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_70-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_70-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_70-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redaction100 = localFont({
    variable: "--font-redaction-100",
    display: "swap",
    src: [
        { path: "../public/fonts/redaction/Redaction_100-Regular.woff2", weight: "400", style: "normal" },
        { path: "../public/fonts/redaction/Redaction_100-Italic.woff2", weight: "400", style: "italic" },
        { path: "../public/fonts/redaction/Redaction_100-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const redactionVars = [
    redaction.variable,
    redaction10.variable,
    redaction20.variable,
    redaction35.variable,
    redaction50.variable,
    redaction70.variable,
    redaction100.variable,
].join(" ");

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Wilcus Industries - Smart tools and agentic solutions",
        template: "%s | Wilcus Industries",
    },
    description:
        "Wilcus Industries builds smart tools and agentic solutions - home of The Collective, the world's first fully-agentic software engineering team. Join the waitlist.",
    applicationName: "Wilcus Industries",
    keywords: [
        "Wilcus Industries",
        "The Collective",
        "agentic software engineering",
        "AI software engineers",
        "agentic AI",
        "AI development team",
        "autonomous software engineering",
        "Liminal",
        "Sonderfi",
    ],
    authors: [
        { name: "Lucas Marta", url: "https://lucasmarta.com" },
        { name: "William Chastain", url: "https://www.williamchastain.com" },
    ],
    creator: "Wilcus Industries",
    publisher: "Wilcus Industries",
    category: "technology",
    alternates: { canonical: "/" },
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
        type: "website",
        siteName: "Wilcus Industries",
        title: "Wilcus Industries - Smart tools and agentic solutions",
        description:
            "Home of The Collective, the world's first fully-agentic software engineering team. Smart tools and agentic solutions.",
        url: siteUrl,
        locale: "en_US",
        // og:image tags are injected automatically from app/opengraph-image.tsx
    },
    twitter: {
        card: "summary_large_image",
        title: "Wilcus Industries - Smart tools and agentic solutions",
        description:
            "Home of The Collective, the world's first fully-agentic software engineering team.",
        // twitter:image is injected automatically from app/twitter-image.tsx
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export function generateViewport(): Viewport {
    return {
        colorScheme: "dark light",
        themeColor: [
            { media: "(prefers-color-scheme: light)", color: "#ffffff" },
            { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
        ],
    };
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${redactionVars} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <JsonLd />
                {children}
            </body>
        </html>
    );
}
