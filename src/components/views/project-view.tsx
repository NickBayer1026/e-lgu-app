"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  Bug,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Code2,
  Database,
  Flag,
  Layers,
  Mail,
  MapPin,
  Palette,
  Phone,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/reveal";
import { ProjectGantt } from "@/components/project-gantt";
import { ProjectWbs } from "@/components/project-wbs";
import {
  BUDGET_ITEMS,
  CONTACT,
  formatPeso,
  PROJECT_OBJECTIVES,
  PROJECT_OVERVIEW,
  PROJECT_PHASES,
  SCOPE_EXCLUDED,
  SCOPE_INCLUDED,
  TEAM_MEMBERS,
  TOTAL_BUDGET,
  type ProjectPhase,
  type TeamMember,
} from "@/lib/project-data";

const PHASE_ICONS: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  scale: Scale,
  palette: Palette,
  code: Code2,
  bug: Bug,
  rocket: Rocket,
  "clipboard-check": ClipboardCheck,
  flag: Flag,
  database: Database,
  search: Search,
};

interface ProjectViewProps {
  onBackToPublic?: () => void;
  onSwitchToView?: (view: "public" | "citizen" | "admin") => void;
}

function TeamAvatar({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const Icon = PHASE_ICONS[member.icon] ?? Users;

  if (!member.image || failed) {
    return (
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      width={56}
      height={56}
      className="size-14 shrink-0 rounded-xl object-cover ring-1 ring-border"
      onError={() => setFailed(true)}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-balance text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "wbs", label: "WBS" },
  { id: "sequencing", label: "Sequencing" },
  { id: "duration", label: "Duration" },
  { id: "gantt", label: "Gantt Chart" },
  { id: "budget", label: "Budget" },
  { id: "team", label: "Team & Contact" },
];

export function ProjectView({ onBackToPublic, onSwitchToView }: ProjectViewProps) {
  const sequencerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sequencerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY + e.deltaX;
      const canForward = el.scrollLeft < el.scrollWidth - el.clientWidth;
      const canBackward = el.scrollLeft > 0;
      const willMove = (delta > 0 && canForward) || (delta < 0 && canBackward);
      if (!willMove) return;
      e.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative z-10">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-24 pb-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur animate-fade-in-up">
            <Layers className="size-3.5 text-primary" />
            IS Project Portfolio · Laboratory Exercise 2
          </div>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight animate-fade-in-up [animation-delay:0.1s] sm:text-5xl">
            Project Schedule Plan &{" "}
            <span className="text-primary">Online Portfolio</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground animate-fade-in-up [animation-delay:0.2s]">
            {PROJECT_OVERVIEW.title}
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-in-up [animation-delay:0.3s]">
            {[
              { icon: CalendarDays, label: "Duration", value: PROJECT_OVERVIEW.duration },
              { icon: Wallet, label: "Budget", value: PROJECT_OVERVIEW.budget },
              { icon: Layers, label: "Phases", value: "8" },
              { icon: Users, label: "Team", value: `${PROJECT_OVERVIEW.teamSize} members` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card p-4 text-left shadow-sm"
              >
                <stat.icon className="mb-2 size-4 text-primary" />
                <p className="text-base font-semibold leading-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up [animation-delay:0.4s]">
            {onBackToPublic && (
              <Button variant="outline" size="lg" onClick={onBackToPublic}>
                Back to Home
              </Button>
            )}
            {onSwitchToView && (
              <Button size="lg" onClick={() => onSwitchToView("public")} className="group">
                View Live Demo
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* SECTION NAV */}
      <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="smooth-scrollbar mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                e.currentTarget.blur();
              }}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* OVERVIEW */}
      <section id="overview" className="scroll-mt-16 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="1 · Project Overview"
            title="What is e-LGU?"
            description="A summary of the proposed system, its goals, and the scope we plan to deliver."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{PROJECT_OVERVIEW.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {PROJECT_OVERVIEW.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 font-semibold">Main Goal</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {PROJECT_OVERVIEW.goal}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-2 font-semibold">Objectives</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {PROJECT_OBJECTIVES.map((obj) => (
                        <li key={obj} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={80}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">In Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {SCOPE_INCLUDED.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={160}>
                <Card className="border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-base">Out of Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {SCOPE_EXCLUDED.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WBS */}
      <section id="wbs" className="scroll-mt-16 border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="2 · Work Breakdown Structure"
            title="Breaking the Project into Manageable Work"
            description="The WBS (Work Breakdown Structure) decomposes the e-LGU system into the 8 major work packages and their sub-activities."
          />
          <Reveal>
            <ProjectWbs />
          </Reveal>
        </div>
      </section>

      {/* SEQUENCING */}
      <section id="sequencing" className="scroll-mt-16 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="3 · Activity Sequencing"
            title="Order of Activities"
            description="Phases are executed in a sequential order — each phase must be completed before the next one begins."
          />

          <Reveal>
            <div
              ref={sequencerRef}
              className="smooth-scrollbar overflow-x-auto pb-3"
            >
              <div className="flex w-max items-stretch gap-0">
                {PROJECT_PHASES.map((phase, i) => (
                  <div key={phase.id} className="flex items-center">
                    <div className="flex h-full w-40 flex-col justify-between rounded-xl border bg-card p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {phase.order}
                        </span>
                        {(() => {
                          const Icon = PHASE_ICONS[phase.icon] ?? Layers;
                          return <Icon className="size-4 text-primary" />;
                        })()}
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-semibold leading-tight">{phase.name}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {phase.duration} · {phase.weeksLabel}
                        </p>
                      </div>
                    </div>
                    {i < PROJECT_PHASES.length - 1 && (
                      <div className="flex flex-col items-center px-1 text-muted-foreground">
                        <ArrowRight className="size-5 hidden sm:block" />
                        <ArrowRight className="size-5 rotate-90 sm:hidden" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Sequential flow: each phase depends on the completion of the previous phase.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DURATION */}
      <section id="duration" className="scroll-mt-16 border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="4 · Activity Duration Estimation"
            title="Duration Estimates per Phase"
            description="Estimated time needed to complete each phase, its starting week, and the deliverable it produces."
          />

          <Reveal>
            <div className="rounded-xl border bg-card shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-40">Phase</TableHead>
                    <TableHead>Key Activities</TableHead>
                    <TableHead className="w-28">Duration</TableHead>
                    <TableHead className="w-32">Timeline</TableHead>
                    <TableHead className="min-w-52">Deliverable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROJECT_PHASES.map((phase: ProjectPhase) => (
                    <TableRow key={phase.id}>
                      <TableCell>
                        <p className="font-semibold whitespace-normal">
                          {phase.code} {phase.name}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <ul className="space-y-1 text-muted-foreground">
                          {phase.activities.map((a) => (
                            <li key={a} className="flex items-start gap-1.5">
                              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="whitespace-normal">{phase.duration}</TableCell>
                      <TableCell className="whitespace-normal">
                        <Badge variant="secondary">{phase.weeksLabel}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-normal text-muted-foreground">
                        {phase.deliverable}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={2} className="font-semibold">
                      Total Planning Period
                    </TableCell>
                    <TableCell className="whitespace-normal font-semibold">
                      12 weeks
                    </TableCell>
                    <TableCell className="whitespace-normal font-semibold">
                      Weeks 1–12
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      Complete system ready for submission
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GANTT */}
      <section id="gantt" className="scroll-mt-16 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="5 · Gantt Chart"
            title="Project Timeline at a Glance"
            description="A 12-week Gantt chart showing when each phase starts and ends. Colored bars show completed phases (weeks 1–8), while planning of the remaining phases is underway."
          />

          <Reveal>
            <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6">
              <ProjectGantt />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BUDGET */}
      <section id="budget" className="scroll-mt-16 border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="6 · Estimated Budget"
            title="Estimated Project Cost"
            description="Estimated budget for the e-LGU project. Figures are estimates for the academic proposal and may change based on existing LGU infrastructure."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-xl border bg-card shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Item</TableHead>
                      <TableHead className="w-40 text-right">Estimated Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BUDGET_ITEMS.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell>{b.item}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatPeso(b.cost)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="font-semibold">Total Estimated Budget</TableCell>
                      <TableCell className="text-right text-base font-bold tabular-nums">
                        {formatPeso(TOTAL_BUDGET)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={80}>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="flex items-start gap-3 p-5">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Budget covers computing equipment, hosting, tools, testing,
                      training, and a contingency fund. Costs are re-evaluated as
                      requirements become final.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM & CONTACT */}
      <section id="team" className="scroll-mt-16 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="7 · Team Members"
            title="Meet the Team"
            description="Our group of five working together to plan, build, and test the e-LGU system."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={member.id} delay={i * 60}>
                <Card className="h-full card-hover">
                  <CardHeader className="flex-row items-center gap-3">
                    <TeamAvatar member={member} />
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 font-medium">
                        {member.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {member.responsibilities}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <Card size="sm" className="h-full flex-col justify-center border-dashed">
                <CardHeader>
                  <CardTitle className="text-base">{CONTACT.org}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4 shrink-0 text-primary" />
                    <a href={`mailto:${CONTACT.email}`} className="link-underline">
                      {CONTACT.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    {CONTACT.location}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-4 shrink-0 text-primary" />
                    Contact any group member above
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-sm font-medium">
            {PROJECT_OVERVIEW.title}
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {CONTACT.note} · © 2026 {CONTACT.org}
          </p>
        </div>
      </footer>
    </div>
  );
}