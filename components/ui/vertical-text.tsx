/**
 * VerticalText — Large, subtle background text element
 *
 * Renders a giant word vertically on the left or right side of a section.
 * Inspired by SCM Ink's design pattern. The parent section MUST have
 * `relative` and `overflow-hidden` classes for proper clipping.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <VerticalText text="FUNNEL" side="right" />
 *     {content}
 *   </section>
 */

interface VerticalTextProps {
  text: string;
  side?: "left" | "right";
  className?: string;
}

export function VerticalText({ text, side = "right", className = "" }: VerticalTextProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block ${
        isLeft ? "-left-4" : "-right-4"
      } ${className}`}
    >
      <span
        className="font-black text-[14rem] lg:text-[20rem] uppercase tracking-tight text-white/[0.08] whitespace-nowrap"
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
