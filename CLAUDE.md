# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production (also runs next-sitemap as postbuild)
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 14 App Router** personal portfolio site (`suryawiguna.com`) that uses **Storyblok** as a headless CMS for all content.

### Content flow

All page content is fetched from Storyblok's GraphQL API (`https://gapi.storyblok.com/v1/api`) via `lib/api.js`. The CMS drives:
- Home page (`getHome`) — resolves relations to blog posts
- Generic pages like portfolio and link (`getPage`)
- Blog post listing (`getAllPosts`, `getFeaturedPosts`) and individual posts (`getPost`)
- Navigation (`getNavigation`)

Pages are server components that fetch their content directly, then pass `blok` props to presentational components. The `lib/helper.ts` `searchComponent(data, name)` utility extracts a specific component block from a page's `body` array by component type name.

### Storyblok integration

- `components/StoryblokProvider.tsx` — initializes `@storyblok/react/rsc` for RSC and registers the `page` and `introduction` component mappings
- `components/global/dynamicComponent.tsx` — client-side renderer for Storyblok bloks; maps component names to React components
- The root layout (`app/layout.tsx`) also calls `storyblokInit` for client-side use and sets `revalidate = 10`

### Pages

| Route | Data source |
|-------|-------------|
| `/` | `getHome()` — sections (introduction, portfolios, histories, skills, blogPosts) come from `data.body` |
| `/blog` | `getAllPosts()` |
| `/blog/[slug]` | `getPost(slug)`, static params generated at build |
| `/portfolio` | `getPage("portfolio")` |
| `/link` | `getPage("link")` |

### Email subscriptions

Two parallel subscription systems exist:
- `app/api/subscribe/route.ts` — server-side Mailchimp integration (POST with email header)
- `components/blog/subscribe.tsx` — client-side Brevo API call using `NEXT_PUBLIC_BREVO_API_KEY`

### Styling

Tailwind CSS with `@tailwindcss/typography` plugin. Font is Open Sans via `next/font/google`. Dark mode is class-based but not currently wired to a toggle. Styled-components is installed but Tailwind is the primary styling approach.

### Environment variables

```
STORYBLOK_ACCESS_TOKEN        # Storyblok GraphQL API token
NEXT_PUBLIC_GOOGLE_ANALYTICS  # GA4 measurement ID
NEXT_PUBLIC_HOTJAR_ID         # Hotjar site ID
MAILCHIMP_API_KEY             # Mailchimp API key
MAILCHIMP_API_SERVER          # Mailchimp server prefix (e.g. us14)
MAILCHIMP_AUDIENCE_ID         # Mailchimp list/audience ID
NEXT_PUBLIC_BREVO_API_KEY     # Brevo (Sendinblue) API key
```

### Image domains

Allowed in `next.config.js`: `blog.suryawiguna.com`, `a.storyblok.com`, `cdn.buymeacoffee.com`.
