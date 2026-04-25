import Link from "next/link";
import Image from "next/image";

export default function Navigation({ navigation }) {
  return (
    <nav className="m-nav" aria-label="Primary">
      <div className="m-nav-inner">
        <Link href="/" className="m-brand">
          <Image src="/images/favicon.png" alt="" width={22} height={22} />
          <span>Surya Wiguna</span>
        </Link>
        <ul className="m-nav-items">
          {navigation.menu.map((menu: any) => (
            <li key={menu._uid}>
              <Link href={menu.link.url}>{menu.text.toLowerCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
