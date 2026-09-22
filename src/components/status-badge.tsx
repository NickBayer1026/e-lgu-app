import { Badge } from "@/components/ui/badge";
import type { RequestStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<RequestStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
  "Under Review":
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30",
  Approved:
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  "Ready for Pickup":
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30",
  Rejected:
    "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", STATUS_STYLES[status])}>
      <span className="size-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </Badge>
  );
}
