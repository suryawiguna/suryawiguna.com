"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="bg-zinc-100 dark:bg-zinc-700 rounded-full h-4 w-4"></div>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer flex"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <i
        className={`bx text-lg ${
          theme != "light" ? "bxs-moon text-zinc-100" : "bxs-sun text-amber-500"
        }`}
      ></i>
    </div>
  );
}
