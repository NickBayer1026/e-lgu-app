"use client";

import { Check, X } from "lucide-react";

import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppState } from "@/lib/app-state";
import type { CitizenRequest, RequestStatus } from "@/lib/mock-data";

const STATUS_OPTIONS: RequestStatus[] = [
  "Pending",
  "Under Review",
  "Approved",
  "Ready for Pickup",
  "Rejected",
];

interface RequestReviewDialogProps {
  request: CitizenRequest | null;
  onClose: () => void;
}

export function RequestReviewDialog({
  request,
  onClose,
}: RequestReviewDialogProps) {
  const { updateRequestStatus } = useAppState();

  if (!request) return null;

  const setStatus = (status: RequestStatus) => {
    updateRequestStatus(request.id, status);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Review Request</DialogTitle>
          <DialogDescription>
            {request.trackingId} · submitted {request.date}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-semibold">{request.citizen}</p>
              <p className="text-sm text-muted-foreground">{request.service}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>

          {request.notes && (
            <p className="rounded-md bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
              Note: {request.notes}
            </p>
          )}

          <div className="text-sm">
            <p className="mb-2 font-medium">Set request status</p>
            <Select
              value={request.status}
              onValueChange={(value) => setStatus(value as RequestStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="destructive"
            disabled={request.status === "Rejected"}
            onClick={() => {
              setStatus("Rejected");
              onClose();
            }}
          >
            <X className="mr-1.5 size-4" />
            Reject
          </Button>
          <Button
            disabled={request.status === "Approved"}
            onClick={() => {
              setStatus("Approved");
              onClose();
            }}
          >
            <Check className="mr-1.5 size-4" />
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
