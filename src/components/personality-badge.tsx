import { Badge } from "@/components/ui/badge";
import type { WorkPersonality } from "@/lib/project-data";
import { cn } from "@/lib/utils";

const PERSONALITY_STYLES: Record<WorkPersonality, string> = {
  Deliverer:
    "border-primary/25 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/15",
  Prototype:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300",
  Perfector:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
  Producer:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  Fixer:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  Finisher:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300",
};

export function PersonalityBadge({
  personality,
  className,
}: {
  personality: WorkPersonality;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", PERSONALITY_STYLES[personality], className)}
    >
      {personality}
    </Badge>
  );
}
