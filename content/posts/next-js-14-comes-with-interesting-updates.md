---
title: "Next.js 14 Comes With Interesting Updates"
excerpt: "Next.js 14 is released in Next.js Conf bring some interesting updates including Server Actions which now stable. What's else?"
date: 2023-10-28T08:00:26.765Z
updated: 2025-04-22T04:59:30.355Z
tags: ["Web Development"]
categories: ["Develop"]
cover: "https://a.storyblok.com/f/169901/1920x1080/085171d16c/nextjs-14.png"
featured: true
---

It's been a while since Next.js released its version 13 that brought pretty much big changes and improvements, one of them is the new [App Router](https://nextjs.org/docs/app) that uses React Server Component compare from the old [Pages Router](https://nextjs.org/docs/pages/building-your-application). Two days ago, in [Next.js Conf](https://nextjs.org/conf), they introduced [Next.js 14](https://nextjs.org/blog/next-14) that comes with some interesting updates that help developer to increase their productivity and efficiency in the development process. Among the updates, there are two things worth pay attention to. Those are the Server Actions and new Next.js Learn. Let's talk about them.

## Server Actions

Long ago since Next.js 9 introduced API routes, we can write back-end code that later we use it to handle form submission at the front-end, looks something like this:

/pages/api/submit.ts

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body;
  const id = await create(data);
  res.status(200).json({ id });
}
```

/pages/index.tsx

```typescript
import { FormEvent } from 'react';
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    });
 
    // Handle response if necessary
    const data = await response.json();
    // ...
  }
 
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Now with Next.js 14, we can simplify the code into just one file, for example:

/app/pages.tsx

```typescript
export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const id = await createItem(formData);
  }
 
  return (
    <form action={create}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

We can use the Server Actions through a form but it's not a requirement. We can also directly called them as a function without a form, and by doing this especially when using Typescript we can make sure the type safety end-to-end.

## Next.js Learn

They also introducing a brand new [Next.js Learn](https://nextjs.org/learn) , the free updated course to learn Next.js created by Next.js themselves to help you understand deeply about this awesome framework. They're including some new concepts that they brought to their previous update with version 13, like app router, setting up Postgres database, streaming, fetching data with Server Components, etc. I think this is a great starting point especially to whoever want to learn Next.js from scratch.

Other than that, they also added couple improvements such as updated compiler now using [Turbopack](https://turbo.build/pack) which will replace Webpack and brings more speed in local server startup by up to 53.3% and up to 94.7% faster code updates with Fast Refresh. I personally excited about this updates, it's definitely will improve both developer and user experience eventually.
