import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "content/site";
import NavLinks from "components/navLinks";

export default function Navigation() {
  return (
    <nav className="m-nav" aria-label="Primary">
      <div className="m-nav-inner">
        <Link href="/" className="m-brand">
          <Image src="/images/favicon.png" alt="" width={22} height={22} />
          <span>{SITE_NAME}</span>
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
}
