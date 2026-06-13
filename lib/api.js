/**
 * CMS provider dispatcher. Keeps the same public API so pages/components never
 * change — only the data source switches based on the CMS_PROVIDER env var.
 *
 *   CMS_PROVIDER=storyblok  (default) -> lib/storyblok.js  (current live source)
 *   CMS_PROVIDER=sanity                -> lib/sanity.ts
 *
 * CMS_PROVIDER is a server-only var; all these functions run in server
 * components / at build time, so the switch never reaches the browser.
 */
import * as storyblok from "./storyblok";
import * as sanity from "./sanity";

const provider = process.env.CMS_PROVIDER === "sanity" ? sanity : storyblok;

export const getNavigation = (...args) => provider.getNavigation(...args);
export const getHome = (...args) => provider.getHome(...args);
export const getPage = (...args) => provider.getPage(...args);
export const getAllPosts = (...args) => provider.getAllPosts(...args);
export const getFeaturedPosts = (...args) => provider.getFeaturedPosts(...args);
export const getPost = (...args) => provider.getPost(...args);
