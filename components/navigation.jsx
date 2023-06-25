import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navigation({ navigation }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full z-10 md:w-4/12 lg:w-3/12 xl:w-2/12 p-0 lg:p-4 md:h-screen fixed top-0 md:sticky bg-white drop-shadow-sm md:drop-shadow-none dark:bg-zinc-900 dark:text-gray-300">
      <div className="flex px-6 md:p-0 overflow-x-auto p-2 lg:p-0 flex-col gap-0 lg:gap-2">
        <div className="flex w-full items-center justify-between md:hidden">
          <p className="flex-1">
            <span className="font-bold mr-1">Surya</span>
            <span className="font-light">Wiguna</span>
          </p>
          {DarkModeToggle(theme, setTheme)}
          <button
            className={`flex items-center text-md${
              menuOpen ? " bg-amber-100 dark:bg-amber-900" : " bg-transparent"
            } rounded-full p-2`}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <i
              className={`bx bx-chevron-down text-2xl transition-transform ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </button>
        </div>

        <div className={`${menuOpen ? "block" : "hidden"} md:block mt-3`}>
          {navigation.menu.map((menu) => {
            return (
              <Link key={menu._uid} href={menu.link.url} passHref>
                <a
                  className={`flex text-md hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full py-3 px-5 ${
                    router.pathname.includes(menu.text.toLowerCase()) ||
                    (menu.text == "Home" && router.pathname == "/")
                      ? "font-bold"
                      : ""
                  }`}
                >
                  <span className="mr-3">{menu.emoji}</span>
                  {menu.text}
                </a>
              </Link>
            );
          })}
          <span className="hidden md:block">
            {DarkModeToggle(theme, setTheme)}
          </span>
        </div>
      </div>
    </nav>
  );
}

function DarkModeToggle(theme, setTheme) {
  return (
    <label htmlFor="toggleThree" className="cursor-pointer">
      <div
        className="relative h-8 w-14 mx-3 md:m-5"
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        <div className="block h-8 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
        <div
          className={`dot absolute transition-all translate-x mx-1 ${
            theme == "dark" ? "translate-x-6" : ""
          } top-1 flex h-6 w-6 items-center justify-center rounded-full ${
            theme == "dark" ? "bg-slate-800" : "bg-amber-500"
          }`}
        >
          {/* ICON */}
          <span>
            {theme && theme == "light" ? (
              <i className="bx bxs-sun text-zinc-100 text-sm"></i>
            ) : (
              <i className="bx bxs-moon text-zinc-100 text-sm"></i>
            )}
          </span>
        </div>
      </div>
    </label>
  );
}
