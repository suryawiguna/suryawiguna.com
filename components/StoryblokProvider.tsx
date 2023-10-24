"use client";

// @ts-ignore
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Page from "./Page";
import Introduction from "./home/introduction";

const components = {
  page: Page,
  introduction: Introduction,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }) {
  return children;
}
