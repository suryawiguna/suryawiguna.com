import type { MetadataRoute } from "next";

const SITE_URL = "https://suryawiguna.com";

// Replaces the robots.txt that next-sitemap used to emit into public/. The old
// file also carried a `Host:` directive, which only Yandex ever read.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
