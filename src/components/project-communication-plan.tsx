import {
  Clock,
  FolderKanban,
  Mail,
  MessagesSquare,
  Target,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  COMMUNICATION_MATRIX,
  COMMUNICATION_METHODS,
  COMMUNICATION_OBJECTIVES,
  COMMUNICATION_STAKEHOLDERS,
} from "@/lib/project-data";
import { cn } from "@/lib/utils";

const METHOD_ICONS: Record<string, LucideIcon> = {
  chat: MessagesSquare,
  meeting: Video,
  email: Mail,
  board: FolderKanban,
  interview: Users,
};

function PartHeading({
  part,
  title,
  description,
}: {
  part: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        {part}
      </span>
      <div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ProjectCommunicationPlan() {
  return (
    <div className="space-y-14">
      {/* PART 1 — STAKEHOLDERS */}
      <div>
        <PartHeading
          part="1"
          title="Project Stakeholders"
          description="The people and groups who influence the project or are affected by the e-LGU system, together with their role and interest."
        />

        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-52">Stakeholder</TableHead>
                <TableHead className="min-w-64">Role in the Project</TableHead>
                <TableHead className="min-w-72">Involvement / Interest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMMUNICATION_STAKEHOLDERS.map((stakeholder) => (
                <TableRow key={stakeholder.id} className="align-top">
                  <TableCell className="whitespace-normal">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">
                        {stakeholder.stakeholder}
                      </span>
                      <Badge
                        variant={
                          stakeholder.type === "Internal"
                            ? "secondary"
                            : "outline"
                        }
                        className="font-normal"
                      >
                        {stakeholder.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {stakeholder.role}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {stakeholder.involvement}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PART 2 — OBJECTIVES */}
      <div>
        <PartHeading
          part="2"
          title="Communication Objectives"
          description="What the team wants to achieve through regular, clear, and documented communication."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMMUNICATION_OBJECTIVES.map((objective, index) => (
            <Card key={objective.id} className="h-full">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="size-4" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Objective {index + 1}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{objective.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {objective.objective}
                  </p>
                </div>
                <p className="border-t pt-3 text-xs leading-relaxed text-muted-foreground">
                  {objective.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* PART 3 — MATRIX */}
      <div>
        <PartHeading
          part="3"
          title="Project Communication Matrix"
          description="Who shares what, through which method, how often, and who is responsible for making it happen."
        />

        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <Table className="min-w-[1100px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-44">Stakeholders</TableHead>
                <TableHead className="min-w-56">Information to Share</TableHead>
                <TableHead className="min-w-52">Communication Method</TableHead>
                <TableHead className="min-w-40">Frequency</TableHead>
                <TableHead className="min-w-48">Responsible Person</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMMUNICATION_MATRIX.map((row) => (
                <TableRow key={row.id} className="align-top">
                  <TableCell className="whitespace-normal font-semibold">
                    {row.stakeholder}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {row.information}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    {row.method}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <Badge variant="secondary" className="font-normal">
                      {row.frequency}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {row.responsible}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PART 4 — METHODS */}
      <div>
        <PartHeading
          part="4"
          title="Types and Forms of Communication"
          description="The communication methods the team will use and the purpose each one serves during the project."
        />

        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-60">Communication Method</TableHead>
                <TableHead className="min-w-80">Purpose</TableHead>
                <TableHead className="min-w-52">Best Used For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMMUNICATION_METHODS.map((method) => {
                const Icon = METHOD_ICONS[method.icon] ?? MessagesSquare;

                return (
                  <TableRow key={method.id} className="align-top">
                    <TableCell className="whitespace-normal">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <p className="font-semibold">{method.method}</p>
                          <p className="text-xs text-muted-foreground">
                            {method.channel}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {method.purpose}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {method.bestFor}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Card className={cn("mt-4 border-primary/20 bg-primary/5")}>
          <CardContent className="flex items-start gap-3 p-5">
            <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold">Response expectations</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Group chat messages should be acknowledged within the same day,
                email within 24 hours, and urgent blockers should be raised
                immediately in the group chat and to the Project Manager.
                Important decisions are recorded in the meeting minutes and
                shared task board.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
