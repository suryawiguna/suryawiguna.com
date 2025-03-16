import Link from "next/link";

export default function Navigation({ navigation }) {
  return (
    <div className="max-w-screen-md mx-auto flex py-8 px-4 lg:px-0">
      <div className="flex gap-4 items-center">
        <nav className="flex gap-8 justify-end items-center">
          {navigation.menu.map((menu: any) => {
            return (
              <Link
                key={menu._uid}
                href={menu.link.url}
                passHref
                className="text-lg rounded-full hover:underline underline-offset-8"
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
