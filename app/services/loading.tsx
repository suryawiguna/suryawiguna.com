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
      {/* Hero — left aligned, like the real one. */}
      <div className="m-hero m-hero-left">
        <Bar w="70%" h="title" />
        <Bar w="50%" h="title" />
        <Bar w="60%" />
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Pill w={145} h={CONTROL_H} />
          <Pill w={150} h={CONTROL_H} />
        </div>
      </div>

      {/* Offer blocks, inside the tinted panel the real page renders. */}
      <div className="m-section m-section-panel">
        <Bar w={220} h="heading" style={{ marginBottom: "var(--space-6)" }} />
        <Stack gap="var(--space-8)">
          {[1, 2, 3].map((i) => (
            <Stack key={i} gap="var(--space-3)">
              <Bar w="38%" h="blockTitle" />
              <Bar w="92%" />
              <Bar w="80%" />
            </Stack>
          ))}
        </Stack>
      </div>
    </Skeleton>
  );
}
