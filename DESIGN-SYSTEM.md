# Design System

One scale for every dimension of the UI: size, space, radius, colour, motion.
This document is the contract. [styles/v3.css](styles/v3.css) is the
implementation — every token lives in `:root` there.

**The rule:** no rule in any stylesheet may use a raw px/rem value for a
font size, space, radius, colour, or duration. If a new role needs a value
that isn't on a scale below, add the token here first, then use it.

> Supersedes `TYPOGRAPHY.md`, which covered type only and had already drifted
> out of sync with the code it described.

---

## 1. Layers

| File | Scope | Loaded by |
|------|-------|-----------|
| [`styles/v3.css`](styles/v3.css) | Tokens + every shared primitive | `app/layout.tsx` — site-wide |
| [`styles/v3-blog-index.css`](styles/v3-blog-index.css) | Toolbar, post card grid, pagination | `app/blog/page.tsx`, `app/blog/tag/[tag]/page.tsx` |
| [`styles/v3-blog-post.css`](styles/v3-blog-post.css) | Breadcrumb, cover, prose, share, related | `app/blog/[slug]/page.tsx` |

A page layer may only add what that route genuinely introduces. It must not
restyle a shared primitive — if a page needs `.m-h2` or `.m-btn` to look
different, either the primitive is wrong for everyone or the page needs a
modifier class. **There is no `/services` layer any more**; what was in it was
either promoted here or expressed as a modifier (`.m-hero-left`,
`.m-split`).

### Canvas

Every route roots itself in `.m-page-wide`, which widens `<main>` to
`--maxw-wide` (1080px) via `.m-main:has(> .m-page-wide)`. The nav and footer
are always 1080px, so the left edge never moves between pages. A blog post
splits that canvas with `.m-post-layout`: the article in a `--measure`
(42rem) column on the left, and a sticky "Read next" aside on the right that
drops under the article at 768px.

Tailwind is still compiled (`styles/global.css`) but styles almost nothing —
a spinner in the contact form is all that is left. `@tailwindcss/typography`
is no longer registered: it was layering a second, competing type system on
top of `.m-article` in the blog renderer.

---

## 2. Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#f8f8f8` | Page background — light grey, so white panels and screenshots separate without a border |
| `--ink` | `#111111` | Headings, primary text |
| `--ink-soft` | `#3d3d3d` | **All reading copy**: ledes, blurbs, descriptions, prose, chip text |
| `--muted` | `#666666` | **Meta only**: dates, labels, captions, nav, placeholders |
| `--line` | `#e6e6e6` | Field and control borders, the few remaining dividers |
| `--chip` | `#eeeeee` | Pill, avatar and image-placeholder fill |
| `--chip-ink` | → `--ink-soft` | Text on `--chip` |
| `--surface` | `#ffffff` | Panels — they sit above the grey page |
| `--accent` | `#C2410C` | Primary action, hover and markers; AA on `--bg` |

Every neutral is pure grey — no blue (Tailwind gray) or warm undertone.

**Fewer lines.** Space separates sections, not rules: `.m-section`, the nav
and the footer carry no border, cards have no outline, and list rows on the
home page have no dividers. Borders stay where they mark a control (fields,
ghost buttons, search) or where long text needs a scan line (FAQ, blog index
rows).
| `--on-accent` | `#ffffff` | Text on the action-orange fill |
| `--success` | `#10b981` | Availability dot |
| `--danger` | `#b91c1c` | Form errors |

Never write a hex literal outside `:root`. `#fff` on an accent button is
`--on-accent`; the green dot is `--success`.

Two `<html>` switches change the palette globally: `data-accent="off"` swaps
accent fills for `--ink`, and `data-rounded="off"` squares off `--radius`.

---

## 3. Typography

### Typefaces

| Role | Family | Token | Weights |
|------|--------|-------|---------|
| **Display** — headings, titles, brand | Inter | `--display` | 500–700 |
| **Body** — paragraphs, UI | Inter | `--body` | 400–600 |

One sans family. Headings differ from body by size, weight and tracking, not
by face; `--display` stays a separate token so headings can be re-pointed in
one place.
| **Mono** — inline code | system mono stack | `--mono` | — |

### Scale

Base is **16px = 1rem**.

| Token | rem | px | Role |
|-------|-----|----|------|
| `--text-xs` | 0.8125 | 13 | Uppercase micro-labels only |
| `--text-sm` | 0.875 | 14 | UI chrome: nav, small buttons, fields, dates, chips |
| `--text-base` | 1 | **16** | **Body copy — the floor for reading content** |
| `--text-md` | 1.125 | 18 | Block titles, lead paragraphs |
| `--text-lg` | 1.25 | 20 | Row titles, in-prose `h3` |
| `--text-xl` | 1.5 | 24 | In-prose `h2` |
| `--text-2xl` | 1.875 | 30 | Section headings (`.m-h2`) |
| `--text-3xl` | clamp(2rem, 4.4vw, 2.6rem) | 32–42 | Page titles (`.m-h1`) |
| `--text-display` | clamp(2.5rem, 5.6vw, 4rem) | 40–64 | The home headline only (`.m-h1-display`) |

### The five heading tiers

Everything that reads as a heading falls into exactly one of these. This is
the part that had drifted worst — `/blog` set its `<h1>` at 24px while `/`
set its at 42px, and `/portfolio` faked one with an `.m-h2` plus an inline
`font-size` override.

| Tier | Class | Size | Where |
|------|-------|------|-------|
| **Page title** | `.m-h1` | `--text-3xl` | The one `<h1>` on every route, no exceptions |
| **Section heading** | `.m-h2` | `--text-2xl` | Every `<h2>` that separates blocks of a page |
| **Card title** | `.m-project-title`, `.m-bp-title` | `--text-lg` | The title under a project or post image |
| **Block title** | `.m-offer-title`, `.m-sector-name`, `.m-step-title`, `.m-case-title`, `.m-cta-card-title`, `.m-rc-title`, `.m-foot-block h3` | `--text-md` | Every `<h3>` inside a section |
| **Micro-label** | `.m-eyebrow`, `.m-related-h`, `.m-case-label` | `--text-xs` | Uppercase, tracked, muted |

`.m-h1` takes three modifiers: `.m-h1-wide` (24ch, for longer marketing
headlines), `.m-h1-full` (unbounded, for article titles) and
`.m-h1-display` (`--text-display`, bold, 20ch — the home headline only).

**One documented exception.** In-prose headings run one step below their
page-structural equivalents: `.m-article h2` is `--text-xl`, `.m-article h3`
is `--text-lg`. A page-structural heading separates blocks of a page; these
sit inside a 16px reading column and would shout at 30px.

### The 16px floor

- **Content** — paragraphs, list text, excerpts, deks, post titles →
  **≥16px**.
- **Chrome & meta** — nav, buttons, fields, pagination, breadcrumbs, dates,
  chips, byline → **14px**, or **13px** for uppercase tracked labels.

Chrome is allowed under 16px because it is navigation and controls, not
reading text.

**Dates and chips are pinned.** Every date (`.m-post-date`, `.m-bp-meta`,
`.m-rc-date`, byline) and every pill badge (`.m-chip` —
skills, tags, categories) is `--text-sm`, site-wide, on every page. If it is a
date or a pill, it does not get a bespoke size.

### Line height, weight, tracking

| Line height | | | Weight | | | Tracking | |
|---|---|---|---|---|---|---|---|
| `--leading-tight` | 1.15 | | `--font-regular` | 400 | | `--tracking-display` | -0.035em |
| `--leading-snug` | 1.3 | | `--font-medium` | 500 | | `--tracking-tight` | -0.02em |
| `--leading-normal` | 1.6 | | `--font-semibold` | 600 | | `--tracking-snug` | -0.015em |
| `--leading-relaxed` | 1.75 | | `--font-bold` | 700 | | `--tracking-wide` | 0.04em |
| | | | | | | `--tracking-eyebrow` | 0.12em |

Text at body size gets no tracking adjustment.

---

## 4. Space

A 4px base scale. **Every** padding, margin and gap uses one of these.

| Token | rem | px | | Token | rem | px |
|-------|-----|----|---|-------|-----|----|
| `--space-1` | 0.25 | 4 | | `--space-6` | 1.5 | 24 |
| `--space-2` | 0.5 | 8 | | `--space-8` | 2 | 32 |
| `--space-3` | 0.75 | 12 | | `--space-10` | 2.5 | 40 |
| `--space-4` | 1 | 16 | | `--space-12` | 3 | 48 |
| `--space-5` | 1.25 | 20 | | `--space-16` | 4 | 64 |

Before this pass the stylesheets held **38 distinct** padding/margin/gap
values — `0.35rem`, `0.45rem`, `0.55rem`, `0.6rem`, `0.7rem`, `0.85rem`,
`0.9rem`, `0.95rem` all appeared, often for the same job. That is the source
of "some elements larger than others": nothing lined up because nothing was
measured against anything.

### Vertical rhythm

| Element | Padding |
|---------|---------|
| `.m-hero` (page header) | `--space-16` top, `--space-12` bottom |
| `.m-home-hero` (left masthead home header) | `--space-16` top, `--space-12` bottom |
| `.m-hero-tight` (under a breadcrumb) | `--space-8` top |
| `.m-section` | `--space-12` top, `--space-10` bottom |
| ≤560px | `--space-12`/`--space-8` and `--space-8`/`--space-6` |

Section padding is **asymmetric on purpose**: more space above a heading than
below the block it closes, so the heading binds to the content it introduces
instead of floating equidistant between two blocks.

### Layout constants

| Token | Value | Use |
|-------|-------|-----|
| `--maxw` | 720px | Content column |
| `--maxw` | 720px | Fallback `<main>` width for a page without `.m-page-wide` |
| `--measure` | 42rem | Blog post article column (the old 720px column less its gutters) |
| `--maxw-wide` | 1080px | Every route (`.m-page-wide`), nav, footer |
| `--gutter` | 1.5rem | Horizontal page padding |
| `--avatar` / `--avatar-sm` / `--avatar-xs` | 76px / 44px / 36px | Generic / masthead (home, `/link`) / blog byline |
| `--nav-offset` | 5rem | `scroll-margin` under the sticky nav |

---

## 5. Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Inline code, hover fills, menu items |
| `--radius-md` | 10px | Fields, dropdowns, in-prose images |
| `--radius-lg` | 14px | Card images, covers, the CTA card |
| `--radius-pill` | 999px | Buttons, chips, avatars |
| `--radius` | → `--radius-pill` | Alias; `[data-rounded="off"]` flips it to `--radius-sm` |

There were nine radii before (4, 6, 8, 10, 12, 16, 999 and two split-pill
pairs) with cards at 8px, 12px and 16px depending on the page.

---

## 6. Controls

**One button metric and one field metric, site-wide.** Five different button
sizes existed before: the hero CTA, the `/services` CTA, pagination, the blog
filter and the subscribe button were all different.

| Token | Value | Applies to |
|-------|-------|------------|
| `--control-py` / `--control-px` | 0.75rem / 1.5rem | `.m-btn` — at `--text-base` |
| `--control-py-sm` / `--control-px-sm` | 0.5rem / 1rem | `.m-btn-sm`, `.m-page-btn`, `.m-filter-btn`, `.m-search`, `.m-subscribe-btn` — at `--text-sm` |
| `--field-py` / `--field-px` | 0.625rem / 0.875rem | `.m-field` inputs/selects/textareas, `.m-subscribe-input` |

`.m-btn` carries `.primary` / `.ghost` for fill, and `.m-btn-sm` for dense
contexts. A control that needs a different size is a bug in the metric, not a
reason for a new value.

---

## 7. Motion, focus, elevation

| Token | Value |
|-------|-------|
| `--transition` | `0.18s ease` — colour, border, background |
| `--transition-fast` | `0.15s ease` — transforms, hover fills |
| `--focus-width` / `--focus-color` / `--focus-offset` | `2px` / `--ink` / `3px` |
| `--shadow-drop` | `0 8px 24px rgba(0,0,0,.08)` — the only shadow |

**Focus rings are site-wide.** `a`, `button`, `summary`, `input`, `select`,
`textarea` and anything with `[tabindex]` get a `:focus-visible` ring from
`v3.css` (fields at a 1px offset). Previously only `/services` had any, so
keyboard users got nothing on four routes. **A page layer must never remove
it** — no `outline: none`.

`prefers-reduced-motion: reduce` collapses every animation and transition
site-wide and disables smooth scrolling.

---

## 8. Breakpoints

The site has **two**:

| Width | Meaning | What changes |
|-------|---------|--------------|
| `768px` | Tablet | `.m-split`, hero foot, offer, project and case grids go single-column; the blog grid goes to two; the article cover goes full-bleed |
| `560px` | Phone | Nav condenses, hero and section padding drop, the blog grid goes to one, date columns stack above their text |

There were five before (480, 560, 640, 720, 760), which is why the portfolio
and blog thumbnails changed size at different widths and the article cover
picked up a border radius while still effectively full-width.

---

## 9. Component roles

| Object | Class | Notes |
|--------|-------|-------|
| Page header | `.m-hero` | Every route. `.m-hero-left` reads left, `.m-hero-tight` sits under a breadcrumb, `.m-home-hero` is the masthead + display headline |
| Wide page | `.m-page-wide` | Root of a page that wants the 1080px canvas; widens `<main>` via `:has()` |
| Section | `.m-section` | No rule. `.m-split` puts the heading in a left column — the default for text sections on wide pages |
| Section head | `.m-section-head` | `.m-h2` left, `.m-more` right |
| Project card | `.m-project-link` | Image + text, no box. Home and `/portfolio` |
| Offer column | `.m-offer` | Number, title, blurb, "View service" — no box |
| Post card | `.m-bp` (`components/blog/postCard.tsx`) | The project card for posts: image, date · topic, title, 3-line excerpt. `/blog` and tag archives |
| Case study | `.m-case` | Image and text side by side, no box |
| Link row | `.m-link-row` | `/link` — title left, arrow right |
| CTA card | `.m-cta-card` | White `--surface` block, `--radius-lg`, no border. Under blog posts |
| Pill | `.m-chip` (+ `.m-chip-link`) | The only badge in the system |
| Icon | `.m-icon` on a `lucide-react` icon | 1em square, takes the text colour. `ArrowUpRight` for outbound links, `ArrowRight` / `ArrowLeft` for on-site ones; no text arrows (↗ → ←) |
| Ruled text link | `.m-case-link`, `.m-faq-link`, `.m-form-alt a` | One shared rule |
| Skeleton | `components/global/skeleton.tsx` | Heights track the type scale |

### Skeletons

The five `loading.tsx` files each carried their own copy of the same helpers,
and the copies had drifted. They now share
[`components/global/skeleton.tsx`](components/global/skeleton.tsx), whose bar
heights map onto the type scale (`title` → `--text-3xl`, `heading` →
`--text-2xl`, `rowTitle` → `--text-lg`, and so on) so a placeholder is the
size of the thing it stands in for. Widths stay per-route — they describe that
page's copy.

---

## 10. Adding something new

1. Can an existing primitive do it? Use it.
2. Does it need a variant? Add a **modifier** (`.m-hero-left`), not a
   page-scoped override.
3. Does it need a value that isn't on a scale? Add the token to `:root` and
   to this document, then use it.
4. Never reach for a raw px/rem, a hex literal, or a bare duration.

```css
.some-title {
  font-family: var(--display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-6);
}
```

### Checking yourself

These should each return nothing but hairline borders and deliberate
one-offs:

```bash
grep -nE "(padding|margin|gap)[a-z-]*: [^;]*[0-9](rem|px)" styles/*.css
```
