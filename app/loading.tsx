import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/page.tsx: wide canvas, left masthead, 2×2 project grid, three
// offer columns, then the split sections.
const SPLIT = "m-section m-split";

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
            <Bar w="70%" h="title" style={{ maxWidth: 640 }} />
            <Bar w="58%" h="title" style={{ maxWidth: 520 }} />
          </Stack>
          <div className="m-hero-foot">
            <Bar w="80%" style={{ maxWidth: 440 }} />
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Pill w={125} h={CONTROL_H} />
              <Pill w={145} h={CONTROL_H} />
            </div>
          </div>
        </div>

        {/* Recent work */}
        <div className="m-section">
          <Bar w={200} h="heading" style={{ marginBottom: "var(--space-8)" }} />
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
          <Bar w={160} h="heading" style={{ marginBottom: "var(--space-8)" }} />
          <div className="m-offer-grid">
            {[1, 2, 3].map((i) => (
              <Stack key={i} gap="var(--space-2)">
                <Bar w={24} h="meta" />
                <Bar w="60%" h="blockTitle" />
                <Bar w="95%" />
                <Bar w="70%" />
              </Stack>
            ))}
          </div>
        </div>

        {/* Background + latest writing */}
        {[4, 3].map((rows, s) => (
          <div key={s} className={SPLIT}>
            <Bar w={180} h="heading" />
            <Stack gap="var(--space-3)">
              {Array.from({ length: rows }, (_, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--space-4)" }}>
                  <Bar w={96} h="meta" />
                  <Bar w="55%" />
                </div>
              ))}
            </Stack>
          </div>
        ))}
      </Skeleton>
    </div>
  );
}
