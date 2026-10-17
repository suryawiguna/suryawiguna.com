---
title: "Improve Web Performance Using Facades"
excerpt: "Facade is a cloned portion that looks like the actual one but only acts as a placeholder initially."
date: 2023-08-20T03:09:58.742Z
updated: 2024-07-26T11:11:12.717Z
tags: ["Web Development"]
categories: ["Develop"]
cover: "https://a.storyblok.com/f/169901/1874x1174/0e794f3f03/facade.webp"
featured: true
---

A website is demanded to be lightning fast the first time it's opened in the browser. When people open a website and have to wait for more than 3 seconds to see the content or at least a non-blank white screen, they'll start to get annoyed, and most will close the window or switch to another site. Of course, this is bad from a business perspective, as you'll lose potential customers. As a web developer, or based on my experience during the first year of learning web development, performance is usually not the first thing we keep in mind. However, after handling a real business with approximately 100 daily viewers, performance becomes a high-priority concern to work on.

As more and more integrations are added to the website, such as live chat to increase customer satisfaction, they also add some challenges to maintaining the website's performance. As I learned, there's one trick to deal with that kind of integration for your website. This approach involves using a facade.

So basically, a facade is a cloned portion that looks like the actual one but only acts as a placeholder initially. Then, when it receives an interaction from the user, it starts to render the actual integration to make it work the way it's supposed to.

This comes in handy, especially in the case of integrating live chat. I found out that the live chat scripts themselves take more than 2 seconds to download and execute. Therefore, by applying this approach, we can save 2 seconds of the visitor's time and prevent them from getting annoyed. Look at the report below on [PageSpeed](https://pagespeed.web.dev/) after I implemented the facade technique I was able to reduce the initial loading time by 2 seconds:

![](https://a.storyblok.com/f/169901/990x730/70c15478cd/screenshot-2023-08-20-at-10-46-18.webp)![](https://a.storyblok.com/f/169901/990x394/bae81e3260/screenshot-2023-08-20-at-10-47-05.webp)

## How to implement facade

A facade is a static element which looks similar to the actual embedded third-party, but is not functional and therefore much less taxing on the page load. So for example on this case is a little chat bubble on the bottom right of the screen.

![](https://a.storyblok.com/f/169901/774x449/617c9bafbc/screenshot-2023-08-20-at-10-54-58.webp)![](https://a.storyblok.com/f/169901/968x564/a3c030e1bf/screenshot-2023-08-20-at-10-58-58.webp)

We can leverage the `onClick()` function to load the script when user click the bubble, that way the scripts are only loaded when we need them. It will look something like this:

```javascript
<ChatFacade
  onClick={() => {
    ...
    initiateCall().then((elm) => {
      window.fcWidget.open();
      ...
    });
  }}
  ...
>
```

To check if it's working, we can check the network tab on Chrome and see if the scripts is being loaded only when user clicked the facade that we just created. There's more trick that we can do to improve our website's performance, I will share more of them in the next article. Hope it inspire you, thanks for reading!
