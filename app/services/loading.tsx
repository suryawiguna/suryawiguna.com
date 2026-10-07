import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/services/page.tsx: wide canvas, hero with lede and buttons side
// by side, then the three numbered offer columns.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div className="m-hero m-hero-left">
          <Bar w="60%" h="title" />
          <Bar w="42%" h="title" />
          <div className="m-hero-foot">
            <Stack gap="var(--space-2)">
              <Bar w="90%" />
              <Bar w="70%" />
            </Stack>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Pill w={145} h={CONTROL_H} />
              <Pill w={150} h={CONTROL_H} />
            </div>
          </div>
        </div>

        <div className="m-section">
          <Bar w={220} h="heading" style={{ marginBottom: "var(--space-6)" }} />
          <div className="m-offer-grid">
            {[1, 2, 3].map((i) => (
              <Stack key={i} gap="var(--space-2)">
                <Bar w={24} h="meta" />
                <Bar w="60%" h="blockTitle" />
                <Bar w="95%" />
                <Bar w="90%" />
                <Bar w="70%" />
              </Stack>
            ))}
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
