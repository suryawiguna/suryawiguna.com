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
      <div className="animate-pulse flex">
        <div className="bg-zinc-100 dark:bg-zinc-700 rounded-full h-8 w-14 mx-3 md:m-5"></div>
      </div>
    );
  }

  return (
    <label htmlFor="toggleThree" className="cursor-pointer">
      <div
        className="relative h-8 w-14 mx-3 md:m-5"
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        <div className="block h-8 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
        <div
          className={`dot absolute transition-all translate-x mx-1 ${
            theme != "light" ? "translate-x-6" : ""
          } top-1 flex h-6 w-6 items-center justify-center rounded-full ${
            theme != "light" ? "bg-slate-800" : "bg-amber-500"
          }`}
        >
          {/* ICON */}
          <span>
            {theme != "light" ? (
              <i className="bx bxs-moon text-zinc-100 text-sm"></i>
            ) : (
              <i className="bx bxs-sun text-zinc-100 text-sm"></i>
            )}
          </span>
        </div>
      </div>
    </label>
  );
}
