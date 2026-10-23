"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";

import { RequestReviewDialog } from "@/components/request-review-dialog";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useAppState } from "@/lib/app-state";
import type { RequestStatus } from "@/lib/mock-data";

const STATUS_FILTERS: ("All" | RequestStatus)[] = [
  "All",
  "Pending",
  "Under Review",
  "Approved",
  "Ready for Pickup",
  "Rejected",
];

export function AdminRequests() {
  const { requests } = useAppState();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RequestStatus>(
    "All"
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return requests.filter((request) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !search ||
        request.trackingId.toLowerCase().includes(query) ||
        request.citizen.toLowerCase().includes(query) ||
        request.service.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  // Derive the selected request from shared state by ID so status changes made
  // in the dialog are reflected immediately instead of using a stale object.
  const selected = selectedId
    ? requests.find((request) => request.id === selectedId) ?? null
    : null;

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
              aria-label="Search requests"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "All" | RequestStatus)}
          >
            <SelectTrigger className="w-full sm:w-44" aria-label="Filter by status">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
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
                        onClick={() => setSelectedId(request.id)}
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

      <RequestReviewDialog
        request={selected}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
