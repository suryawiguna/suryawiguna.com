import "styles/global.css";

// @ts-ignore
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "components/StoryblokProvider";
import Navigation from "components/navigation";
import { getNavigation } from "lib/api";
import { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
const token = process.env.STORYBLOK_ACCESS_TOKEN;

storyblokInit({
  accessToken: token,
  use: [apiPlugin],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suryawiguna.com"),
  openGraph: {
    url: "https://suryawiguna.com",
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
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QTDZRVWC6J"
        ></Script>
        <Script id="gtag-code" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-QTDZRVWC6J');
          `}
        </Script>
        {/* Hotjar Tracking Code for https://suryawiguna.com */}
        <Script id="hotjar-tracking-code" strategy="beforeInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2579732,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Surya Wiguna - Web Developer Bali",
              url: "https://suryawiguna.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bali",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </head>
      <link rel="icon" href="/images/favicon.png" sizes="any" />
      <body>
        <StoryblokProvider>
          <main className={openSans.className}>
            <div className="min-h-screen pb-8">
              <Navigation navigation={navigation} />
              <div className="container max-w-screen-md mx-auto px-4 lg:px-0">
                {children}
              </div>
            </div>
          </main>
        </StoryblokProvider>
      </body>
    </html>
  );
}

export const revalidate = 10;
