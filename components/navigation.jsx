import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation({ navigation }) {
  const router = useRouter();

  return (
    <nav className="w-full z-10 md:w-4/12 lg:w-3/12 xl:w-2/12 p-0 lg:p-4 md:h-screen fixed bottom-0 md:sticky md:top-0 bg-white">
      <div className="flex overflow-x-auto p-2 lg:p-0 md:flex-col gap-0 lg:gap-2">
        {navigation.menu.map((menu) => {
          return (
            <Link key={menu._uid} href={menu.link.url} passHref>
              <a
                className={`flex text-md hover:bg-gray-200 rounded-full py-3 px-5 ${
                  router.pathname.includes(menu.text.toLowerCase()) ||
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
