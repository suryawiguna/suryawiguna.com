import {
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Page title — same .m-hero box the real page uses. */}
      <div className="m-hero m-hero-left">
        <Bar w={72} h="meta" />
        <Bar w="72%" h="title" />
        <Bar w="62%" h="title" />
        <Bar w="80%" />
        <Bar w="64%" />
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Pill w={160} h={CONTROL_H} />
          <Pill w={120} h={CONTROL_H} />
        </div>
      </div>

      {/* Image-led project grid */}
      <div className="m-portfolio-showcase">
        <div className="m-project-group m-section-lead">
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
                <Stack
                  gap="var(--space-3)"
                  style={{ padding: "var(--space-6)" }}
                >
                  <Bar w="55%" h="rowTitle" />
                  <Bar w="92%" />
                  <Bar w="72%" />
                  <div style={{ display: "flex", gap: "var(--space-2)" }}>
                    <Pill w={72} />
                    <Pill w={58} />
                  </div>
                </Stack>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
