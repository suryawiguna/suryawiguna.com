import "styles/global.css";
import "boxicons/css/boxicons.min.css";

// @ts-ignore
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "components/StoryblokProvider";
import Navigation from "components/navigation";
import { getNavigation } from "lib/api";
import { Metadata } from "next";
import Script from "next/script";
import { ThemeProviders } from "components/ThemeProvider";

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
          id="google-tag-manager"
          strategy="afterInteractive"
          async
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-QTDZRVWC6J"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive" defer>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-QTDZRVWC6J');
            `}
        </Script>
      </head>
      <link rel="icon" href="/images/favicon.png" sizes="any" />
      <body>
        <StoryblokProvider>
          <ThemeProviders>
            <main className="dark:bg-zinc-900 min-h-screen">
              <Navigation navigation={navigation} />
              <div className="container max-w-screen-md mx-auto px-4 py-5 lg:px-0">
                {children}
              </div>
              <footer className="flex justify-center py-10">
                <small className="text-xs text-center opacity-40">
                  Made with ❤️ in Bali
                </small>
              </footer>
            </main>
          </ThemeProviders>
        </StoryblokProvider>
      </body>
    </html>
  );
}

export const revalidate = 10;
