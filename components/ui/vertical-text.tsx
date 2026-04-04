/**
 * VerticalText — Large, subtle background text element
 *
 * Renders a giant word vertically on the left or right side of a section.
 * Inspired by SCM Ink's design pattern. The parent section MUST have
 * `relative` and `overflow-hidden` classes for proper clipping.
 *
 * Variants:
 *  - "dark" (default): White text for dark/black background sections
 *  - "light": Dark text for white/light background sections
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <VerticalText text="FUNNEL" side="right" />
 *     {content}
 *   </section>
 *
 *   <section className="relative overflow-hidden bg-white">
 *     <VerticalText text="PROOF" side="left" variant="light" />
 *     {content}
 *   </section>
 */

interface VerticalTextProps {
  text: string;
  side?: "left" | "right";
  variant?: "dark" | "light";
  className?: string;
}

export function VerticalText({ text, side = "right", variant = "dark", className = "" }: VerticalTextProps) {
  const isLeft = side === "left";
  const colorClass = variant === "light"
    ? "text-black/[0.06]"
    : "text-white/[0.08]";

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block ${
        isLeft ? "-left-4" : "-right-4"
      } ${className}`}
    >
      <span
        className={`font-black text-[10rem] lg:text-[14rem] uppercase tracking-tight ${colorClass} whitespace-nowrap`}
        style={{
          writingMode: "vertical-lr",
          ...(isLeft ? { transform: "rotate(180deg)" } : {}),
        }}
      >
        {text}
      </span>
    </div>
  );
}
