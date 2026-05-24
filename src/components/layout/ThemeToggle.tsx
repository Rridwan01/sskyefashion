"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-foreground/80 hover:text-foreground transition-colors relative flex items-center justify-center rounded-full hover:bg-foreground/5 cursor-pointer"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 transition-transform duration-500 hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-500 hover:rotate-90" />
      )}
    </button>
  );
}
