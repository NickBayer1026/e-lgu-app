"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
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
import {
  ADMIN_METRICS,
  MONTHLY_REQUESTS,
  OVERALL_REQUEST_STATUS,
  OVERALL_STATUS_TOTAL,
  REQUESTS_BY_SERVICE,
} from "@/lib/mock-data";

const monthlyConfig = {
  count: { label: "Requests", color: "var(--primary)" },
} as const;

const serviceConfig = {
  requests: { label: "Requests", color: "var(--primary)" },
} as const;

const approvedTotal = OVERALL_REQUEST_STATUS.filter(
  (item) => item.status === "Approved" || item.status === "Ready for Pickup"
).reduce((sum, item) => sum + item.value, 0);
const approvalRate = ((approvedTotal / OVERALL_STATUS_TOTAL) * 100).toFixed(1);

const SUMMARY = [
  {
    label: "Total Requests (6 months)",
    value: OVERALL_STATUS_TOTAL.toLocaleString(),
    change: "+14.2%",
  },
  { label: "Approval Rate", value: `${approvalRate}%`, change: "+3.1%" },
  {
    label: "Avg. Processing",
    value: `${ADMIN_METRICS.avgProcessingDays.toFixed(1)} days`,
    change: "-12%",
  },
  { label: "Digital Adoption", value: "71%", change: "+19%" },
];

export function AdminReports() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Performance summary and trends for municipal services.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-stagger">
        {SUMMARY.map((s) => (
          <Card key={s.label} className="card-hover">
            <CardHeader className="pb-2">
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-2xl font-bold tabular-nums">
                {s.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
              >
                {s.change} vs. last period
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Monthly Requests (6 months)</CardTitle>
            <CardDescription>Count of requests per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyConfig} className="h-64">
              <BarChart data={MONTHLY_REQUESTS}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, "dataMax + 200"]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Cumulative Service Demand</CardTitle>
            <CardDescription>
              Total requests grouped by service type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={serviceConfig} className="h-64">
              <LineChart data={REQUESTS_BY_SERVICE.map((d) => ({ ...d, name: d.service }))}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="service"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  tickFormatter={(v) =>
                    v.length > 12 ? `${v.slice(0, 12)}…` : v
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, "dataMax + 200"]}
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
                  dot
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}