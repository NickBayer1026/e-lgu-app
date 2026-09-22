"use client";

import { Boxes } from "lucide-react";

import { WBS_LEVELS, WBS_ROOT } from "@/lib/project-data";

export function ProjectWbs() {
  return (
    <div className="w-full">
      {/* Root node */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-5 py-2.5 text-sm font-semibold">
          <Boxes className="size-4 text-primary" />
          {WBS_ROOT}
        </div>
      </div>

      <div className="mx-auto h-6 w-px bg-border" />

      {/* Levels */}
      <div className="grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
        {WBS_LEVELS.map((level) => (
          <div key={level.id} className="relative">
            <div className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-border" />

            <div className="mx-auto w-fit rounded-lg border border-border bg-card px-3 py-1.5 shadow-sm">
              <p className="text-xs font-semibold">{level.phase}</p>
            </div>

            <ul className="mt-4 ml-4 space-y-2.5 border-l border-dashed border-muted-foreground/40 pl-4">
              {level.tasks.map((task) => (
                <li
                  key={task}
                  className="relative flex items-start gap-2 text-xs leading-snug text-muted-foreground"
                >
                  <span className="absolute -left-[17px] top-1.5 size-1.5 rounded-full bg-primary/60" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}