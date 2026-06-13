import { createClient, type SanityClient } from "@sanity/client";

/**
 * Lazy Sanity client. Constructed on first use (not at import time) so that
 * importing this module under CMS_PROVIDER=storyblok — where projectId may be
 * empty — never throws "Configuration must contain projectId".
 */
let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (client) return client;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Set it (and CMS_PROVIDER=sanity) to use the Sanity provider."
    );
  }
  client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    // CDN for published content; revalidation is handled by Next route configs.
    useCdn: true,
  });
  return client;
}
