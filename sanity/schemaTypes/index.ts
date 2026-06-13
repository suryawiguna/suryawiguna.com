import { blockContent } from "./blockContent";
import { seo } from "./objects/seo";
import { introduction } from "./objects/introduction";
import { portfolios } from "./objects/portfolios";
import { histories } from "./objects/histories";
import { skills } from "./objects/skills";
import { blogPosts } from "./objects/blogPosts";
import { links } from "./objects/links";
import { page } from "./page";
import { post } from "./post";
import { navigation } from "./navigation";

export const schemaTypes = [
  // documents
  page,
  post,
  navigation,
  // objects
  blockContent,
  seo,
  introduction,
  portfolios,
  histories,
  skills,
  blogPosts,
  links,
];
