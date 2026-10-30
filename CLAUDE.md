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

This is a **Next.js 14 App Router** personal portfolio site (`suryawiguna.com`). **There is no CMS** — pages are hardcoded TypeScript in `content/`, and blog posts are Markdown files in `content/posts/`.

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

Two flags worth knowing: a project marked `hidden: true` stays in the file but renders nowhere; `featured: true` adds it to the home page's "Client work" grid, which is laid out 2×2 — keep it to four. A history entry marked `current: true` feeds `worksFor` in the home page JSON-LD.

`content/site.ts` `PAGE_UPDATED` supplies the sitemap `lastModified` for `/`, `/services`, `/portfolio`, and `/link` — Storyblok used to provide those dates, so bump the matching entry when you meaningfully edit a page.

**Blog.** Each post is `content/posts/<slug>.md` — YAML frontmatter plus a Markdown body — and the file name is the URL slug. `lib/posts.ts` reads them at build time and is the only way in: `getAllPosts(limit?)` (newest first, no body — safe to hand to a client component), `getPost(slug)`, and `getImageSizes(post)`, which sizes the cover and body images so they can go through `next/image`.

**Post images stay on the Storyblok CDN.** Covers and inline images keep their `a.storyblok.com` URLs, whose path carries the dimensions (`/f/<space>/<W>x<H>/…`) that `getImageSizes` reads. So the Storyblok space must not be deleted — it is now only an image host. A new post can either upload images to Storyblok's asset manager and paste the URL, or drop them in `public/blog/<slug>/` and reference `/blog/<slug>/…` (measured with `sharp`). Any other host renders as a plain lazy `<img>`.

Frontmatter fields, all validated on load so a typo fails the build instead of a page:

| Field | |
|-------|--|
| `title`, `excerpt`, `date` | Required. `date` is first publication and sets the sort order. |
| `updated` | Sitemap `lastModified` and JSON-LD `dateModified`; defaults to `date`. Bump it when you meaningfully edit a post. |
| `tags`, `categories` | Lists. Tags drive the archives (see below); categories only weight "Read next". |
| `cover`, `coverAlt` | A Storyblok asset URL or `/blog/<slug>/…`; alt falls back to the title. |
| `noindex` | Renders, but drops out of the index, sitemap, tag archives and "Read next". |
| `draft` | Only `next dev` sees it; production builds skip it entirely. |
| `featured` | Carried over from Storyblok; nothing reads it yet. |

Bodies render through `components/blog/markdown.tsx` (`react-markdown` + `remark-gfm`): internal links become `next/link`, external ones open in a new tab, fenced code goes through `react-syntax-highlighter`, and any image `getImageSizes` could not measure (remote, SVG) falls back to a lazy plain `<img>`. Plain Markdown, not MDX — there are no components inside posts.

Publishing is a deploy: add or edit the file, commit, push. The posts were migrated out of Storyblok in October 2026 by a one-off script. Older posts imported from the old WordPress blog and dev.to pointed at dead hosts: the 11 images that could be recovered (dev.to's S3 originals, the Wayback Machine) now live in `public/blog/<slug>/`; 15 more across five 2020–2021 posts are gone everywhere and still show as broken images, exactly as they did on Storyblok.

### Pages

| Route | Data source |
|-------|-------------|
| `/` | `content/home.ts` + `featuredProjects`; the recent-posts strip calls `getAllPosts(3)` |
| `/blog` | `getAllPosts()` |
| `/blog/[slug]` | `getPost(slug)`, static params generated at build, `dynamicParams = false` |
| `/blog/tag/[tag]` | `getAllPosts()` filtered through `lib/tags.ts`; static params generated at build, `dynamicParams = false` |
| `/services` | `content/services.ts` |
| `/portfolio` | `content/projects.ts` |
| `/link` | `content/links.ts` |
| `/sitemap.xml` | `app/sitemap.ts` — `getAllPosts()` minus `noindex` + `PAGE_UPDATED` + tag archives, built at deploy |
| `/robots.txt` | `app/robots.ts` |

`sitemap.xml` and `robots.txt` are generated routes, not files. Do not add either to `public/` — static files there shadow app routes and would silently freeze the sitemap again.

### Loading skeletons

Each route has its own `loading.tsx`, and each one must cover **only** its own route. A `loading.tsx` wraps every segment below its folder, and Next shows the outermost one first, so a skeleton sitting above other routes leaks onto them. A post used to load behind the `/blog` grid skeleton, and every page behind the home one. That is why the home page lives in `app/(home)/` and the blog index in `app/blog/(index)/`: the route groups scope those two skeletons without changing a URL. Keep any new `page.tsx` that has child routes inside a group like this.

Moving a page into or out of a route group needs a dev-server restart; until then `next dev` keeps the stale route and 404s.

### Tag archives

`/blog/tag/[tag]` lists every indexable post carrying a tag. The rules live in `lib/tags.ts`, not in the route:

- A tag only gets a URL once it has `MIN_POSTS_PER_TAG` (3) posts — below that the page would be near-empty and compete with the posts it links to. `archivableTags` is the single source of which archives exist, and it is what the route, the post page's tag links, and the sitemap all read.
- `tagSlug` derives the URL segment from the tag text (`&` becomes ` and `, everything non-alphanumeric collapses to `-`). Tags are free text in frontmatter, so never hand-write a slug — round-trip through `tagSlug` / `tagFromSlug`. Spell a tag exactly as the other posts do (`Web Development`, `B2B & Analytics`), or it becomes a separate tag.
- Posts with `noindex` are excluded from both the counts and the listings.
- The route sets `dynamicParams = false` on purpose. Without it an unknown tag renders the not-found page behind a 200 — a soft 404.

### Email subscriptions

Two parallel subscription systems exist:
- `app/api/subscribe/route.ts` — server-side Mailchimp integration (POST with email header)
- `components/blog/subscribe.tsx` — client-side Brevo API call using `NEXT_PUBLIC_BREVO_API_KEY`

### Contact form

The form is `EnquiryForm` in `components/services/contactForm.tsx`, and it renders in two places:

- **Inline**, as the closing section of `/services` (the file's default export, `#contact`).
- **As a popup** on every other page: `components/services/contactDialog.tsx`, a native `<dialog>` mounted once in the root layout.

Every "start a project" button (home hero, `/services` hero and case studies, `/portfolio` hero, the closing `contactCta.tsx` sections on home and portfolio) is a plain `<a href={CONTACT_HREF}>` to `/services#contact`, so it works without JavaScript. `ContactDialog` listens for clicks on links with exactly that `href` and, anywhere but `/services`, opens the popup instead; on `/services` the link just scrolls. Modified clicks (cmd/ctrl/shift, middle button) still navigate. So a new contact button needs nothing but that `href` — do not wire it to the dialog by hand. The popup's form stays mounted after it closes, so a stray backdrop click does not lose what was typed.

The form (client) POSTs JSON to `app/api/contact/route.ts`, which sends the enquiry as a transactional email via Brevo, from and to `hi@suryawiguna.com` with the visitor as reply-to. It uses the server-only `BREVO_API_KEY`, **not** the `NEXT_PUBLIC_BREVO_API_KEY` the subscribe widget ships to the browser. Without the key set, or when Brevo refuses the send, the route returns 500 and the form tells the visitor to email instead. Never 502: Cloudflare fronts the site and replaces an origin 502 with its own HTML page, which hides the message. The `company` field is a honeypot: a filled one gets a silent 200 and no email.

Each enquiry email ends with a `From:` line, such as `From: Homepage - https://suryawiguna.com/`. The form sends a full URL as `ref` at submit time: from the popup, the page the popup opened on; from the inline form, the page the visitor was on before `/services`, else the outside referrer, else `Direct` (`arrivedFrom()` in `components/global/pageTrail.tsx`). The route names it from the path alone — `Homepage`, the nav label, `Blog post`, `Blog tag`, or `External` for another site — and never reads `content/posts`, so a missing file in the function bundle cannot break enquiries. That component is mounted in the root layout and keeps the previous path in `sessionStorage`, because client-side navigation (the nav, `next/link`) never updates `document.referrer`.

Delivery depends on `suryawiguna.com` staying authenticated in Brevo (its DKIM records in DNS). The domain's mail is hosted on Zoho, which can silently drop mail claiming to be from the domain when it comes from an unauthenticated sender — the likely reason early test sends got a 2xx from Brevo and never arrived. If enquiries stop showing up, check the Brevo transactional log (delivered / blocked / bounced) and Zoho's quarantine first. Brevo IP restriction must stay off, since serverless hosts rotate egress IPs.

### Styling

**Read [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) before touching any stylesheet.** It is the contract; `styles/v3.css` is the implementation.

Three hand-written stylesheets, no CSS framework in practice:

| File | Scope | Loaded by |
|------|-------|-----------|
| `styles/v3.css` | Tokens + every shared primitive | `app/layout.tsx` — site-wide |
| `styles/v3-blog-index.css` | Toolbar, post card grid, pagination | `app/blog/(index)/page.tsx`, `app/blog/tag/[tag]/page.tsx` |
| `styles/v3-blog-post.css` | Breadcrumb, cover, prose, share, related | `app/blog/[slug]/page.tsx` |

Every token lives in `:root` in `styles/v3.css`: colour, type scale, a 4px space scale, radius, control metrics, motion, focus, elevation. **No stylesheet may use a raw px/rem for a font size, space, radius, colour, or duration** — add a token first. The site has exactly two breakpoints, 768px and 560px.

A page layer may only add what that route introduces; it must not restyle a shared primitive. If a page needs `.m-h2` or `.m-btn` to look different, either the primitive is wrong for everyone or the page needs a modifier class (`.m-hero-left`, `.m-split`). There is deliberately no `/services` layer any more.

The only font is Inter via `next/font/google` — `--display` and `--body` both point at it. Every route roots itself in `.m-page-wide`, which widens `<main>` to the 1080px canvas (`.m-main:has(> .m-page-wide)`). A blog post splits it with `.m-post-layout`: the article in a 42rem column and a sticky "Read next" aside (`findRelatedPosts(post, all, 5)`) that drops under the article at 768px. Text sections on wide pages use `.m-split` (heading left, content right); separation is space, not rules. Tailwind is still compiled via `styles/global.css` but styles almost nothing — a spinner in the contact form is all that is left, and `@tailwindcss/typography` is no longer registered because it was layering a second type system over `.m-article`. Dark mode is class-based but not wired to a toggle.

### Environment variables

```
NEXT_PUBLIC_GOOGLE_ANALYTICS  # GA4 measurement ID
NEXT_PUBLIC_HOTJAR_ID         # Hotjar site ID
MAILCHIMP_API_KEY             # Mailchimp API key
MAILCHIMP_API_SERVER          # Mailchimp server prefix (e.g. us14)
MAILCHIMP_AUDIENCE_ID         # Mailchimp list/audience ID
NEXT_PUBLIC_BREVO_API_KEY     # Brevo (Sendinblue) API key, client-side, blog subscribe only
BREVO_API_KEY                 # Brevo API key, server-only, sends the /services contact form
```

### Image domains

Allowed in `next.config.js`: `blog.suryawiguna.com`, `a.storyblok.com`, `cdn.buymeacoffee.com`. `a.storyblok.com` serves the blog covers and post images as well as the hardcoded pages' avatar and portfolio images.
