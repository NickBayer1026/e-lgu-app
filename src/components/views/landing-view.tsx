"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ServiceIcon } from "@/components/service-icon";
import { PublicNavbar } from "@/components/public-navbar";
import { StatusBadge } from "@/components/status-badge";
import { useAppState } from "@/lib/app-state";
import type { CitizenRequest } from "@/lib/mock-data";

interface LandingViewProps {
  onLogin: () => void;
  onSwitchToView: (view: "public" | "citizen" | "admin" | "project") => void;
}

export function LandingView({ onLogin, onSwitchToView }: LandingViewProps) {
  const { requests, services } = useAppState();
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<
    CitizenRequest | "not-found" | null
  >(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = trackingId.trim().toUpperCase();
    if (!normalized) {
      setTrackingResult(null);
      return;
    }
    const found = requests.find(
      (r) => r.trackingId.toUpperCase() === normalized
    );
    setTrackingResult(found ?? "not-found");
  };

  return (
    <div className="relative z-10">
      <PublicNavbar
        onLogin={onLogin}
        loggedIn={false}
        onOpenProject={() => onSwitchToView("project")}
      />

      {/* HERO */}
      <section
        id="home"
        className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-16"
      >
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 text-center sm:px-6 md:pt-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur animate-fade-in-up">
            <MapPin className="size-3.5 text-primary" />
            Municipal e-Governance Portal · Dapitan City, Zamboanga del Norte
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up text-balance [animation-delay:0.1s]">
            Request LGU Services{" "}
            <span className="text-primary">Online</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground animate-fade-in-up text-balance [animation-delay:0.2s]">
            Skip the long queues. Apply for barangay clearances, permits, and
            certificates from the comfort of your home and track every
            request in real time.
          </p>

      {/* TRACKING SEARCH */}
      <form
        onSubmit={handleTrack}
        id="track"
        className="mx-auto mt-10 max-w-xl scroll-mt-24 animate-fade-in-up [animation-delay:0.3s]"
      >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="shine-wrapper relative flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Reference Tracking Number"
                  className="h-12 pl-10 shadow-sm"
                />
                <span aria-hidden className="shine-overlay" />
              </div>
              <Button type="submit" size="lg" className="group h-12 px-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
                Track Request
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              e.g., <span className="font-medium">LGU-2026-BC-1042</span> —
              find the status of a submitted request
            </p>
          </form>

          {/* TRACKING RESULT */}
          {trackingResult && (
            <div className="mx-auto mt-6 max-w-xl text-left animate-fade-in-down">
              {trackingResult === "not-found" ? (
                <Card className="border-destructive/30 bg-destructive/5 card-hover">
                  <CardContent className="flex items-start gap-3 p-4">
                    <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                    <div>
                      <p className="text-sm font-semibold">
                        No request found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        The tracking number{" "}
                        <span className="font-medium">{trackingId}</span> was
                        not found. Double-check the number or contact the
                        records office.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-primary/20 animate-scale-in">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                      <div>
                        <p className="text-sm font-semibold">
                          {trackingResult.citizen} ·{" "}
                          {trackingResult.trackingId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trackingResult.service} — submitted{" "}
                          {trackingResult.date}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={trackingResult.status} />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-16 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center reveal is-visible">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Popular Services
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              What do you need today?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Browse available government services and start an online request
              in minutes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group flex flex-col border bg-card card-hover hover:border-primary/40"
              >
                <CardHeader>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex items-center justify-between border-t pt-4">
                  <div className="space-y-0.5 text-sm">
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="size-3.5" />
                      {service.processingTime}
                    </p>
                    <p className="font-semibold">{service.fee}</p>
                  </div>
                  <Button size="sm" onClick={onLogin}>
                    Apply
                    <ArrowRight className="ml-1.5 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 text-center reveal">
            <Button
              variant="outline"
              onClick={() => onSwitchToView("citizen")}
              className="transition-all duration-300 hover:-translate-y-0.5"
            >
              View citizen dashboard example
            </Button>
            <Button
              variant="ghost"
              onClick={() => onSwitchToView("admin")}
              className="text-muted-foreground"
            >
              View admin dashboard (internal)
            </Button>
            <Button
              variant="link"
              onClick={() => onSwitchToView("project")}
              className="mt-1 text-primary"
            >
              View Project Plan & Portfolio
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-t bg-muted/40 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 text-center sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: Clock,
              title: "Less Waiting",
              desc: "Process requests online instead of queuing at the municipal hall.",
            },
            {
              icon: ShieldCheck,
              title: "Secure & Private",
              desc: "Your records are protected with encrypted, role-based access.",
            },
            {
              icon: CheckCircle2,
              title: "Real-time Updates",
              desc: "Get notified the moment your request status changes.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2 reveal">
              <item.icon className="size-6 text-primary" />
              <p className="font-semibold">{item.title}</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

<footer className="bg-background py-6">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 e-LGU City Government of Dapitan · Prototype for academic
          purposes only
        </p>
      </footer>
    </div>
  );
}