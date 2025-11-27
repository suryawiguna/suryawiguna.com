import "styles/global.css";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokProvider from "components/StoryblokProvider";
import Navigation from "components/navigation";
import { getNavigation } from "lib/api";
import { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";

const SITE_URL = "https://suryawiguna.com";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

const generateJsonLdSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Surya Wiguna - Web Developer Bali",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bali",
    addressCountry: "ID",
  },
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
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          id="gtag"
          strategy="beforeInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="gtag-config" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
        </Script>

        {/* Hotjar Analytics */}
        <Script id="hotjar-tracking-code" strategy="beforeInteractive">
          {`(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLdSchema()),
          }}
        />
      </head>
      <link rel="icon" href="/images/favicon.png" sizes="any" />
      <body className="max-w-screen-md mx-auto px-4 lg:px-0 pb-16">
        <StoryblokProvider>
          <main className={openSans.className}>
            <Navigation navigation={navigation} />
            {children}
          </main>
        </StoryblokProvider>
      </body>
    </html>
  );
}

export const revalidate = 10;
