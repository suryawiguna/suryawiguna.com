import Link from "next/link";
import { useRouter } from "next/router";

const navigation = require("/data/navigation.json");

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="w-full z-10 sm:w-1/5 lg:w-1/6 p-0 sm:p-4 sm:h-screen fixed bottom-0 sm:sticky sm:top-0 bg-white border-t border-gray-200 sm:border-r sm:border-t-0">
      <div className="flex overflow-x-auto sm:flex-col sm:gap-8">
        {navigation.map((menu) => {
          return (
            <Link key={menu} href={menu.link} passHref>
              <a
                className={`flex text-sm hover:font-bold py-4 px-5 sm:p-2 ${
                  router.pathname.replace(`/`, "") == menu.name.toLowerCase() ||
                  (menu.name == "Home" && router.pathname == "/")
                    ? " font-bold"
                    : ""
                }`}
              >
                <span className="mr-2">{menu.emoji}</span>
                {menu.name}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
