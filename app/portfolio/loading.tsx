import { Bar, Pill, Skeleton, Stack, Thumb } from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Page title — same .m-hero box the real page uses. */}
      <div className="m-hero m-hero-left">
        <Bar w={260} h="title" />
      </div>

      {/* Work rows */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="m-skel-line">
          <div style={{ display: "flex", gap: "var(--space-5)" }}>
            <Thumb />
            <Stack gap="var(--space-2)" style={{ flex: 1, minWidth: 0 }}>
              <div className="m-skel-split">
                <Bar w="42%" h="rowTitle" />
                <Pill w={68} />
              </div>
              <Bar w="72%" />
            </Stack>
          </div>
        </div>
      ))}
    </Skeleton>
  );
}
