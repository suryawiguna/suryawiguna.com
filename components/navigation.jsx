import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navigation({ navigation }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full z-10 md:w-4/12 lg:w-3/12 xl:w-2/12 p-0 lg:p-4 md:h-screen fixed bottom-0 md:sticky md:top-0 bg-white drop-shadow-2xl md:drop-shadow-none">
      <div
        className={`md:hidden transition-all px-4 py-3${
          menuOpen ? " block" : " hidden"
        }`}
      >
        {navigation.menu.map((menu) => {
          return (
            <Link key={menu._uid} href={menu.link.url} passHref>
              <a
                className={`flex text-md hover:bg-gray-100 rounded-full py-3 px-5 ${
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
      </div>
      <div className="flex px-6 md:p-0 overflow-x-auto p-2 lg:p-0 md:flex-col gap-0 lg:gap-2">
        <div className="flex w-full items-center justify-between md:hidden">
          <p className="font-bold">Surya Wiguna</p>
          <button
            className={`flex text-md${
              menuOpen ? " bg-orange-100" : " bg-gray-100"
            } rounded-full py-3 px-5`}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            🍔 Menu
          </button>
        </div>
        <div className="hidden md:block">
          {navigation.menu.map((menu) => {
            return (
              <Link key={menu._uid} href={menu.link.url} passHref>
                <a
                  className={`flex text-md hover:bg-gray-100 rounded-full py-3 px-5 ${
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
        </div>
      </div>
    </nav>
  );
}
