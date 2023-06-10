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
          <p>
            <span className="font-bold">Surya</span>{" "}
            <span className="font-light">Wiguna</span>
          </p>
          <button
            className={`flex text-md${
              menuOpen ? " bg-amber-100 dark:bg-amber-900" : " bg-transparent"
            } rounded-full py-3 px-5`}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            🍔 Menu
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
          <label
            htmlFor="toggleThree"
            className="flex w-0 items-center py-3 px-5 cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="toggleThree"
                className="sr-only"
                onClick={() =>
                  theme == "dark" ? setTheme("light") : setTheme("dark")
                }
              />
              <div className="block h-8 w-14 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
              <div
                className={`dot absolute ${
                  theme == "dark" ? "right-1" : "left-1"
                } top-1 flex h-6 w-6 items-center justify-center rounded-full ${
                  theme == "dark" ? "bg-slate-800" : "bg-zinc-100"
                } transition`}
              >
                {/* ICON */}
                <span>
                  {theme == "light" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="fill-amber-400"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />{" "}
                    </svg>
                  ) : (
                    <svg
                      height="100%"
                      viewBox="0 0 512 512"
                      width="100%"
                      className="fill-zinc-100"
                    >
                      <g>
                        <g>
                          <path d="M343.1,315c-1.8,0.1-3.5,0.1-5.3,0.1c-29.1,0-56.5-11.3-77.1-31.9c-20.6-20.6-31.9-48-31.9-77.1    c0-16.6,3.7-32.6,10.6-47.1c3.1-6.4,6.8-12.5,11.1-18.2c-7.6,0.8-14.9,2.4-22,4.6c-46.8,14.8-80.7,58.5-80.7,110.2    c0,63.8,51.7,115.5,115.5,115.5c35.3,0,66.8-15.8,88-40.7c4.8-5.7,9.2-11.9,12.8-18.5C357.3,313.6,350.3,314.7,343.1,315z" />
                        </g>
                      </g>
                    </svg>
                  )}
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
}
