import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Wilcus Industries",
        short_name: "Wilcus",
        description:
            "Smart tools and agentic solutions - home of The Collective, the world's first fully-agentic software engineering team.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        icons: [
            {
                src: "/logo.png",
                sizes: "200x200",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
