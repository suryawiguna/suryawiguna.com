import {
  AVATAR,
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Hero / avatar */}
      <div className="m-hero">
        <Pill w={AVATAR} h={AVATAR} />
        <Bar w="55%" h="blockTitle" />
        <Bar w="40%" h="blockTitle" />
      </div>

      {/* Links */}
      <div className="m-section">
        <Bar w={180} h="heading" style={{ marginBottom: "var(--space-6)" }} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
          }}
        >
          {[72, 80, 60, 70, 66].map((w, i) => (
            <Pill key={i} w={w} />
          ))}
        </div>
        <Stack gap="var(--space-2)" style={{ marginTop: "var(--space-6)" }}>
          {[1, 2, 3, 4].map((i) => (
            <Pill key={i} w="100%" h={CONTROL_H} />
          ))}
        </Stack>
      </div>
    </Skeleton>
  );
}
