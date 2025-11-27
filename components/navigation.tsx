import Link from "next/link";

export default function Navigation({ navigation }) {
  return (
    <nav className="flex gap-4 md:gap-8 justify-center md:justify-start sticky top-0 z-20 py-4 mb-2 bg-white">
      {navigation.menu.map((menu: any) => {
        return (
          <Link
            key={menu._uid}
            href={menu.link.url}
            passHref
            className="md:text-lg hover:underline underline-offset-8"
          >
            {menu.text}
          </Link>
        );
      })}
    </nav>
  );
}
