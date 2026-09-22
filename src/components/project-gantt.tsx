"use client";

import { cn } from "@/lib/utils";
import {
  PROJECT_PHASES,
  TOTAL_WEEKS,
  type ProjectPhase,
} from "@/lib/project-data";

const WEEK_WIDTH = 100 / TOTAL_WEEKS;

const BAR_COLORS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

const PROGRESS: Record<string, number> = {
  planning: 100,
  analysis: 100,
  design: 100,
  development: 100,
  testing: 0,
  deployment: 0,
  evaluation: 0,
  finalization: 0,
};

function PhaseRow({ phase, index }: { phase: ProjectPhase; index: number }) {
  const left = ((phase.startWeek - 1) * WEEK_WIDTH).toFixed(3);
  const width = ((phase.endWeek - phase.startWeek + 1) * WEEK_WIDTH).toFixed(3);
  const progress = PROGRESS[phase.id] ?? 0;

  return (
    <div className="flex items-center border-b border-muted last:border-b-0">
      <div className="w-44 shrink-0 border-r px-3 py-2.5">
        <p className="truncate text-xs font-semibold">{phase.short}</p>
        <p className="text-[11px] text-muted-foreground">
          {phase.weeksLabel}
        </p>
      </div>

      <div className="relative flex-1 py-2.5">
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
          <span
            key={i}
            className="absolute inset-y-0 border-l border-muted last:border-l-0"
            style={{ left: `${i * WEEK_WIDTH}%`, width: `${WEEK_WIDTH}%` }}
          />
        ))}

        <div
          className="group relative h-6 rounded-full bg-muted/60"
          style={{ left: `${left}%`, width: `${width}%` }}
          title={`${phase.short} · ${phase.weeksLabel}`}
        >
          <div
            className={cn(
              "flex h-full items-center overflow-hidden rounded-full pr-2",
              BAR_COLORS[index % BAR_COLORS.length]
            )}
            style={{ width: `${progress}%` }}
          >
            <span className="ml-2 truncate text-[11px] font-medium text-white/90">
              {phase.weeksLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectGantt() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        {/* Month band */}
        <div className="flex items-center border-b border-muted">
          <div className="w-44 shrink-0" />
          <div className="flex flex-1">
            {[1, 2, 3].map((month) => (
              <span
                key={month}
                className="border-l first:border-l-0 py-1 text-center text-[11px] font-medium text-muted-foreground first:border-l-0"
                style={{ width: `${WEEK_WIDTH * 4}%` }}
              >
                Month {month}
              </span>
            ))}
          </div>
        </div>

        {/* Week band */}
        <div className="flex items-center border-b border-muted bg-muted/30">
          <div className="w-44 shrink-0 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Phase
          </div>
          <div className="flex flex-1">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <span
                key={i}
                className="border-l first:border-l-0 py-1 text-center text-[11px] font-medium text-muted-foreground"
                style={{ width: `${WEEK_WIDTH}%` }}
              >
                W{i + 1}
              </span>
            ))}
          </div>
        </div>

        {PROJECT_PHASES.map((phase, i) => (
          <PhaseRow key={phase.id} phase={phase} index={i} />
        ))}
      </div>
    </div>
  );
}