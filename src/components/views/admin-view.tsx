"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  AdminSidebar,
  MobileAdminHeader,
  type AdminTab,
} from "@/components/admin-sidebar";
import { RequestReviewDialog } from "@/components/request-review-dialog";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminCitizens } from "@/components/views/admin/citizens";
import { AdminReports } from "@/components/views/admin/reports";
import { AdminRequests } from "@/components/views/admin/requests";
import { AdminServices } from "@/components/views/admin/services";
import { AdminSettings } from "@/components/views/admin/settings";
import { useAppState } from "@/lib/app-state";
import {
  ADMIN_METRICS,
  DATA_LAST_UPDATED,
  OVERALL_REQUEST_STATUS,
  OVERALL_STATUS_TOTAL,
  REQUEST_STATUS_COLORS,
  REQUESTS_BY_SERVICE,
  SUBMISSION_VOLUME_30_DAYS,
} from "@/lib/mock-data";

interface AdminViewProps {
  onBackToPublic: () => void;
}

const serviceChartConfig = {
  requests: {
    label: "Requests",
    color: "var(--primary)",
  },
} as const;

const volumeChartConfig = {
  requests: {
    label: "Submissions",
    color: "var(--primary)",
  },
} as const;

const statusChartConfig = {
  pending: { label: "Pending", color: REQUEST_STATUS_COLORS.Pending },
  review: {
    label: "Under Review",
    color: REQUEST_STATUS_COLORS["Under Review"],
  },
  approved: { label: "Approved", color: REQUEST_STATUS_COLORS.Approved },
  pickup: {
    label: "Ready for Pickup",
    color: REQUEST_STATUS_COLORS["Ready for Pickup"],
  },
  rejected: { label: "Rejected", color: REQUEST_STATUS_COLORS.Rejected },
} as const;

const STATUS_DATA_WITH_COLORS = OVERALL_REQUEST_STATUS;

export function AdminView({ onBackToPublic }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative z-10 min-h-screen">
      <AdminSidebar
        active={activeTab}
        onTabChange={setActiveTab}
        onBackToPublic={onBackToPublic}
        pendingCount={ADMIN_METRICS.pendingApprovals}
        collapsed={sidebarCollapsed}
        onToggleExpand={() => setSidebarCollapsed((c) => !c)}
      />

      <MobileAdminHeader
        active={activeTab}
        onTabChange={setActiveTab}
        onBackToPublic={onBackToPublic}
        pendingCount={ADMIN_METRICS.pendingApprovals}
      />

      <div
        className={cn(
          "min-h-screen pt-16 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:pt-0",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          <div key={activeTab} className="animate-fade-in space-y-6">
            {activeTab === "overview" && (
              <OverviewContent />
            )}
            {activeTab === "requests" && <AdminRequests />}
            {activeTab === "citizens" && <AdminCitizens />}
            {activeTab === "services" && <AdminServices />}
            {activeTab === "reports" && <AdminReports />}
            {activeTab === "settings" && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
}

function OverviewContent() {
  const { requests } = useAppState();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId
    ? requests.find((request) => request.id === selectedId) ?? null
    : null;

  const recentRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests
      .filter((request) => {
        if (!query) return true;
        return [request.trackingId, request.citizen, request.service].some(
          (value) => value.toLowerCase().includes(query)
        );
      })
      .slice()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 7);
  }, [requests, search]);

  const totalRequests = OVERALL_STATUS_TOTAL;
  const pendingApprovals = ADMIN_METRICS.pendingApprovals;

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Municipal Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of citizen service requests · Dapitan City, Zamboanga del Norte
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tracking ID..."
              className="h-9 pl-9"
              aria-label="Search recent requests"
            />
          </div>
          <Badge variant="outline" className="h-9 whitespace-nowrap">
            Last updated: {DATA_LAST_UPDATED}
          </Badge>
        </div>
      </div>

          {/* METRIC CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-stagger">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardDescription>Total Requests (6 months)</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {totalRequests.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  +12.5% this month
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardDescription>Pending Approvals</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {pendingApprovals.toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  {Math.round(
                    (pendingApprovals / totalRequests) * 100
                  )}
                  % awaiting review
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardDescription>Completed Today</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {ADMIN_METRICS.completedToday}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-sky-600 dark:text-sky-400">
                  92% on same-day target
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardDescription>Avg. Processing</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {ADMIN_METRICS.avgProcessingDays.toFixed(1)}{" "}
                  <span className="text-base font-medium">days</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  -0.6 days vs. last quarter
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS ROW 1 */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* BAR CHART — Requests by Service Type */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Requests by Service Type</CardTitle>
                <CardDescription>
                  Number of requests per available service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={serviceChartConfig} className="h-64">
                  <BarChart data={REQUESTS_BY_SERVICE} layout="vertical">
                    <CartesianGrid vertical={false} />
                    <XAxis type="number" dataKey="requests" hide />
                    <YAxis
                      type="category"
                      dataKey="service"
                      width={150}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        value.length > 18
                          ? `${value.slice(0, 18)}…`
                          : value
                      }
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                      dataKey="requests"
                      fill="var(--color-requests)"
                      radius={4}
                      barSize={18}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* LINE CHART — 30 day volume */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Submission Volume</CardTitle>
                <CardDescription>
                  Daily request submissions over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={volumeChartConfig} className="h-64">
                  <LineChart data={SUBMISSION_VOLUME_30_DAYS}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={24}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      domain={[0, "dataMax + 20"]}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="requests"
                      type="monotone"
                      stroke="var(--color-requests)"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS ROW 2 */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* DONUT CHART — Overall status */}
            <Card className="lg:col-span-1 card-hover">
              <CardHeader>
                <CardTitle>Overall Request Status</CardTitle>
                <CardDescription>Distribution of all requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={statusChartConfig}
                  className="mx-auto h-60"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={STATUS_DATA_WITH_COLORS}
                      dataKey="value"
                      nameKey="status"
                      innerRadius={62}
                      outerRadius={88}
                      strokeWidth={6}
                      stroke="var(--card)"
                    >
                      {STATUS_DATA_WITH_COLORS.map((entry) => (
                        <Cell key={entry.status} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="mt-2 text-center">
                  <span className="text-3xl font-bold tabular-nums">
                    {OVERALL_STATUS_TOTAL.toLocaleString()}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Total requests
                  </p>
                </div>

                {/* Legend */}
                <div className="mt-6 space-y-2.5">
                  {STATUS_DATA_WITH_COLORS.map((item) => (
                    <div
                      key={item.status}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span
                          className="size-2.5 rounded-sm"
                          style={{ backgroundColor: item.fill }}
                        />
                        {item.status}
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.value.toLocaleString()}
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          (
                          {Math.round(
                            (item.value / OVERALL_STATUS_TOTAL) * 100
                          )}
                          %)
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dummy helper card to fill the 3-col grid */}
            <div className="lg:col-span-2">
              <Card className="h-full card-hover">
                <CardHeader>
                  <CardTitle>Service Performance</CardTitle>
                  <CardDescription>
                    Average processing time per service (in days)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={serviceChartConfig} className="h-60">
                    <BarChart data={PERF_DATA}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="service"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) =>
                          value.length > 14
                            ? `${value.slice(0, 14)}…`
                            : value
                        }
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        domain={[0, 5]}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="avgDays"
                        name="Avg. days"
                        fill="var(--color-requests)"
                        radius={[4, 4, 0, 0]}
                        barSize={28}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RECENT REQUESTS TABLE */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>
                Latest incoming citizen service requests. Search by tracking
                ID, citizen, or service.
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
                  {recentRequests.map((request) => (
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
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {recentRequests.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-10 text-center text-muted-foreground"
                      >
                        No recent requests match your search.
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

const PERF_DATA = [
  { service: "Barangay Clearance", avgDays: 1.8 },
  { service: "Business Permit", avgDays: 3.9 },
  { service: "Cert. of Indigency", avgDays: 1.2 },
  { service: "Cedula", avgDays: 0.4 },
];