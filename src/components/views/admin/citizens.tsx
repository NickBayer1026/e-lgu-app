"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Eye, Search, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CITIZENS, type CitizenRegistry } from "@/lib/mock-data";

export function AdminCitizens() {
  const [citizens] = useState<CitizenRegistry[]>(CITIZENS);
  const [search, setSearch] = useState("");
  const [selectedCitizen, setSelectedCitizen] =
    useState<CitizenRegistry | null>(null);

  const filtered = useMemo(() => {
    return citizens.filter((c) =>
      `${c.name} ${c.barangay} ${c.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [citizens, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Citizens</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Registered citizen records for the municipality.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, barangay, email..."
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Citizen Registry</CardTitle>
          <CardDescription>{filtered.length} record(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Barangay</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((citizen) => (
                  <TableRow
                    key={citizen.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {citizen.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{citizen.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {citizen.gender === "M" ? "Male" : "Female"} ·{" "}
                            {citizen.age} yrs
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {citizen.barangay}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {citizen.contact}
                    </TableCell>
                    <TableCell>{citizen.requests}</TableCell>
                    <TableCell>
                      {citizen.verified ? (
                        <Badge
                          variant="outline"
                          className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                        >
                          <BadgeCheck className="size-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30"
                        >
                          <UserRound className="size-3" />
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCitizen(citizen)}
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No citizens found for your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* PROFILE DIALOG */}
      <Dialog
        open={!!selectedCitizen}
        onOpenChange={(o) => !o && setSelectedCitizen(null)}
      >
        {selectedCitizen && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Citizen Profile</DialogTitle>
              <DialogDescription>
                Record for {selectedCitizen.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarFallback className="bg-primary/10 text-lg text-primary">
                    {selectedCitizen.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedCitizen.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCitizen.gender === "M" ? "Male" : "Female"},{" "}
                    {selectedCitizen.age} years old
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 rounded-lg border p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Barangay</span>
                  <span className="font-medium">{selectedCitizen.barangay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{selectedCitizen.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact</span>
                  <span className="font-medium">{selectedCitizen.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Requests</span>
                  <span className="font-medium">
                    {selectedCitizen.requests}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">
                    {selectedCitizen.verified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}