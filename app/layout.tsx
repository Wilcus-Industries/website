import type { Metadata, Viewport } from "next";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import "./globals.css";
import JsonLd from "@/app/components/JsonLd";
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

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Wilcus Industries — Smart tools and agentic solutions",
        template: "%s | Wilcus Industries",
    },
    description:
        "Wilcus Industries builds smart tools and agentic solutions — home of The Collective, the world's first fully-agentic software engineering team. Join the waitlist.",
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
        title: "Wilcus Industries — Smart tools and agentic solutions",
        description:
            "Home of The Collective, the world's first fully-agentic software engineering team. Smart tools and agentic solutions.",
        url: siteUrl,
        locale: "en_US",
        // og:image tags are injected automatically from app/opengraph-image.tsx
    },
    twitter: {
        card: "summary_large_image",
        title: "Wilcus Industries — Smart tools and agentic solutions",
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
            className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <JsonLd />
                {children}
            </body>
        </html>
    );
}
