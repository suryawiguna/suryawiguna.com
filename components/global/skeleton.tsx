import type { CSSProperties, ReactNode } from "react";

// One set of skeleton primitives for every route's loading.tsx. Each route
// used to carry its own copy of these helpers, and the copies had drifted
// apart — different bar radii, different heights for the same element.
//
// Heights track the type scale in styles/v3.css, so a placeholder occupies
// the space the real element will: swap a token there and the skeletons
// follow. Widths stay per-route, because they describe that page's copy.
const HEIGHT = {
  title: 36, // --text-3xl, a page title
  heading: 30, // --text-2xl, a section heading
  rowTitle: 20, // --text-lg, a work / post row title
  blockTitle: 18, // --text-md, an offer or card title
  text: 14, // --text-base, a line of body copy
  meta: 12, // --text-sm, a date or byline
} as const;

// Controls are padding + line box + border; see --control-* in styles/v3.css.
export const CONTROL_H = 46;
export const CONTROL_SM_H = 36;
export const CHIP_H = 32;
export const AVATAR = 76;

type Height = keyof typeof HEIGHT;

export function Skeleton({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-label="Loading" className="m-skel">
      {children}
    </div>
  );
}

export function Bar({
  w,
  h = "text",
  style,
}: {
  w: number | string;
  h?: Height;
  style?: CSSProperties;
}) {
  return (
    <div
      className="m-skel-bar"
      style={{ width: w, height: HEIGHT[h], ...style }}
    />
  );
}

export function Pill({
  w,
  h = CHIP_H,
}: {
  w: number | string;
  h?: number;
}) {
  return <div className="m-skel-pill" style={{ width: w, height: h }} />;
}

export function Thumb() {
  return <div className="m-skel-thumb" />;
}

export function Stack({
  gap = "var(--space-2)",
  children,
  style,
}: {
  gap?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="m-skel-stack" style={{ gap, ...style }}>
      {children}
    </div>
  );
}
