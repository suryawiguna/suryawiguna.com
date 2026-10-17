---
title: "My Blog Now Is Using Headless CMS"
excerpt: "I've been working to build the blog system using Next.js and here's the steps i took to migrate my blog from Wordpress to Headless CMS which is Storyblok."
date: 2023-06-25T14:00:00.000Z
updated: 2024-07-26T11:12:04.609Z
tags: ["Web Development"]
categories: ["Develop"]
cover: "https://a.storyblok.com/f/169901/2844x1524/908aab1b9a/storyblok-hero.webp"
featured: true
---

It's been so long since my last post. Recently I was learning and finally decided to move my blog from Wordpress to a headless CMS with static site hosting to have more flexibility for exploration to customize my own blog. So, I've been working to build the blog system using Next.js and here's the steps i took to migrate my blog from Wordpress to Headless CMS which is Storyblok.

## What's headless CMS and why I choose to use it?

The core concept or idea of Headless CMS is basically the same as other traditional CMS like Wordpress which is to manage the content whether it's for our website or usually blog. But the key difference is with headless CMS, we can choose how we can deliver the content whereas on Wordpress all aspects from where the contents live, how it deliver, and how visitor can see our content are part of the platform and highly depend on each other, and also mostly only for website. By using headless CMS, we can manage our own content flexibly, decide how the structure of our content that we need, and how we want to deliver it. Since today we have not only a computer to access web browser, we also have smartwatches, gaming console, smart speaker, etc, we can easily manage content to display on those devices. The concept is called omnichannel, and this's possible through the using of API. Not only maintaining contents, headless CMS usually also provides some services such as image CDNs to resize or reformat your images on the fly.

![](https://a.storyblok.com/f/169901/1600x964/0c06bd711a/headless-cms.webp "Headless CMS")

## How I migrate my blog from Wordpress to Storyblok?

Basically, all we need to migrate the content is to setup the structure on Storyblok to follow the content structure that used by Wordpress and we good to go. Here's a summarize step to migrate content from Wordpress to Storyblok:

1. Create a space in Storyblok (which is usually the project/website it self)
2. Create models and components following the naming of content field from Wordpress
3. Migrate the content using wordpress-importer plugin
4. Try to fetch the content from the front-end, in this case I'm using Next.js

If you interested to migrate to headless CMS for your own site, you can read the full detailed step by step for this migration on this [article.](https://www.smashingmagazine.com/2021/07/wordpress-headless-cms-storyblok/) Once all posts are migrated, when I want to publish a new post or edit any current post I will able to do all of that on the Storyblok dashboard that looks like this:

![](https://a.storyblok.com/f/169901/2880x1532/11d0b61b59/storyblok-dashboard.webp)

By this migration, I'm targeting to post more articles about whatever in my mind especially on my journey in this technology/development thing while unleash my wildest creativity to explore. Please tell me you experience surfing on my new blog. Thanks!
