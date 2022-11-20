import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation({ navigation }) {
  const router = useRouter();

  return (
    <nav className="w-full z-10 sm:w-4/12 lg:w-3/12 xl:w-2/12 p-0 sm:p-4 sm:h-screen fixed bottom-0 sm:sticky sm:top-0 bg-white">
      <div className="flex overflow-x-auto p-2 sm:p-0 sm:flex-col gap-1 sm:gap-4">
        {navigation.menu.map((menu) => {
          return (
            <Link key={menu._uid} href={menu.link.url} passHref>
              <a
                className={`flex menu text-md hover:bg-gray-200 rounded-3xl py-3 px-5 ${
                  router.pathname.replace(`/`, "") == menu.text.toLowerCase() ||
                  (menu.text == "Home" && router.pathname == "/")
                    ? " bg-gray-200"
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
    </nav>
  );
}
