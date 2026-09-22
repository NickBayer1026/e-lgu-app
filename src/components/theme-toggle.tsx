"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

let transitionTimer: ReturnType<typeof setTimeout> | undefined;

function enableTransition() {
  document.documentElement.classList.add("theme-transition");
  clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    document.documentElement.classList.remove("theme-transition");
  }, 500);
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    enableTransition();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
