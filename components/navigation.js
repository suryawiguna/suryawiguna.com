import Link from "next/link";
import { useRouter } from "next/router";

const navigation = require("/data/navigation.json");

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="w-full z-10 md:w-1/5 lg:w-1/6 p-0 md:p-4 md:h-screen fixed bottom-0 md:sticky md:top-0 bg-white border-t border-gray-200 md:border-r  md:border-t-0">
      <div className="flex overflow-x-auto md:flex-col">
        {navigation.map((menu) => {
          return (
            <Link key={menu} href={menu.link} passHref>
              <a
                className={`hover:font-bold hover:underline p-5 px-8 md:pt-0 md:pb-10 underline-offset-4 decoration-2${
                  router.pathname.replace(`/`, "") == menu.name.toLowerCase() ||
                  (menu.name == "Home" && router.pathname == "/")
                    ? " font-bold underline"
                    : ""
                }`}
              >
                {menu.name}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
