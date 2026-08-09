import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, SITE_NAME } from "content/site";

export default function Navigation() {
  return (
    <nav className="m-nav" aria-label="Primary">
      <div className="m-nav-inner">
        <Link href="/" className="m-brand">
          <Image src="/images/favicon.png" alt="" width={22} height={22} />
          <span>{SITE_NAME}</span>
        </Link>
        <ul className="m-nav-items">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
