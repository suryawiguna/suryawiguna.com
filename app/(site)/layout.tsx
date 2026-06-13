import Navigation from "components/navigation";
import Footer from "components/global/footer";
import { getNavigation } from "lib/api";

// Site chrome (nav + width-constrained main + footer). Lives in the (site)
// route group so the /studio route — which is outside the group — renders
// full-bleed without any of this.
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();

  return (
    <>
      <Navigation navigation={navigation} />
      <main className="m-main">{children}</main>
      <Footer />
    </>
  );
}
