import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        {/* Page title — same .m-hero box the real page uses. */}
        <div className="m-hero m-hero-left">
          <Bar w={72} h="meta" />
          <Stack gap="var(--space-3)" style={{ width: "100%" }}>
            <Bar w="60%" h="title" style={{ maxWidth: 560 }} />
            <Bar w="45%" h="title" style={{ maxWidth: 420 }} />
          </Stack>
          <div className="m-hero-foot">
            <Stack gap="var(--space-2)">
              <Bar w="95%" h="blockTitle" />
              <Bar w="90%" h="blockTitle" />
              <Bar w="40%" h="blockTitle" />
            </Stack>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Pill w={110} h={CONTROL_H} />
              <Pill w={125} h={CONTROL_H} />
            </div>
          </div>
        </div>

        {/* Image-led project grid */}
        <div>
          <div className="m-project-group">
            <div className="m-project-group-head">
              <Stack gap="var(--space-3)">
                <Bar w={96} h="meta" />
                <Bar w={220} h="heading" />
              </Stack>
              <Stack gap="var(--space-2)">
                <Bar w="100%" />
                <Bar w="82%" />
              </Stack>
            </div>
            <div className="m-project-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="m-project-link">
                  <div className="m-project-media m-skel-bar" />
                  <Stack gap="var(--space-2)">
                    <Bar w="55%" h="rowTitle" />
                    <Bar w="92%" />
                    <Bar w="72%" />
                    <Bar w={120} h="meta" />
                  </Stack>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
