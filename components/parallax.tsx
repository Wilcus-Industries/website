"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const DRIFT_FACTOR = 0.1; // scroll-to-drift ratio for the clamped hero mode (slight)

export default function Parallax({ children, distance = 120, clampToNext = false, className }: {
    children: React.ReactNode,
    /** generic mode: px the block drifts down across its pass through the viewport */
    distance?: number,
    /** hero mode: drift driven by page scroll, clamped to the gap before the next sibling (login buttons) */
    clampToNext?: boolean,
    /** classes applied to the moving element itself (e.g. `absolute bottom-0 right-0` to anchor + parallax in one box) */
    className?: string,
}) {
    const ref = useRef<HTMLDivElement>(null);
    const maxYRef = useRef(0); // rest-gap from this block's bottom to the next sibling's top
    const reduce = useReducedMotion();

    // Hero mode: absolute page scroll, clamped so the block stops at the next sibling's top.
    const { scrollY } = useScroll();
    const yClamped = useTransform(scrollY, (v) => Math.min(v * DRIFT_FACTOR, maxYRef.current));

    // Generic mode: progress as THIS element passes through the viewport (works anywhere on the page).
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yGeneric = useTransform(scrollYProgress, [0, 1], [0, distance]);

    // offsetTop/offsetHeight are layout-based and ignore the applied transform, so maxYRef is the true rest-gap.
    useEffect(() => {
        if (!clampToNext) return;
        const measure = () => {
            const el = ref.current;
            const next = el?.nextElementSibling as HTMLElement | null;
            if (!el || !next) return;
            maxYRef.current = Math.max(0, next.offsetTop - el.offsetTop - el.offsetHeight);
        };
        measure();
        window.addEventListener("resize", measure);
        // Re-measure once webfonts settle (Playfair changes the tagline's height).
        document.fonts?.ready.then(measure);
        return () => window.removeEventListener("resize", measure);
    }, [clampToNext]);

    const y = clampToNext ? yClamped : yGeneric;

    return (
        <motion.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
            {children}
        </motion.div>
    );
}
