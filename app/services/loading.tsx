import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/services/page.tsx: wide canvas, hero with lede and buttons side
// by side, the three numbered offer columns, then the first split section
// (sectors).
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div className="m-hero m-hero-left">
          <Stack gap="var(--space-3)" style={{ width: "100%" }}>
            <Bar w="60%" h="title" style={{ maxWidth: 560 }} />
            <Bar w="42%" h="title" style={{ maxWidth: 400 }} />
          </Stack>
          <div className="m-hero-foot">
            <Stack gap="var(--space-3)">
              <Bar w="95%" h="blockTitle" style={{ maxWidth: 460 }} />
              <Bar w="90%" h="blockTitle" style={{ maxWidth: 440 }} />
              <Bar w="45%" h="blockTitle" style={{ maxWidth: 220 }} />
            </Stack>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Pill w={110} h={CONTROL_H} />
              <Pill w={150} h={CONTROL_H} />
            </div>
          </div>
        </div>

        {/* What I build */}
        <div className="m-section">
          <Bar w={220} h="heading" style={{ marginBottom: "var(--space-6)" }} />
          <div className="m-offer-grid">
            {[1, 2, 3].map((i) => (
              <Stack key={i} gap="var(--space-2)">
                <Bar w={24} h="meta" />
                <Bar w="60%" h="blockTitle" />
                <Bar w="95%" />
                <Bar w="92%" />
                <Bar w="96%" />
                <Bar w="60%" />
              </Stack>
            ))}
          </div>
        </div>

        {/* Who I work with */}
        <div className="m-section m-split">
          <Bar w={200} h="heading" />
          <Stack gap="var(--space-6)">
            <Bar w="70%" />
            {[1, 2, 3].map((i) => (
              <Stack key={i} gap="var(--space-2)">
                <Bar w="40%" h="blockTitle" />
                <Bar w="80%" />
              </Stack>
            ))}
          </Stack>
        </div>
      </Skeleton>
    </div>
  );
}
