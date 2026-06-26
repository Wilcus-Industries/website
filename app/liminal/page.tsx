import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import {FaArrowDown, FaGithub} from "react-icons/fa6";
import { liminalUrl, siteUrl } from "@/app/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(liminalUrl),
    title: { absolute: "LIMINAL - The game engine for agents" },
    description:
        "Liminal is the game engine for agents - a full Lua IDE and Unity-style scene editor with a built-in MCP server and ready-made skill file, so your agent turns an intent into a running game. Free download.",
    applicationName: "Liminal",
    keywords: [
        "Liminal",
        "game engine for agents",
        "agentic game engine",
        "MCP game engine",
        "Lua game engine",
        "AI game development",
        "MCP server",
        "Unity-style editor",
        "Wilcus Industries",
    ],
    alternates: { canonical: liminalUrl },
    openGraph: {
        type: "website",
        siteName: "Wilcus Industries",
        title: "LIMINAL - The game engine for agents",
        description:
            "A full Lua IDE and Unity-style editor with a built-in MCP server and ready-made skill file. Your agent reads one, speaks the other, and an intent becomes a running game.",
        url: liminalUrl,
        locale: "en_US",
        // og:image tags are injected automatically from app/liminal/opengraph-image.tsx
    },
    twitter: {
        card: "summary_large_image",
        title: "LIMINAL - The game engine for agents",
        description:
            "The game engine for agents - built-in MCP server, ready-made skill file, full Lua IDE.",
        // twitter:image is injected automatically from app/liminal/twitter-image.tsx
    },
};

// SoftwareApplication structured data for the Liminal product. Links its publisher
// to the global Organization node emitted in the root layout (components/seo/jsonLd.tsx)
// via the shared @id, so the two graphs stitch together for rich results.
const liminalJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Liminal",
    url: liminalUrl,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "GameApplication",
    operatingSystem: "Windows, macOS, Linux",
    description:
        "Liminal is the game engine for agents - a full Lua IDE and Unity-style scene editor with a built-in MCP server and ready-made skill file, so your agent turns an intent into a running game.",
    downloadUrl: "https://github.com/Wilcus-Industries/liminal/releases/latest",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    author: { "@id": `${siteUrl}/#organization` },
};

function LinkButton({link, children} : {
    link: string,
    children: React.ReactNode,
}) {
    return (
        <a href={link}>
            <div className={`bg-foreground text-background px-3 py-1 
                             hover:bg-background hover:text-foreground
                             transition-colors duration-200 border-foreground
                             border-[0.5px]`}>
                {children}
            </div>
        </a>
    );
}

// Liminal is two engines in one - a full traditional editor and an agent-native layer.
// The contrast is the section's structure; the grainy redaction-70 labels are its signature.
const featureGroups = [
    {
        label: "Traditional",
        items: [
            "Full Lua IDE",
            "Clean user interface",
            "Full Unity-style scene editor",
            "Built-in terminal",
            "One button to ship your game",
        ],
    },
    {
        label: "Agentic",
        items: [
            "Full MCP server integration",
            "Lua scripting skill built-in",
            "Agent screenshot context",
            "Agent testing ability",
            "Asset management"
        ],
    },
];

export default function Liminal() {
    return (
        <main className={"flex flex-col min-h-screen relative"}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(liminalJsonLd) }}
            />
            <div className={"relative h-screen"}>
                <div className={"flex flex-1 flex-col justify-start items-center absolute bottom-[40vh] w-full z-50"}>
                    <div className={"text-center flex flex-col items-center gap-1"}>
                        <Image
                            src={"/liminal_icon_dark.png"}
                            alt={"Liminal"}
                            width={512}
                            height={512}
                            priority
                            className={"lg:w-40 md:w-32 w-28 h-auto mb-2"}
                        />
                        <small className={"leading-none text-xs font-bold font-redaction-70 z-50"}>
                            <a href={"/"}>WILCUS INDUSTRIES</a> PRESENTS
                        </small>
                        <h1 className={"font-redaction-35 lg:text-9xl md:text-8xl text-7xl leading-none"}>
                            LIMINAL
                        </h1>
                        <small className={"font-redaction-35 lg:text-xl md:text-lg text-xs leading-none"}>
                            The game engine for agents.
                        </small>
                    </div>
                    <div className={"flex flex-row gap-5 mt-5"}>
                        <LinkButton link={"https://github.com/Wilcus-Industries/liminal/releases/latest"}>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <FaArrowDown />
                                <h1 className={"font-redaction-70 font-bold"}>
                                    Download
                                </h1>
                            </div>
                        </LinkButton>

                        <LinkButton link={"https://github.com/Wilcus-Industries/liminal"}>
                            <div className={"flex flex-row gap-1 items-center"}>
                                <FaGithub />
                                <h1 className={"font-redaction-70 font-bold"}>
                                    GitHub
                                </h1>
                            </div>
                        </LinkButton>
                    </div>
                </div>
                <div className={"absolute bottom-0 w-full flex justify-center translate-y-1/2 z-10"}>
                    <Image
                        src={"/liminal_app.png"}
                        alt={"liminal"}
                        width={460}
                        height={300}
                        sizes={"(min-width: 1024px) 960px, (min-width: 768px) 720px, 480px"}
                        className={"w-120 md:w-180 lg:w-240 h-auto"}
                    />
                </div>
            </div>
            <div className={"min-h-screen pt-[9.8rem] md:pt-[14.7rem] lg:pt-[19.6rem] pb-32 md:pb-48 flex flex-col items-center px-6 md:px-10"}>
                <div className={"w-full max-w-3xl mx-auto"}>
                    <div className={"text-center max-w-xl mx-auto flex flex-col gap-3"}>
                        <small className={"font-redaction-70 text-xs tracking-[0.25em] uppercase opacity-50"}>
                            Inside Liminal
                        </small>
                        <h1 className={"font-redaction-35 text-2xl md:text-3xl lg:text-4xl text-balance"}>Game development could never be easier.</h1>
                        <p className={"font-redaction-35 text-sm md:text-base text-pretty opacity-70"}>
                            A built-in MCP server and a ready-made skill file, working together.
                            Your agent reads one, speaks the other, and an intent becomes a running game.
                        </p>
                    </div>

                    <div className={"mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2"}>
                        {featureGroups.map((group, i) => (
                            <div
                                key={group.label}
                                className={`group flex flex-col ${i === 1 ? "md:border-l border-foreground/15 md:pl-10 mt-12 md:mt-0" : "md:pr-10"}`}
                            >
                                <small className={"font-redaction-70 text-xs tracking-[0.25em] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-300 pb-4 border-b border-foreground/15"}>
                                    {group.label}
                                </small>
                                <ul className={"font-redaction-35 text-base md:text-lg"}>
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className={"py-3 border-b border-foreground/15 text-pretty"}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}