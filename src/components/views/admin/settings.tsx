"use client";

import { useState } from "react";
import { Save, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/lib/app-state";
import type { MunicipalitySettings } from "@/lib/mock-data";

export function AdminSettings() {
  const { settings, updateSettings } = useAppState();
  const [draft, setDraft] = useState<MunicipalitySettings>(() => ({
    ...settings,
  }));
  const [saved, setSaved] = useState(false);

  const updateField = <Key extends keyof MunicipalitySettings>(
    key: Key,
    value: MunicipalitySettings[Key]
  ) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
  };

  const handleSave = () => {
    updateSettings(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage system configuration for the municipal portal.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Municipality Profile</CardTitle>
            <CardDescription>
              Basic information shown on the public portal
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mun-name">Municipality Name</Label>
              <Input
                id="mun-name"
                value={draft.municipalityName}
                onChange={(e) =>
                  updateField("municipalityName", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mun-barangay">Primary Barangay Hall</Label>
              <Input
                id="mun-barangay"
                value={draft.primaryHall}
                onChange={(e) => updateField("primaryHall", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mun-hours">Office Hours</Label>
              <Input
                id="mun-hours"
                value={draft.officeHours}
                onChange={(e) => updateField("officeHours", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mun-phone">Contact Number</Label>
              <Input
                id="mun-phone"
                value={draft.contactNumber}
                onChange={(e) => updateField("contactNumber", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Processing</CardTitle>
              <CardDescription>
                Default settings for handling new requests
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="review-days">Default Review Time (days)</Label>
                <Select
                  value={draft.defaultReviewDays}
                  onValueChange={(value) =>
                    updateField("defaultReviewDays", value)
                  }
                >
                  <SelectTrigger id="review-days">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "5", "7"].map((days) => (
                      <SelectItem key={days} value={days}>
                        {days} day{days === "1" ? "" : "s"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notification-preference">
                  Notification Preference
                </Label>
                <Select
                  value={draft.notificationPreference}
                  onValueChange={(value) =>
                    updateField("notificationPreference", value)
                  }
                >
                  <SelectTrigger id="notification-preference">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email only</SelectItem>
                    <SelectItem value="sms">SMS only</SelectItem>
                    <SelectItem value="both">Email + SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>
                Account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">
                    Require OTP for admin logins
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="mr-2 size-4" />
          Save Settings
        </Button>
        {saved && (
          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Settings saved successfully
          </Badge>
        )}
      </div>
    </div>
  );
}
