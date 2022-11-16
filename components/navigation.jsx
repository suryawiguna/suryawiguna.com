import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation({navigation}) {
  const router = useRouter();

  return (
    <nav className="w-full z-10 sm:w-1/5 lg:w-1/6 p-0 sm:p-4 sm:h-screen fixed bottom-0 sm:sticky sm:top-0 bg-white border-t border-gray-200 sm:border-r sm:border-t-0">
      <div className="flex overflow-x-auto sm:flex-col sm:gap-8">
        {navigation.menu.map((menu) => {
          return (
            <Link key={menu._uid} href={menu.link.url} passHref>
              <a
                className={`flex menu text-md hover:font-bold py-4 px-5 sm:p-2 ${
                  router.pathname.replace(`/`, "") == menu.text.toLowerCase() ||
                  (menu.text == "Home" && router.pathname == "/")
                    ? " font-bold"
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
