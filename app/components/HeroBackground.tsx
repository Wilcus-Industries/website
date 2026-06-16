import type { CSSProperties } from "react";

type GlowPosition = {
    /** Horizontal anchor of the orb. CSS length/percentage. Default "-10%" (bleeds off right edge). */
    right?: string;
    /** Vertical anchor of the orb. CSS length/percentage. Default "55%" (just below center). */
    top?: string;
};

export type HeroBackgroundProps = {
    /** Where the orb is anchored. Offsets are applied from the right/top edges. */
    glowPosition?: GlowPosition;
    /** Overall brightness multiplier for the orb, roughly 0–1.5. Default 1. */
    intensity?: number;
    /** Grain overlay opacity, 0–1. Default 0.22. */
    grainAmount?: number;
    /** Drift the grain for a faint film shimmer (cheap GPU transform, no noise recompute). Default true. */
    animated?: boolean;
    /** Diameter of the orb in pixels. Default 820. */
    size?: number;
    className?: string;
    style?: CSSProperties;
};

/**
 * Deep-black hero background with a single off-center, ring-shaped electric-blue → cyan
 * glow, heavily grained so the gradient reads like film stock rather than smooth CSS.
 *
 * Full-bleed, absolutely positioned, non-interactive — drop it behind hero content.
 */
export default function HeroBackground({
                                           glowPosition,
                                           intensity = 0.5,
                                           grainAmount = 1,
                                           animated = true,
                                           size = 2500,
                                           className,
                                           style,
                                       }: HeroBackgroundProps) {
    const right = glowPosition?.right ?? "-10%";
    const top = glowPosition?.top ?? "55%";

    // Clamp so callers can't blow out the blend or invert it.
    const k = Math.max(0, Math.min(1.5, intensity));

    // Stable per-instance id so multiple backgrounds on one page don't share filters.
    const filterId = `hero-grain-${right}-${top}-${size}`.replace(/[^a-z0-9-]/gi, "");

    // Full solid sphere — bright core → blue → indigo → transparent, no dark center punch.
    // `hot` scales the white-cyan core so we can make one sphere bluer, the other cyaner.
    const sphere = (
        diameter: number,
        horiz: CSSProperties,
        topPos: string,
        center: string,
        hot: number,
    ) => {
        const bg = `radial-gradient(circle at ${center},
      rgba(190, 240, 255, ${0.95 * hot * k}) 0%,
      rgba(120, 226, 255, ${0.85 * hot * k}) 12%,
      rgba(90, 214, 255, ${0.7 * k}) 24%,
      rgba(24, 96, 255, ${0.7 * k}) 44%,
      rgba(12, 40, 130, ${0.45 * k}) 66%,
      rgba(10, 26, 85, 0) 82%)`;
        const common: CSSProperties = {
            position: "absolute",
            width: diameter,
            height: diameter,
            top: topPos,
            transform: "translateY(-50%)",
            background: bg,
            ...horiz,
        };
        return {
            glow: { ...common, filter: `blur(${Math.round(diameter * 0.07)}px)` } as CSSProperties,
            core: { ...common, filter: `blur(${Math.round(diameter * 0.015)}px)` } as CSSProperties,
        };
    };

    // Single sphere: horizontally centered, sitting on the bottom edge so half of it is
    // visibly cut off below the viewport (top:100% puts its center on the edge).
    const orb = sphere(
        size,
        { left: "50%", transform: "translate(-50%, -50%)" },
        "118%",
        "50% 50%",
        1,
    );

    // Oversized so the layer can drift via transform without revealing its edges; the parent
    // clips the overflow. `contain: paint` isolates it on its own compositor layer.
    const grain: CSSProperties = {
        position: "absolute",
        top: "-25%",
        left: "-25%",
        width: "150%",
        height: "150%",
        mixBlendMode: "overlay",
        opacity: grainAmount,
        contain: "paint",
    };

    return (
        <div
            aria-hidden="true"
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
                ...style,
            }}
        >
            {/* Wrapper carries the float/breathe animation so it doesn't clobber the
                inner divs' own positioning transforms. */}
            <div className={animated ? "hero-orb-float" : undefined} style={{ position: "absolute", inset: 0 }}>
                <div style={orb.glow} />
                <div style={orb.core} />
            </div>

            {/* Film grain. feTurbulence fractalNoise, overlay-blended: visible on color, ~gone on black.
                Noise is static (rasterized once, cached); motion comes from a GPU transform drift
                applied by the .hero-grain-animated class — never recompute the noise per frame. */}
            <svg
                style={grain}
                className={animated ? "hero-grain-animated" : undefined}
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id={filterId} x="0" y="0" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves={1}
                        stitchTiles="stitch"
                        seed={7}
                        result="noise"
                    />
                    {/* Desaturate so grain is neutral, not rainbow. */}
                    <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
                    {/* Stretch contrast away from 50% gray (else overlay cancels and grain
                        vanishes) and force alpha opaque for full, even coverage. */}
                    <feComponentTransfer in="mono">
                        <feFuncR type="linear" slope="2.4" intercept="-0.7" />
                        <feFuncG type="linear" slope="2.4" intercept="-0.7" />
                        <feFuncB type="linear" slope="2.4" intercept="-0.7" />
                        <feFuncA type="linear" slope="0" intercept="1" />
                    </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter={`url(#${filterId})`} />
            </svg>
        </div>
    );
}
