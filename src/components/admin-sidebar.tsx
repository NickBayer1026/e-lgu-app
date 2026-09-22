"use client";

import { useState } from "react";
import {
  BarChart3,
  BellRing,
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type AdminTab =
  | "overview"
  | "requests"
  | "citizens"
  | "services"
  | "reports"
  | "settings";

export const ADMIN_NAV: { key: AdminTab; label: string; icon: typeof Users }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "requests", label: "Requests", icon: ScrollText },
  { key: "citizens", label: "Citizens", icon: Users },
  { key: "services", label: "Services", icon: Building2 },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

interface AdminUser {
  initials: string;
  name: string;
  role: string;
}

const DEFAULT_USER: AdminUser = {
  initials: "NB",
  name: "Nicholas Orlino P. Bayron",
  role: "Admin · Records Office",
};

/* ------------------------------------------------------------------ */
/* Shared nav list (used by desktop sidebar + mobile drawer)           */
/* ------------------------------------------------------------------ */
function SidebarNav({
  active,
  onTabChange,
  pendingCount,
  collapsed = false,
}: {
  active: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  pendingCount: number;
  collapsed?: boolean;
}) {
  return (
    <nav className="space-y-1">
      {ADMIN_NAV.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onTabChange(item.key)}
          title={collapsed ? item.label : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            collapsed && "relative justify-center px-0",
            active === item.key
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <item.icon className="size-4 shrink-0" />
          {!collapsed && item.label}
          {!collapsed && item.key === "requests" && pendingCount > 0 && (
            <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
              {pendingCount}
            </span>
          )}
          {/* Pending indicator dot shown in collapsed icon rail */}
          {collapsed && item.key === "requests" && pendingCount > 0 && (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop fixed sidebar (lg and up)                                   */
/* ------------------------------------------------------------------ */
export function AdminSidebar({
  active,
  onTabChange,
  onBackToPublic,
  pendingCount = 0,
  currentUser = DEFAULT_USER,
  collapsed = false,
  onToggleExpand,
}: {
  active: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onBackToPublic: () => void;
  pendingCount?: number;
  currentUser?: AdminUser;
  collapsed?: boolean;
  onToggleExpand?: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r bg-sidebar transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-2">
        <div className={cn("min-w-0 flex-1", collapsed ? "px-1" : "px-3")}>
          <Logo compact={collapsed} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleExpand}
          className="size-8"
        >
          <PanelLeftClose
            className={cn(
              "size-4 transition-all duration-300",
              collapsed && "-rotate-180"
            )}
          />
        </Button>
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto py-4",
          collapsed ? "px-2" : "px-3"
        )}
      >
        {!collapsed && (
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Municipal Portal
          </p>
        )}
        <SidebarNav
          active={active}
          onTabChange={onTabChange}
          pendingCount={pendingCount}
          collapsed={collapsed}
        />
      </div>

      {!collapsed && (
        <div className="space-y-3 border-t p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/15 text-primary text-xs">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {currentUser.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Notifications"
            >
              <BellRing className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 border-t pt-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start gap-2 text-muted-foreground"
              onClick={onBackToPublic}
            >
              <LogOut className="size-4" />
              Back to public site
            </Button>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="space-y-2 border-t p-2">
          <Button
            variant="ghost"
            size="icon"
            className="mx-auto flex size-9"
            aria-label="Notifications"
          >
            <BellRing className="size-4" />
          </Button>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to public site"
            onClick={onBackToPublic}
            className="mx-auto flex size-9"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      )}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile top bar + slide-in drawer (below lg)                         */
/* ------------------------------------------------------------------ */
export function MobileAdminHeader({
  active,
  onTabChange,
  onBackToPublic,
  pendingCount = 0,
  currentUser = DEFAULT_USER,
}: {
  active: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onBackToPublic: () => void;
  pendingCount?: number;
  currentUser?: AdminUser;
}) {
  const [open, setOpen] = useState(false);
  const activeLabel = ADMIN_NAV.find((n) => n.key === active)?.label ?? "Dashboard";

  const handleTab = (tab: AdminTab) => {
    onTabChange(tab);
    setOpen(false);
  };

  return (
    <>
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 gap-0 p-0 sm:max-w-sm"
            showCloseButton={false}
          >
            <div className="flex h-full flex-col">
              <SheetHeader className="flex-row items-center justify-between border-b pl-5 pr-3 py-4">
                <div className="flex items-center gap-2">
                  <Logo />
                </div>
                <SheetTitle className="sr-only">Municipal Portal</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Municipal Portal
                </p>
                <SidebarNav active={active} onTabChange={handleTab} pendingCount={pendingCount} />
              </div>

              <div className="space-y-3 border-t p-3">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/15 text-primary text-xs">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-sm font-semibold">
                      {currentUser.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {currentUser.role}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Notifications"
                  >
                    <BellRing className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 border-t pt-3">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 justify-start gap-2 text-muted-foreground"
                    onClick={onBackToPublic}
                  >
                    <LogOut className="size-4" />
                    Back to public site
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 items-center gap-2">
          <Logo compact />
          <span className="hidden text-sm font-semibold sm:inline">
            {activeLabel}
          </span>
        </div>

        <p className="min-w-0 truncate text-sm font-semibold text-foreground sm:hidden">
          {activeLabel}
        </p>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/15 text-[10px] text-primary">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
    </>
  );
}