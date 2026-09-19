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
| [`styles/v3-blog-index.css`](styles/v3-blog-index.css) | Toolbar, post row, pagination | `app/blog/page.tsx` |
| [`styles/v3-blog-post.css`](styles/v3-blog-post.css) | Breadcrumb, cover, prose, share, related | `app/blog/[slug]/page.tsx` |

A page layer may only add what that route genuinely introduces. It must not
restyle a shared primitive — if a page needs `.m-h2` or `.m-btn` to look
different, either the primitive is wrong for everyone or the page needs a
modifier class. **There is no `/services` layer any more**; what was in it was
either promoted here or expressed as a modifier (`.m-hero-left`,
`.m-section-panel`).

Tailwind is still compiled (`styles/global.css`) but styles almost nothing —
a spinner in the contact form is all that is left. `@tailwindcss/typography`
is no longer registered: it was layering a second, competing type system on
top of `.m-article` in the blog renderer.

---

## 2. Colour

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#ffffff` | Page background |
| `--ink` | `#1f2937` | Headings, primary text |
| `--ink-soft` | `#374151` | Article prose, chip text |
| `--muted` | `#6b7280` | Secondary text, meta, placeholders |
| `--line` | `#e5e7eb` | Every border and divider |
| `--chip` | `#f3f4f6` | Pill and avatar fill |
| `--chip-ink` | → `--ink-soft` | Text on `--chip` |
| `--surface` | 55% `--chip` over `--bg` | Panels — a full panel needs less tint than a pill |
| `--accent` | `#C2410C` | Primary action, hover and markers; AA against white |
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
| **Display** — headings, titles, brand | Archivo | `--display` | 400–700 |
| **Body** — paragraphs, UI | Inter | `--body` | 400–600 |
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

### The five heading tiers

Everything that reads as a heading falls into exactly one of these. This is
the part that had drifted worst — `/blog` set its `<h1>` at 24px while `/`
set its at 42px, and `/portfolio` faked one with an `.m-h2` plus an inline
`font-size` override.

| Tier | Class | Size | Where |
|------|-------|------|-------|
| **Page title** | `.m-h1` | `--text-3xl` | The one `<h1>` on every route, no exceptions |
| **Section heading** | `.m-h2` | `--text-2xl` | Every `<h2>` that separates blocks of a page |
| **Row title** | `.m-work-title`, `.m-bp-title` | `--text-lg` | The primary line of a thumbnail row |
| **Block title** | `.m-offer-title`, `.m-sector-name`, `.m-step-title`, `.m-case-title`, `.m-cta-card-title`, `.m-rc-title`, `.m-foot-block h3` | `--text-md` | Every `<h3>` inside a section |
| **Micro-label** | `.m-eyebrow`, `.m-related-h`, `.m-case-label` | `--text-xs` | Uppercase, tracked, muted |

`.m-h1` takes two modifiers: `.m-h1-wide` (24ch, for longer marketing
headlines) and `.m-h1-full` (unbounded, for article titles).

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
`.m-work-year`, `.m-rc-date`, byline) and every pill badge (`.m-chip` —
skills, tags, categories) is `--text-sm`, site-wide, on every page. If it is a
date or a pill, it does not get a bespoke size.

### Line height, weight, tracking

| Line height | | | Weight | | | Tracking | |
|---|---|---|---|---|---|---|---|
| `--leading-tight` | 1.15 | | `--font-regular` | 400 | | `--tracking-display` | -0.025em |
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
| `.m-home-hero` (compact desktop home header) | `--space-12` top, `--space-10` bottom |
| `.m-hero-tight` (under a breadcrumb) | `--space-8` top |
| `.m-section` | `--space-12` top, `--space-10` bottom |
| `.m-section-panel` | `--space-10` / `--space-8` inset, `--space-5` outer margin |
| ≤560px | `--space-12`/`--space-8` and `--space-8`/`--space-6` |

Section padding is **asymmetric on purpose**: more space above a heading than
below the block it closes, so the heading binds to the content it introduces
instead of floating equidistant between two blocks.

### Layout constants

| Token | Value | Use |
|-------|-------|-----|
| `--maxw` | 720px | Content column |
| `--maxw-wide` | 1080px | Image-led portfolio showcase |
| `--gutter` | 1.5rem | Horizontal page padding |
| `--thumb` / `--thumb-sm` | 96px / 72px | List thumbnails |
| `--avatar` / `--avatar-compact` | 76px / 64px | Profile and compact-home avatars |
| `--nav-offset` | 5rem | `scroll-margin` under the sticky nav |

---

## 5. Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Inline code, hover fills, menu items |
| `--radius-md` | 10px | Fields, thumbnails, dropdowns, cover images |
| `--radius-lg` | 14px | Cards and panels |
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
| `768px` | Narrower than the content column plus gutters | Offer grid and sector rows go single-column; panels tighten; the article cover goes full-bleed |
| `560px` | Phone | Nav condenses, hero and section padding drop, thumbnails go to `--thumb-sm`, two-column grids stack, the blog row relayouts |

There were five before (480, 560, 640, 720, 760), which is why the portfolio
and blog thumbnails changed size at different widths and the article cover
picked up a border radius while still effectively full-width.

---

## 9. Component roles

| Object | Class | Notes |
|--------|-------|-------|
| Page header | `.m-hero` | Every route. `.m-hero-left` reads left, `.m-hero-tight` sits under a breadcrumb |
| Section | `.m-section` | `.m-section-lead` drops the top rule, `.m-section-panel` makes it a tinted card |
| Thumbnail row | `.m-work-item` (portfolio), `.m-bp` (blog) | The same object — same thumbnail, radius, padding, title size, breakpoint |
| Card | `.m-offer`, `.m-related-card`, `.m-cta-card` | `--radius-lg`, `--space-5`/`--space-6` padding, `--line` border |
| Pill | `.m-chip` (+ `.m-chip-link`) | The only badge in the system |
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
