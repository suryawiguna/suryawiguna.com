---
title: "Using Netlify to host a static website"
excerpt: "One of modern hosting especially for a static website is Netlify."
date: 2020-08-09T21:08:00.000Z
updated: 2026-08-09T10:56:43.957Z
cover: "https://a.storyblok.com/f/169901/36f490ee1a/photo-1516321318423-f06f85e504b3-scaled.jpeg"
noindex: true
---

When you created a static website, whether it’s a project with client or just for portfolio, you usually want to make it online. One of modern hosting especially for a static website is Netlify. Netlify is nice to hosting from a very simple web, or generated website using [Gatsby](https://www.gatsbyjs.org/) or [Gridsome](https://gridsome.org/), and it’s free to get started. There are very simple steps to host your website to Netlify.

### 1. Sign Up

You can sign up with your GitHub, GitLab, or Bitbucket account to easily connect your repository later.

![](/blog/using-netlify-to-host-a-static-website/2x22bl1el32pmo1z4npy.jpg)

### 2. Select Git Provider

After you sign up, you can start to deploy your website. First select the git provider where you put your website project. Select one and authorized Netlify to access your repository list. I personally use GitLab.

![](/blog/using-netlify-to-host-a-static-website/1g5py6b5g83fwp45gdqa.jpg)

### 3. Select Repository

Now after you authorized Netlify to your git provider, all your repository will showed up. Select which repository that you want to deploy.

![](/blog/using-netlify-to-host-a-static-website/619v3g1802ue3o4y9rgi.jpg)

### 4. Setting the build option

You can choose which branch that will deployed to the hosting, so it’s not always have to master branch.

![](/blog/using-netlify-to-host-a-static-website/nf5jq0orvwhcv5t6v0i1.jpg)

If you deploying a generated site with such as Gridsome, you need to add *gridsome build* in **Build Command**, and *dist* in **Publish directory** to automatically start building the website right after you push to the branch that you choose to deploy before.

![](/blog/using-netlify-to-host-a-static-website/ztdhll574y4qvsoqdem7.jpg)

And that’s it! Now your website is published and can access via internet with yourwebiste.netlify.app domain. You can use your custom domain by setting the DNS configuration. Read the [official documentation](https://docs.netlify.com/domains-https/custom-domains/) to know more how to do that. From now, when ever you want to make a change to your website, just push your change to the branch that you choose and Netlify will build the change for you. Thank you for reading 🙂
