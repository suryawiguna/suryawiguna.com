import "styles/global.css";
import "styles/v3.css";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokProvider from "components/StoryblokProvider";
import Navigation from "components/navigation";
import Footer from "components/global/footer";
import { getNavigation } from "lib/api";
import { Metadata } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";

const SITE_URL = "https://suryawiguna.com";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    url: SITE_URL,
    type: "website",
  },
  title: {
    template: "%s",
    default: "Web Developer in Bali | Surya Wiguna",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation();

  return (
    <html
      lang="en"
      data-rounded="on"
      data-accent="on"
      className={`${archivo.variable} ${inter.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          id="gtag"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
        </Script>

        {/* Hotjar Analytics */}
        <Script id="hotjar-tracking-code" strategy="lazyOnload">
          {`(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </head>
      <link rel="icon" href="/images/favicon.png" sizes="any" />
      <body>
        <StoryblokProvider>
          <Navigation navigation={navigation} />
          <main className="m-main">{children}</main>
          <Footer />
        </StoryblokProvider>
      </body>
    </html>
  );
}

export const revalidate = 10;
