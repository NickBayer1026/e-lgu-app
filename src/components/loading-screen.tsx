"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Let the gradient bar reach 100% (~3s), then fade the overlay out.
    const timer = setTimeout(() => {
      setLeaving(true);
    }, 3100);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3450);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-300 ease-out",
        leaving ? "opacity-0" : "opacity-100"
      )}
    >
      {/* App icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-primary/20 blur-2xl" />
        <div className="icon-beat flex size-24 items-center justify-center overflow-hidden rounded-3xl bg-primary/10 ring-1 ring-primary/25 shadow-xl">
          <Image
            src="/logo.png"
            alt="e-LGU"
            width={96}
            height={96}
            className="size-24 object-contain"
            priority
          />
        </div>
      </div>

      {/* Wordmark */}
      <p className="text-lg font-bold tracking-tight">e-LGU</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Local Government Services
      </p>

      {/* Gradient loading bar */}
      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-muted/60">
        <div className="loading-fill" />
      </div>
    </div>
  );
}
