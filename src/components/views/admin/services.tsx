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
import { SERVICES, type Service } from "@/lib/mock-data";

const ICON_KEYS = ["file-check", "store", "hand-heart", "receipt"];

export function AdminServices() {
  const [services] = useState<Service[]>(SERVICES);
  const [editing, setEditing] = useState<Service | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the government services available for online requests.
          </p>
        </div>
        <Button className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
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
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Active
                </Badge>
              </div>
              <CardTitle className="mt-3 text-base">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <CircleDollarSign className="size-4 text-primary" />
                Fee: <span className="font-medium text-foreground">{service.fee}</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4 text-primary" />
                Processing:{" "}
                <span className="font-medium text-foreground">
                  {service.processingTime}
                </span>
              </p>
            </CardContent>
            <CardFooter className="mt-auto border-t pt-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setEditing(service)}
              >
                <Pencil className="mr-1.5 size-3.5" />
                Edit Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        {editing && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Update the details for {editing.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>Service Name</Label>
                <Input defaultValue={editing.name} />
              </div>
              <div className="grid gap-2">
                <Label>Fee</Label>
                <Input defaultValue={editing.fee} />
              </div>
              <div className="grid gap-2">
                <Label>Processing Time</Label>
                <Input defaultValue={editing.processingTime} />
              </div>
              <div className="grid gap-2">
                <Label>Icon</Label>
                <Select defaultValue={editing.icon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={() => setEditing(null)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}