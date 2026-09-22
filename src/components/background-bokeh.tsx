"use client";

import { useMemo } from "react";

interface Bokeh {
  size: number;
  left: string;
  top: string;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
}

const DRIFT = [
  "bokeh-drift-1",
  "bokeh-drift-2",
  "bokeh-drift-3",
];

const COLOR_POOL = ["var(--primary)", "oklch(0.75 0.12 250)", "oklch(0.72 0.11 300)"];

export function BackgroundBokeh({ count = 9 }: { count?: number }) {
  const bokehs = useMemo<Bokeh[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        size: 120 + ((i * 97) % 200),
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        color: COLOR_POOL[i % COLOR_POOL.length],
        delay: (i % 5) * 1.1,
        duration: 16 + ((i * 7) % 10),
        opacity: 0.35 + ((i % 4) * 0.1),
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {bokehs.map((b, i) => (
        <div
          key={i}
          className="bokeh-sprite absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: b.color,
            opacity: b.opacity,
            animation: `${DRIFT[i % DRIFT.length]} ${b.duration}s ease-in-out ${b.delay}s infinite, bokeh-pulse ${(b.duration * 2) % 14 + 8}s ease-in-out ${b.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}