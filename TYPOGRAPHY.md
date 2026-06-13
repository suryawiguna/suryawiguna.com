# Typography System

A small, standardized type system for suryawiguna.com. The goal: one scale,
two typefaces, predictable roles — and **no readable content below 16px**.

Tokens live in `:root` in [styles/v3.css](styles/v3.css). Every `font-size`,
`line-height`, `font-weight`, and `letter-spacing` in the stylesheets should
reference a token below rather than a raw value.

---

## Typefaces

| Role | Family | Loaded as | Weights |
|------|--------|-----------|---------|
| **Display** — headings, titles, brand | Archivo | `--font-display` → `--display` | 400, 500, 600, 700 |
| **Body** — paragraphs, UI, everything else | Inter | `--font-body` → `--body` | 400, 500, 600 |
| **Mono** — inline code | `ui-monospace, "Geist Mono", Menlo` | — | — |

Pairing rationale: Archivo is a tight, slightly condensed grotesque that gives
headings character; Inter is a neutral, highly legible workhorse for body and
UI. Both are loaded in [app/layout.tsx](app/layout.tsx).

---

## Type scale

Base is **16px = 1rem**. Roughly a 1.2 (minor-third) step at the body end,
widening toward display sizes for contrast.

| Token | rem | px | Role |
|-------|-----|----|------|
| `--text-xs` | 0.8125rem | 13px | Uppercase micro-labels only (eyebrows, tracked meta) |
| `--text-sm` | 0.875rem | 14px | UI chrome: nav, buttons, inputs, pagination, breadcrumbs, byline |
| `--text-base` | 1rem | **16px** | **Body copy & all reading content — the floor** |
| `--text-md` | 1.125rem | 18px | Lead paragraphs, list-item titles |
| `--text-lg` | 1.25rem | 20px | Sub-headings (article `h3`) |
| `--text-xl` | 1.5rem | 24px | Section headings (`h2`), blog-card titles |
| `--text-2xl` | 1.875rem | 30px | (reserve) |
| `--text-3xl` | clamp(2rem, 4.4vw, 2.6rem) | 32–42px | Hero & page/article titles |

### The 16px floor

Two tiers, deliberately:

- **Content** — paragraphs, list primary + secondary text, excerpts, deks,
  experience entries, post titles → **≥16px** (`--text-base`+).
- **Chrome & meta** — interactive controls, supporting metadata, and
  micro-labels (nav, buttons, form fields, pagination, breadcrumbs, dates,
  pill badges, byline meta, uppercase eyebrows) → **14px** (`--text-sm`), or
  **13px** (`--text-xs`) for uppercase tracked labels.

Chrome is intentionally allowed below 16px because it is navigation/controls,
not reading text. Raise it to `--text-base` if you want a hard 16px everywhere.

### Standardized meta — dates & pill badges

Two recurring elements are pinned to a single size site-wide, regardless of
page:

| Element | Size | Notes |
|---------|------|-------|
| **Dates** (`.m-post-date`, `.m-bp-meta`, `.m-work-year`, byline date, `.m-rc-date`) | **14px** (`--text-sm`) | Plain, muted, sentence-case — no uppercase variants |
| **Pill badges** (`.m-chip` — skills, tags, categories) | **14px** (`--text-sm`) | All badges share one class and one size |

Dates and badges are supporting metadata, not reading content, so they sit one
step below the 16px body floor at 14px. Don't give a date or a badge a bespoke
size — if it's a date or a pill, it's `--text-sm`.

---

## Line height

| Token | Value | Use |
|-------|-------|-----|
| `--leading-tight` | 1.15 | Large display titles |
| `--leading-snug` | 1.3 | Headings, card titles |
| `--leading-normal` | 1.6 | Body, UI |
| `--leading-relaxed` | 1.75 | Long-form article body |

## Weight

| Token | Value | Use |
|-------|-------|-----|
| `--font-regular` | 400 | Body |
| `--font-medium` | 500 | Emphasis, buttons, labels |
| `--font-semibold` | 600 | Headings, titles, brand |
| `--font-bold` | 700 | Reserved (Archivo only) |

## Letter spacing

| Token | Value | Use |
|-------|-------|-----|
| `--tracking-tight` | -0.02em | Display headings |
| `--tracking-snug` | -0.015em | Titles |
| `--tracking-wide` | 0.04em | Small-caps / labels |
| `--tracking-eyebrow` | 0.12em | Uppercase eyebrows |

---

## Role map

How existing classes map onto the scale.

| Class | Size | Family / weight |
|-------|------|-----------------|
| `.m-h1`, `.m-article-title`, `.m-blog-title` | `--text-3xl` | display / 600 |
| `.m-h2`, `.m-article h2`, `.m-bp-title` | `--text-xl` | display / 600 |
| `.m-article h3` | `--text-lg` | display / 600 |
| `.m-work-title`, `.m-rc-title` | `--text-md` | display / 600 |
| `.m-lede`, `.m-article-dek`, `.m-blog-dek`, `.m-article blockquote` | `--text-md` | body/display |
| body, `.m-work-blurb`, `.m-li-top`, `.m-li-sub`, `.m-post-title`, `.m-bp-excerpt`, `.m-article` | `--text-base` | body |
| Dates (`.m-post-date`, `.m-work-year`, `.m-bp-meta`, `.m-byline-meta`, `.m-rc-date`), pill badges (`.m-chip` — skills/tags), `.m-nav-items`, `.m-brand`, `.m-btn`, `.m-more`, `.m-status`, `.m-breadcrumb`, `.m-back`, `.m-share a`, search/filter/pagination, subscribe | `--text-sm` | body / muted |
| `.m-eyebrow`, `.m-related-h` | `--text-xs` | uppercase / tracked |

---

## Usage

```css
.some-title {
  font-family: var(--display);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
}
```

Don't introduce raw px/rem font sizes. If a new role needs a size that isn't on
the scale, add a token here first.
