"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DarkModeToggle from "components/darkModeToggle";
import logo from "public/images/favicon.png";
import Image from "next/image";

export default function Navigation({ navigation }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="z-10 sticky top-0 bg-white dark:bg-zinc-900">
      <div className="max-w-screen-md mx-auto h-16 flex justify-between items-center w-full z-10 sticky top-0">
        <Link href={"/"} aria-label="logo">
          <Image
            src={logo}
            alt=""
            width={24}
            height={24}
            className="ml-4 lg:m-0"
          />
        </Link>
        <nav
          className={`h-screen md:h-16 flex flex-col md:flex-row justify-center md:justify-end items-center bg-white dark:bg-zinc-900 w-full absolute top-0 md:relative md:visible ${
            menuOpen ? "visible" : "invisible"
          }`}
        >
          <button
            className="flex absolute p-2 mr-4 md:m-0 top-3 right-0 md:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <i className="bx bx-x text-3xl"></i>
          </button>
          {navigation.menu.map((menu) => {
            const isActive =
              (pathname && pathname.includes(menu.text.toLowerCase())) ||
              (menu.text == "Home" && pathname == "/");

            return (
              <Link
                key={menu._uid}
                href={menu.link.url}
                passHref
                className={`"flex p-3 text-xl md:text-base underline-offset-4 hover:underline ${
                  isActive ? "" : ""
                }`}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {menu.text}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center mr-4 lg:m-0">
          <span className="p-2">
            <DarkModeToggle />
          </span>
          <button
            className="p-2 flex md:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            aria-label="menu-button"
          >
            <i className="bx bx-menu text-3xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
