"use client";

import Link from "next/link";
import logo from "public/images/favicon.png";
import Image from "next/image";

export default function Navigation({ navigation }) {
  return (
    <div className="z-10 sticky top-0 bg-white">
      <div className="max-w-screen-md mx-auto h-16 flex justify-between items-center w-full z-10 sticky top-0">
        <Link href={"/"} aria-label="logo">
          <Image
            src={logo}
            alt="Web developer Bali - Surya Wiguna"
            width={24}
            height={24}
            className="ml-4 lg:m-0"
          />
        </Link>
        <nav className="flex gap-4 justify-end items-center mr-4">
          {navigation.menu.map((menu: any) => {
            return (
              <Link
                key={menu._uid}
                href={menu.link.url}
                passHref
                className="hover:underline"
              >
                {menu.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
