"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "track", label: "Track Request" },
];

// Sections whose position drives the active-link highlight.
// "track" lives inside the hero, so it shares the "home" highlight.
const SECTION_LINKS = ["home", "services"];

export function PublicNavbar({
  onLogin,
  loggedIn = false,
  onOpenProject,
}: {
  onLogin?: () => void;
  loggedIn?: boolean;
  onOpenProject?: () => void;
}) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 100;
      let current = SECTION_LINKS[0];
      for (const id of SECTION_LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    // Blur the link so no stray text caret / focus ring lingers after click
    e.currentTarget.blur();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" onClick={handleNav("home")} className="flex cursor-pointer select-none items-center">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleNav(link.id)}
              className={cn(
                "relative cursor-pointer select-none py-1 transition-colors duration-300 hover:text-foreground",
                active === link.id && "text-foreground"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-primary transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active === link.id
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                )}
              />
            </a>
          ))}
          {onOpenProject && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpenProject();
                e.currentTarget.blur();
              }}
              className="relative cursor-pointer select-none border-b-2 border-primary/40 py-1 font-semibold text-primary transition-colors duration-300 hover:text-primary/80"
            >
              Project Plan
            </a>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loggedIn ? (
            <Button variant="outline" size="sm" onClick={onLogin}>
              Citizen Dashboard
            </Button>
          ) : (
            <Button size="sm" onClick={onLogin}>
              <LogIn className="mr-2 size-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
