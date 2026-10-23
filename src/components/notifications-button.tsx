"use client";

import { BellRing } from "lucide-react";

import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppState } from "@/lib/app-state";
import { CITIZEN, type RequestStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ADMIN_PRIORITY: Record<RequestStatus, number> = {
  Pending: 0,
  "Under Review": 1,
  "Ready for Pickup": 2,
  Approved: 3,
  Rejected: 4,
};

interface NotificationsButtonProps {
  scope: "citizen" | "admin";
  label?: string;
  className?: string;
  showDot?: boolean;
}

export function NotificationsButton({
  scope,
  label,
  className,
  showDot = false,
}: NotificationsButtonProps) {
  const { requests } = useAppState();

  const items = (scope === "citizen"
    ? requests.filter((request) => request.citizen === CITIZEN.name)
    : requests
  )
    .slice()
    .sort((a, b) => {
      if (scope === "admin") {
        const priority =
          ADMIN_PRIORITY[a.status] - ADMIN_PRIORITY[b.status];
        if (priority !== 0) return priority;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 10);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={label ? "sm" : "icon"}
          className={cn("relative", className)}
          aria-label={label ?? "Notifications"}
        >
          {showDot && items.length > 0 && (
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive animate-pulse-soft" />
          )}
          <BellRing className={cn("size-4", label && "mr-2")} />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            {scope === "citizen"
              ? "Status updates for your submitted requests."
              : "Requests that need attention, ordered by priority."}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-80 space-y-2 overflow-y-auto">
          {items.map((request) => (
            <div
              key={request.id}
              className="flex items-start justify-between gap-3 rounded-lg border p-3"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium">
                  {request.trackingId}
                </p>
                <p className="truncate text-sm font-medium">
                  {request.service}
                </p>
                <p className="text-xs text-muted-foreground">
                  {request.citizen} · {request.date}
                </p>
              </div>
              <StatusBadge status={request.status} />
            </div>
          ))}

          {items.length === 0 && (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No notifications yet.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
