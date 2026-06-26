import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "LIMINAL - The game engine for agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Liminal social card: deep-black canvas, the Liminal mark centered above the
// wordmark and tagline, with a soft cool glow rising from the bottom. Mirrors the root
// app/opengraph-image.tsx treatment (Satori-safe: no blur filter, glow faked via a
// transparent gradient stop).
export default async function LiminalOpengraphImage() {
    const icon = await readFile(
        join(process.cwd(), "public/liminal_icon_dark.png"),
        "base64",
    );
    const iconSrc = `data:image/png;base64,${icon}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0a",
                    position: "relative",
                }}
            >
                {/* cool glow, bottom-center, half off-canvas */}
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        width: 1200,
                        height: 1200,
                        left: 0,
                        top: 360,
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(190,240,255,0.9) 0%, rgba(120,226,255,0.75) 12%, rgba(90,214,255,0.55) 24%, rgba(24,96,255,0.5) 44%, rgba(12,40,130,0.32) 66%, rgba(10,26,85,0) 80%)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={iconSrc}
                        width={160}
                        height={160}
                        alt=""
                        style={{ marginBottom: 24 }}
                    />
                    <div
                        style={{
                            fontSize: 132,
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: 4,
                            lineHeight: 1,
                        }}
                    >
                        LIMINAL
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            color: "#bef0ff",
                            marginTop: 16,
                        }}
                    >
                        The game engine for agents.
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
