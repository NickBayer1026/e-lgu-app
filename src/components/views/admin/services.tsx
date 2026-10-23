"use client";

import { useState } from "react";
import { CircleDollarSign, Clock, Pencil, Plus } from "lucide-react";

import { ServiceIcon } from "@/components/service-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppState } from "@/lib/app-state";
import type { Service } from "@/lib/mock-data";

const ICON_OPTIONS = [
  { value: "file-check", label: "Document / Clearance" },
  { value: "store", label: "Business / Permit" },
  { value: "hand-heart", label: "Assistance / Certificate" },
  { value: "receipt", label: "Tax / Receipt" },
];

type DialogMode = "add" | "edit";

function emptyService(): Service {
  return {
    id: `svc-${Date.now()}`,
    name: "",
    description: "",
    processingTime: "",
    fee: "",
    icon: "file-check",
  };
}

export function AdminServices() {
  const { services, addService, updateService } = useAppState();
  const [mode, setMode] = useState<DialogMode>("edit");
  const [draft, setDraft] = useState<Service | null>(null);

  const openAdd = () => {
    setMode("add");
    setDraft(emptyService());
  };

  const openEdit = (service: Service) => {
    setMode("edit");
    setDraft({ ...service });
  };

  const save = () => {
    if (!draft || !draft.name.trim() || !draft.description.trim()) return;

    if (mode === "add") {
      addService(draft);
    } else {
      updateService(draft);
    }
    setDraft(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the government services available for online requests.
          </p>
        </div>
        <Button
          className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          onClick={openAdd}
        >
          <Plus className="mr-2 size-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-stagger">
        {services.map((service) => (
          <Card key={service.id} className="group flex flex-col card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon name={service.icon} className="size-6" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  Active
                </Badge>
              </div>
              <CardTitle className="mt-3 text-base">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <CircleDollarSign className="size-4 text-primary" />
                Fee:{" "}
                <span className="font-medium text-foreground">
                  {service.fee || "—"}
                </span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4 text-primary" />
                Processing:{" "}
                <span className="font-medium text-foreground">
                  {service.processingTime || "—"}
                </span>
              </p>
            </CardContent>
            <CardFooter className="mt-auto border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => openEdit(service)}
              >
                <Pencil className="mr-1.5 size-3.5" />
                Edit Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        {draft && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add Service" : "Edit Service"}
              </DialogTitle>
              <DialogDescription>
                {mode === "add"
                  ? "Create a new service that citizens can request online."
                  : `Update the details for ${draft.name}.`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft({ ...draft, name: e.target.value })
                  }
                  placeholder="e.g. Barangay Clearance"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-description">Description</Label>
                <Input
                  id="service-description"
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                  placeholder="Short description of the service"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-fee">Fee</Label>
                <Input
                  id="service-fee"
                  value={draft.fee}
                  onChange={(e) =>
                    setDraft({ ...draft, fee: e.target.value })
                  }
                  placeholder="e.g. ₱50.00 or Free"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-processing">
                  Processing Time
                </Label>
                <Input
                  id="service-processing"
                  value={draft.processingTime}
                  onChange={(e) =>
                    setDraft({ ...draft, processingTime: e.target.value })
                  }
                  placeholder="e.g. 2–3 working days"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-icon">Icon</Label>
                <Select
                  value={draft.icon}
                  onValueChange={(value) =>
                    setDraft({ ...draft, icon: value })
                  }
                >
                  <SelectTrigger id="service-icon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button
                onClick={save}
                disabled={
                  !draft.name.trim() || !draft.description.trim()
                }
              >
                {mode === "add" ? "Add Service" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
