/**
 * VerticalText — Large, subtle background text element
 *
 * Renders a giant word vertically on the left or right side of a section.
 * The text auto-sizes to fit the section height so the full word is always
 * legible. The parent section MUST have `relative` and `overflow-hidden`.
 *
 * Variants:
 *  - "dark" (default): White text for dark/black background sections
 *  - "light": Dark text for white/light background sections
 */

"use client";

import { useRef, useEffect, useState } from "react";

interface VerticalTextProps {
  text: string;
  side?: "left" | "right";
  variant?: "dark" | "light";
  className?: string;
}

export function VerticalText({ text, side = "right", variant = "dark", className = "" }: VerticalTextProps) {
  const isLeft = side === "left";
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(160); // px, starting size

  const colorClass = variant === "light"
    ? "text-black/[0.07]"
    : "text-white/[0.08]";

  // Measure parent section height and scale font to fit
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parent = container.parentElement;
    if (!parent) return;

    const resize = () => {
      const sectionHeight = parent.clientHeight;
      // The text width when vertical = the visual height it occupies
      // We want the word to fill roughly 85% of the section height
      // Approximate: each character is ~0.6x the font size in width
      const charCount = text.length;
      const targetHeight = sectionHeight * 0.85;
      const estimated = targetHeight / (charCount * 0.65);
      // Clamp between 80px and 220px
      setFontSize(Math.min(220, Math.max(80, estimated)));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block ${
        isLeft ? "-left-2" : "-right-2"
      } ${className}`}
    >
      <span
        className={`font-black uppercase tracking-tight ${colorClass} whitespace-nowrap`}
        style={{
          writingMode: "vertical-lr",
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          ...(isLeft ? { transform: "rotate(180deg)" } : {}),
        }}
      >
        {text}
      </span>
    </div>
  );
}
