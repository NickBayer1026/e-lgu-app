"use client";

import Image from "next/image";
import { useState } from "react";
import { Users } from "lucide-react";

import { PersonalityBadge } from "@/components/personality-badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TEAM_MEMBERS,
  WORK_PERSONALITIES,
  type TeamMember,
  type WorkPersonality,
} from "@/lib/project-data";

function OrgAvatar({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);

  if (!member.image || failed) {
    return (
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-background">
        <Users className="size-6" />
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      width={64}
      height={64}
      className="mx-auto size-16 rounded-full object-cover ring-2 ring-background"
      onError={() => setFailed(true)}
    />
  );
}

function OrgNode({
  member,
  isLead = false,
}: {
  member: TeamMember;
  isLead?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full rounded-xl border bg-card p-4 text-center shadow-sm",
        isLead && "border-primary/40 bg-primary/5 shadow-md"
      )}
    >
      <OrgAvatar member={member} />
      <p className="mt-3 text-[13px] font-semibold leading-tight">
        {member.name}
      </p>
      <p className="mt-1 text-xs font-medium text-primary">{member.role}</p>
      <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
        {member.personality.map((personality) => (
          <PersonalityBadge
            key={personality}
            personality={personality}
            className="text-[10px]"
          />
        ))}
      </div>
    </div>
  );
}

export function TeamOrgChart() {
  const lead =
    TEAM_MEMBERS.find((member) => member.role.startsWith("Project Manager")) ??
    TEAM_MEMBERS[0];
  const members = TEAM_MEMBERS.filter((member) => member.id !== lead.id);
  const assignedPersonalities = new Set(
    TEAM_MEMBERS.flatMap((member) => member.personality)
  );

  return (
    <div className="rounded-xl border bg-card/60 p-5 shadow-sm sm:p-8">
      {/* Desktop / tablet tree */}
      <div className="hidden md:block">
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <OrgNode member={lead} isLead />
          </div>
        </div>

        <div className="mx-auto h-8 w-px bg-border" />

        <div className="relative">
          {/* Horizontal connector bus */}
          <div className="absolute inset-x-[12.5%] top-0 h-px bg-border" />

          <div className="grid grid-cols-4">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col items-center px-2">
                <div className="h-7 w-px bg-border" />
                <OrgNode member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stacked tree */}
      <div className="md:hidden">
        <OrgNode member={lead} isLead />

        <div className="ml-5 mt-5 space-y-4 border-l-2 border-dashed border-border pl-6">
          {members.map((member) => (
            <div key={member.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-6 top-9 h-0.5 w-6 bg-border"
              />
              <OrgNode member={member} />
            </div>
          ))}
        </div>
      </div>

      {/* Work personality legend */}
      <div className="mt-10 border-t pt-6">
        <p className="text-sm font-semibold">Work Personalities</p>
        <p className="mt-1 text-xs text-muted-foreground">
          The team&apos;s working styles and the contribution each one brings to
          the project.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(WORK_PERSONALITIES) as WorkPersonality[]).map(
            (key) => {
              const personality = WORK_PERSONALITIES[key];
              const assigned = assignedPersonalities.has(key);

              return (
                <div
                  key={key}
                  className={cn(
                    "rounded-lg border p-3",
                    assigned
                      ? "border-primary/25 bg-primary/5"
                      : "border-dashed opacity-60"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">
                      {personality.label}
                    </span>
                    {assigned && (
                      <Badge
                        variant="outline"
                        className="border-primary/25 bg-primary/10 text-[10px] text-primary"
                      >
                        Assigned
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {personality.description}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
