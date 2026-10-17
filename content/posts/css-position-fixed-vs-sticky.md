---
title: "CSS position fixed vs sticky"
excerpt: "CSS position: fixed helped me a lot when I want to make an element inside a web to stay when user scrolling the page."
date: 2020-08-29T21:14:00.000Z
updated: 2026-08-09T10:56:11.818Z
cover: "https://a.storyblok.com/f/169901/2ab343918f/photo-1523437113738-bbd3cc89fb19.jpeg"
noindex: true
---

CSS `position: fixed` helped me a lot when I want to make an element inside a web to stay when user scrolling the page. But in some cases, maybe I want that element still scroll along like others but can stay in place when I want it to stay. That’s `position: sticky` will helpful.

### What’s the difference?

The `position: fixed` mean *fixed to the viewport*. We tell it where to position itself (top, bottom, right, or left) and it will stay there when user scrolling.

Meanwhile, when using `position: sticky` it won’t affect until we define offset, like `top: 10px`. So the element will scroll like others until it reaches the offset and then stay on its position. And it stay within its parent, once the parent scroll off the page it leaves with it.

To see it in action, you can check on my [codepen](https://codepen.io/suryawiguna/pen/wvGeqxy)

### Which should I use?

It depends, when you want that element simply doesnt move in your website then use `fixed`. But be careful with `position: fixed`, it can potentially cover other element.

When you want that element scrolling into view and then stop at certain point, use `sticky`. Keep in mind, *when its parent scrolls off page, it gone with its parent*.
