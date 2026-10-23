"use client";

import { useState } from "react";
import {
  ArrowRight,
  FilePlus2,
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { NotificationsButton } from "@/components/notifications-button";
import { PublicNavbar } from "@/components/public-navbar";
import { ServiceIcon } from "@/components/service-icon";
import { StatusBadge } from "@/components/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { generateTrackingId, useAppState } from "@/lib/app-state";
import { CITIZEN, type CitizenRequest } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface CitizenViewProps {
  onLogout: () => void;
  onSwitchToView: (view: "public" | "citizen" | "admin") => void;
}

export function CitizenView({ onLogout, onSwitchToView }: CitizenViewProps) {
  const { requests, services, addRequest } = useAppState();
  const [newService, setNewService] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);

  const myRequests = requests.filter(
    (request) => request.citizen === CITIZEN.name
  );
  const visibleRequests = activeOnly
    ? myRequests.filter((request) => request.status !== "Rejected")
    : myRequests;

  const initials = CITIZEN.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handleSubmitRequest = () => {
    if (!newService) return;

    const next: CitizenRequest = {
      id: `r${Date.now()}`,
      trackingId: generateTrackingId(newService, requests),
      citizen: CITIZEN.name,
      service: newService,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Pending",
    };

    addRequest(next);
    setNewService("");
    setDialogOpen(false);
  };

  return (
    <div className="relative z-10 min-h-screen">
      <PublicNavbar onLogin={onLogout} loggedIn />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Mabuhay, <span className="text-primary">Kababayan</span>
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {CITIZEN.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSwitchToView("admin")}
              className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin demo →
            </Button>
            <Dialog
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) setNewService("");
              }}
            >
              <DialogTrigger asChild>
                <Button className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <FilePlus2 className="mr-2 size-4" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>New Service Request</DialogTitle>
                  <DialogDescription>
                    Select a service to start an online application. You can
                    track its progress from this dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>
                    Applying as <strong>{CITIZEN.name}</strong>
                  </span>
                </div>
                <Select
                  value={newService}
                  onValueChange={(value) => setNewService(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem
                        key={service.id}
                        value={service.name}
                        className="gap-3"
                      >
                        <span className="flex items-center gap-2">
                          <ServiceIcon
                            name={service.icon}
                            className="size-4 text-primary"
                          />
                          {service.name}
                          <span className="text-xs text-muted-foreground">
                            · {service.fee}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitRequest} disabled={!newService}>
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* PROFILE SUMMARY */}
        <Card className="mt-6 border animate-fade-in-up [animation-delay:0.1s]">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto]">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/15 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-lg font-semibold">{CITIZEN.name}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {CITIZEN.address}, Brgy. {CITIZEN.barangay}, {CITIZEN.city}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {CITIZEN.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" />
                  {CITIZEN.contact}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-end md:justify-center">
              <NotificationsButton
                scope="citizen"
                label="Notifications"
                showDot
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground"
              >
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* REQUESTS */}
        <div className="mt-10 flex items-center justify-between animate-fade-in-up [animation-delay:0.2s]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Requests</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Track the status of your submitted service requests.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="group"
            aria-pressed={activeOnly}
            onClick={() => setActiveOnly((value) => !value)}
          >
            {activeOnly ? "View all" : "Active only"}
            <ArrowRight className="ml-1.5 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 animate-stagger">
          {visibleRequests.map((request) => {
            const service = services.find(
              (item) => item.name === request.service
            );
            return (
              <Card
                key={request.id}
                className="group border card-hover hover:border-primary/40"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ServiceIcon
                        name={service?.icon ?? ""}
                        className="size-5"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {request.service}
                      </CardTitle>
                      <CardDescription className="font-mono text-xs">
                        {request.trackingId}
                      </CardDescription>
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Submitted {request.date}</span>
                    <span
                      className={cn(
                        "font-medium",
                        request.status === "Rejected"
                          ? "text-destructive"
                          : "text-primary"
                      )}
                    >
                      {service?.fee ?? "—"}
                    </span>
                  </div>
                  {request.notes && (
                    <p className="mt-2 rounded-md bg-destructive/5 px-3 py-2 text-xs text-destructive">
                      {request.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {visibleRequests.length === 0 && (
          <Card className="mt-5 border border-dashed">
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              No requests match this filter.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
