"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AdminView } from "@/components/views/admin-view";
import { CitizenView } from "@/components/views/citizen-view";
import { LandingView } from "@/components/views/landing-view";
import { ProjectView } from "@/components/views/project-view";

type DemoView = "public" | "citizen" | "admin" | "project";

const VIEW_LABELS: Record<DemoView, string> = {
  public: "1 · Citizen Landing",
  citizen: "2 · Citizen Dashboard",
  admin: "3 · Admin Dashboard",
  project: "4 · Project Plan",
};

const VIEW_KEYS: DemoView[] = ["public", "citizen", "admin", "project"];

export default function Home() {
  const [view, setView] = useState<DemoView>("public");
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const btn = btnRefs.current[view];
    if (!container || !btn) return;

    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setPill({
      left: bRect.left - cRect.left + container.scrollLeft,
      width: bRect.width,
    });
  }, [view]);

  return (
    <>
      {/* Demo view switcher bar */}
      <div className="fixed bottom-3 left-1/2 z-50 w-full max-w-[calc(100vw-1.5rem)] -translate-x-1/2 sm:w-auto sm:bottom-4">
        <div
          ref={containerRef}
          className="smooth-scrollbar relative flex items-center gap-1 overflow-x-auto rounded-full border bg-background/95 p-1.5 shadow-md backdrop-blur"
        >
          {/* Animated sliding pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-primary shadow-sm transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: pill.left, width: pill.width }}
          />

          {VIEW_KEYS.map((key) => (
            <button
              key={key}
              ref={(el) => { btnRefs.current[key] = el; }}
              onClick={() => setView(key)}
              aria-label={`Switch to ${VIEW_LABELS[key]}`}
              className={cn(
                "relative z-10 shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 sm:px-4 sm:text-sm",
                view === key
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {VIEW_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div key={view} className="animate-fade-in">
        {view === "public" && (
          <LandingView onLogin={() => setView("citizen")} onSwitchToView={setView} />
        )}
        {view === "citizen" && (
          <CitizenView onLogout={() => setView("public")} onSwitchToView={setView} />
        )}
        {view === "admin" && (
          <AdminView onBackToPublic={() => setView("public")} />
        )}
        {view === "project" && (
          <ProjectView
            onBackToPublic={() => setView("public")}
            onSwitchToView={setView}
          />
        )}
      </div>
    </>
  );
}