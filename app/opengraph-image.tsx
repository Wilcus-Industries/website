import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Wilcus Industries — Smart tools and agentic solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card: deep-black canvas with the electric-blue → cyan orb from
// HeroBackground bleeding up from the bottom, logo top-left, name + tagline bottom-left.
// (Satori has no blur filter, so the glow is faked with a soft transparent gradient stop.)
export default async function OpengraphImage() {
    const logo = await readFile(join(process.cwd(), "public/logo.png"), "base64");
    const logoSrc = `data:image/png;base64,${logo}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: "#0a0a0a",
                    padding: 80,
                    position: "relative",
                }}
            >
                {/* electric-blue → cyan orb, bottom-center, half off-canvas */}
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        width: 1200,
                        height: 1200,
                        left: 0,
                        top: 360,
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(190,240,255,0.95) 0%, rgba(120,226,255,0.82) 12%, rgba(90,214,255,0.65) 24%, rgba(24,96,255,0.6) 44%, rgba(12,40,130,0.38) 66%, rgba(10,26,85,0) 80%)",
                    }}
                />

                {/* logo, top-left */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={logoSrc}
                    width={88}
                    height={88}
                    alt=""
                    style={{ position: "absolute", top: 80, left: 80 }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            fontSize: 88,
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: -2,
                            lineHeight: 1.05,
                        }}
                    >
                        WILCUS INDUSTRIES
                    </div>
                    <div
                        style={{
                            fontSize: 42,
                            color: "#bef0ff",
                            marginTop: 16,
                        }}
                    >
                        Smart tools and agentic solutions.
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
