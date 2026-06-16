import { siteUrl } from "@/app/lib/site";

/**
 * Organization + WebSite structured data (schema.org JSON-LD), rendered once in the root
 * layout so it appears on every route. Powers rich results and entity recognition.
 */
export default function JsonLd() {
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: "Wilcus Industries",
                url: siteUrl,
                logo: `${siteUrl}/logo.png`,
                description:
                    "Wilcus Industries builds smart tools and agentic solutions — home of The Collective, the world's first fully-agentic software engineering team.",
                founder: [
                    {
                        "@type": "Person",
                        name: "Lucas Marta",
                        url: "https://lucasmarta.com",
                    },
                    {
                        "@type": "Person",
                        name: "William Chastain",
                        url: "https://www.williamchastain.com",
                    },
                ],
                sameAs: [
                    "https://github.com/Wilcus-Industries",
                    "https://lucasmarta.com",
                    "https://www.williamchastain.com",
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: "Wilcus Industries",
                url: siteUrl,
                publisher: { "@id": `${siteUrl}/#organization` },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
