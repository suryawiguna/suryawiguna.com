import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/(home)/page.tsx: wide canvas, left masthead and display
// headline, 2×2 project grid, three offer columns, then the split sections.
// The real classes (.m-section-head, .m-fact, .m-post) carry the layout, so
// the placeholders reflow at the same breakpoints the page does.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        {/* Hero */}
        <div className="m-hero m-hero-left m-home-hero">
          <div className="m-masthead">
            <Pill w={44} h={44} />
            <Stack gap="var(--space-2)">
              <Bar w={120} />
              <Bar w={180} h="meta" />
            </Stack>
          </div>
          <Stack gap="var(--space-3)" style={{ width: "100%" }}>
            <Bar w="72%" h="display" style={{ maxWidth: 720 }} />
            <Bar w="64%" h="display" style={{ maxWidth: 640 }} />
            <Bar w="40%" h="display" style={{ maxWidth: 400 }} />
          </Stack>
          <div className="m-hero-foot">
            <Stack gap="var(--space-3)">
              <Bar w="90%" h="blockTitle" style={{ maxWidth: 460 }} />
              <Bar w="55%" h="blockTitle" style={{ maxWidth: 280 }} />
            </Stack>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Pill w={125} h={CONTROL_H} />
              <Pill w={110} h={CONTROL_H} />
            </div>
          </div>
        </div>

        {/* Client work */}
        <div className="m-section">
          <div className="m-section-head">
            <Bar w={200} h="heading" />
            <Bar w={90} h="meta" />
          </div>
          <div className="m-project-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="m-project-link">
                <div className="m-project-media m-skel-bar" />
                <Stack gap="var(--space-2)">
                  <Bar w="55%" h="rowTitle" />
                  <Bar w="90%" />
                  <Bar w={120} h="meta" />
                </Stack>
              </div>
            ))}
          </div>
        </div>

        {/* What I do */}
        <div className="m-section">
          <div className="m-section-head">
            <Bar w={160} h="heading" />
            <Bar w={100} h="meta" />
          </div>
          <div className="m-offer-grid">
            {[1, 2, 3].map((i) => (
              <Stack key={i} gap="var(--space-2)">
                <Bar w={24} h="meta" />
                <Bar w="60%" h="blockTitle" />
                <Bar w="95%" />
                <Bar w="70%" />
                <Bar w={96} h="meta" />
              </Stack>
            ))}
          </div>
        </div>

        {/* Background: Experience (3), Education (1), Tools (one line) */}
        <div className="m-section m-split">
          <Bar w={180} h="heading" />
          <div className="m-facts">
            {[3, 1].map((rows, g) => (
              <Stack key={g} gap="var(--space-3)">
                <Bar w={80} h="meta" />
                {Array.from({ length: rows }, (_, i) => (
                  <div key={i} className="m-fact">
                    <Bar w={84} h="meta" />
                    <Bar w="60%" />
                  </div>
                ))}
              </Stack>
            ))}
            <Stack gap="var(--space-3)">
              <Bar w={48} h="meta" />
              <Bar w="70%" />
            </Stack>
          </div>
        </div>

        {/* Latest writing */}
        <div className="m-section m-split">
          <Bar w={200} h="heading" />
          <div>
            <div className="m-posts">
              {[1, 2, 3].map((i) => (
                <div key={i} className="m-post">
                  <Bar w={96} h="meta" />
                  <Bar w="75%" h="blockTitle" />
                </div>
              ))}
            </div>
            <Bar w={80} h="meta" style={{ marginTop: "var(--space-6)" }} />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
