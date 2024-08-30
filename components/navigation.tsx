"use client";

import Link from "next/link";
import logo from "public/images/favicon.png";
import Image from "next/image";

export default function Navigation({ navigation }) {
  return (
    <div className="max-w-screen-md mx-auto flex justify-center z-10 fixed right-0 left-0 md:sticky bottom-4 top-auto md:top-4 md:mb-8">
      <div className="flex gap-4 items-center bg-white rounded-full px-4 py-2">
        <Link href={"/"} aria-label="logo">
          <Image
            src={logo}
            alt="Web developer Bali - Surya Wiguna"
            width={24}
            height={24}
            className="ml-4 lg:m-0 w-6 h-6"
          />
        </Link>
        <nav className="flex justify-end items-center">
          {navigation.menu.map((menu: any) => {
            return (
              <Link
                key={menu._uid}
                href={menu.link.url}
                passHref
                className="hover:bg-gray-100 px-4 py-1 rounded-full"
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
