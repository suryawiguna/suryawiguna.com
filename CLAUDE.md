# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js 14 App Router** personal portfolio site (`suryawiguna.com`). **Only blog posts come from Storyblok** — every other page is hardcoded in `content/`.

### Content flow

**Hardcoded pages.** The home, portfolio, and link pages, plus site-wide facts and navigation, live as plain typed TypeScript modules under `content/`:

| File | Holds |
|------|-------|
| `content/site.ts` | Site URL/name, email, location, avatar, social profiles, nav items, sitemap `PAGE_UPDATED` dates |
| `content/home.ts` | Home SEO, hero copy, working experiences, education, skills |
| `content/projects.ts` | Every portfolio project, plus `visibleProjects` / `featuredProjects` and the `/portfolio` page's heading and SEO |
| `content/links.ts` | `/link` SEO, intro, and the link list split into `socialLinks` / `primaryLinks` |
| `content/services.ts` | `/services` SEO and copy: the three `OFFERS`, `PROCESS`, `SECTORS`, `CASE_STUDIES`, `FAQS`, the blog CTA, and `BUDGET_RANGES` for the contact form |

`content/services.ts` also feeds the home page's "What I do" and "How it works" sections, so the short and long versions of an offer stay in sync. `CASE_STUDIES` entries reference projects by title and are looked up in `visibleProjects`, so the titles must match `content/projects.ts` exactly (including the macron in `Vāyu`).

Editing site copy means editing these files — there is no CMS entry for them. Images still point at the Storyblok CDN (`a.storyblok.com`), which stays an allowed `next/image` host.

Two flags worth knowing: a project marked `hidden: true` stays in the file but renders nowhere; `featured: true` adds it to the home page's "Recent Works". A history entry marked `current: true` feeds `worksFor` in the home page JSON-LD.

`content/site.ts` `PAGE_UPDATED` supplies the sitemap `lastModified` for `/`, `/services`, `/portfolio`, and `/link` — Storyblok used to provide those dates, so bump the matching entry when you meaningfully edit a page.

**Blog.** Post content is fetched from Storyblok's GraphQL API (`https://gapi.storyblok.com/v1/api`) via `lib/api.js`: `getAllPosts`, `getFeaturedPosts`, `getPost`, and `getSitemapEntries`.

Storyblok's GraphQL API defaults `PostItems` to 25 per page and caps `per_page` at 100, so any query that must return *every* post has to paginate — go through the `fetchAllPostItems` helper in `lib/api.js` rather than issuing a bare `PostItems` query. Skipping this silently truncates the blog index, `generateStaticParams`, and the sitemap.

The Storyblok React SDK (`@storyblok/react`) is **not** a dependency — posts are fetched with plain `fetch` and rendered through `components/global/richText.tsx` (`storyblok-rich-text-react-renderer`). There is no visual editor wiring; don't reintroduce `storyblokInit`, `StoryblokComponent`, or `storyblokEditable`.

### Pages

| Route | Data source |
|-------|-------------|
| `/` | `content/home.ts` + `featuredProjects`; the recent-posts strip calls `getAllPosts(5)` |
| `/blog` | `getAllPosts()` |
| `/blog/[slug]` | `getPost(slug)`, static params generated at build |
| `/services` | `content/services.ts` |
| `/portfolio` | `content/projects.ts` |
| `/link` | `content/links.ts` |
| `/sitemap.xml` | `app/sitemap.ts` — `getSitemapEntries()` + `PAGE_UPDATED`, revalidates hourly |
| `/robots.txt` | `app/robots.ts` |

`sitemap.xml` and `robots.txt` are generated routes, not files. Do not add either to `public/` — static files there shadow app routes and would silently freeze the sitemap again.

### Email subscriptions

Two parallel subscription systems exist:
- `app/api/subscribe/route.ts` — server-side Mailchimp integration (POST with email header)
- `components/blog/subscribe.tsx` — client-side Brevo API call using `NEXT_PUBLIC_BREVO_API_KEY`

### Contact form

`components/services/contactForm.tsx` (client) POSTs JSON to `app/api/contact/route.ts`, which sends the enquiry as a transactional email via Brevo. It uses the server-only `BREVO_API_KEY`, **not** the `NEXT_PUBLIC_BREVO_API_KEY` the subscribe widget ships to the browser. Without the key set the route returns 502 and the form tells the visitor to email instead. The `company` field is a honeypot: a filled one gets a silent 200 and no email.

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
NEXT_PUBLIC_BREVO_API_KEY     # Brevo (Sendinblue) API key, client-side, blog subscribe only
BREVO_API_KEY                 # Brevo API key, server-only, sends the /services contact form
```

### Image domains

Allowed in `next.config.js`: `blog.suryawiguna.com`, `a.storyblok.com`, `cdn.buymeacoffee.com`.
