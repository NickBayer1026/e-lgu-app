"use client";

import { useEffect, useRef } from "react";

const CARD_SELECTOR = '[data-slot="card"]';

/**
 * Cursor-reactive visual effects:
 * 1. A soft spotlight that follows the pointer across the page background.
 * 2. A 1px gradient outline on cards that shines toward the pointer.
 *
 * Both effects are disabled for touch devices and for visitors who prefer
 * reduced motion. All work is throttled to one animation frame.
 */
export function CursorFx() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spotlight = spotlightRef.current;

    if (!spotlight || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hoveredCard: HTMLElement | null = null;

    const clearCard = () => {
      if (!hoveredCard) return;
      hoveredCard.style.removeProperty("--cursor-mx");
      hoveredCard.style.removeProperty("--cursor-my");
      hoveredCard = null;
    };

    const render = () => {
      frame = 0;
      spotlight.style.setProperty("--cursor-x", `${pointerX}px`);
      spotlight.style.setProperty("--cursor-y", `${pointerY}px`);

      if (!hoveredCard) return;

      const rect = hoveredCard.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const mx = ((pointerX - rect.left) / rect.width) * 100;
      const my = ((pointerY - rect.top) / rect.height) * 100;
      hoveredCard.style.setProperty("--cursor-mx", `${mx}%`);
      hoveredCard.style.setProperty("--cursor-my", `${my}%`);
    };

    const scheduleRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      spotlight.dataset.active = "true";

      const target = event.target as Element | null;
      const card = target?.closest?.(CARD_SELECTOR) ?? null;
      const nextCard = card instanceof HTMLElement ? card : null;

      if (nextCard !== hoveredCard) {
        clearCard();
        hoveredCard = nextCard;
      }

      scheduleRender();
    };

    const onPointerLeave = () => {
      spotlight.dataset.active = "false";
      clearCard();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      if (frame) cancelAnimationFrame(frame);
      clearCard();
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden
      data-active="false"
      className="cursor-spotlight"
    />
  );
}
