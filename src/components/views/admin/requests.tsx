"use client";

import { useMemo, useState } from "react";
import { Check, Eye, Search, X } from "lucide-react";

import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ALL_REQUESTS,
  type CitizenRequest,
  type RequestStatus,
} from "@/lib/mock-data";

const STATUS_FILTERS: ("All" | RequestStatus)[] = [
  "All",
  "Pending",
  "Under Review",
  "Approved",
  "Ready for Pickup",
  "Rejected",
];

interface AdminRequestsProps {
  initialRequests?: CitizenRequest[];
}

export function AdminRequests({ initialRequests }: AdminRequestsProps) {
  const [requests, setRequests] = useState<CitizenRequest[]>(
    initialRequests ?? ALL_REQUESTS
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RequestStatus>(
    "All"
  );
  const [selected, setSelected] = useState<CitizenRequest | null>(null);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        !search ||
        r.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        r.citizen.toLowerCase().includes(search.toLowerCase()) ||
        r.service.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const setRequestStatus = (id: string, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and manage all citizen service request applications.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, name, service..."
              className="pl-9"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "All" | RequestStatus)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>
            {filtered.length} request(s) match your filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Citizen Name</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((request) => (
                  <TableRow
                    key={request.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-xs font-medium">
                      {request.trackingId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {request.citizen}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.service}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelected(request)}
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No requests found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* REVIEW DIALOG */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Request</DialogTitle>
              <DialogDescription>
                {selected.trackingId} · submitted {selected.date}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-semibold">{selected.citizen}</p>
                  <p className="text-sm text-muted-foreground">
                    {selected.service}
                  </p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              {selected.notes && (
                <p className="rounded-md bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
                  Note: {selected.notes}
                </p>
              )}

              <div className="text-sm">
                <p className="mb-2 font-medium">Set request status</p>
                <Select
                  value={selected.status}
                  onValueChange={(v) =>
                    setRequestStatus(selected.id, v as RequestStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_FILTERS.filter((s) => s !== "All").map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button
                variant="destructive"
                disabled={selected.status === "Rejected"}
                onClick={() => {
                  setRequestStatus(selected.id, "Rejected");
                  setSelected(null);
                }}
              >
                <X className="mr-1.5 size-4" />
                Reject
              </Button>
              <Button
                disabled={selected.status === "Approved"}
                onClick={() => {
                  setRequestStatus(selected.id, "Approved");
                  setSelected(null);
                }}
              >
                <Check className="mr-1.5 size-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}