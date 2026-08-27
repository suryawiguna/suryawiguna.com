import {
  AVATAR,
  Bar,
  CONTROL_H,
  Pill,
  Skeleton,
  Stack,
  Thumb,
} from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Hero */}
      <div className="m-hero">
        <Pill w={AVATAR} h={AVATAR} />
        <Bar w="60%" h="title" style={{ maxWidth: 320 }} />
        <Bar w="80%" style={{ maxWidth: 400 }} />
        <Bar w="65%" style={{ maxWidth: 320 }} />
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Pill w={210} h={CONTROL_H} />
          <Pill w={110} h={CONTROL_H} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <Pill w={7} h={7} />
          <Bar w={160} h="meta" />
        </div>
      </div>

      {/* Recent works */}
      <div className="m-section">
        <Bar w={200} h="heading" style={{ marginBottom: "var(--space-6)" }} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="m-skel-line">
            <div style={{ display: "flex", gap: "var(--space-5)" }}>
              <Thumb />
              <Stack gap="var(--space-2)" style={{ flex: 1, minWidth: 0 }}>
                <div className="m-skel-split">
                  <Bar w="45%" h="rowTitle" />
                  <Pill w={64} />
                </div>
                <Bar w="75%" />
              </Stack>
            </div>
          </div>
        ))}
      </div>

      {/* Experience + education */}
      <div className="m-section">
        <div className="m-cols">
          {[0, 1].map((col) => (
            <div key={col}>
              <Bar
                w={140}
                h="heading"
                style={{ marginBottom: "var(--space-6)" }}
              />
              <Stack gap="var(--space-4)">
                {[1, 2, 3].map((i) => (
                  <Stack key={i} gap="var(--space-1)">
                    <Bar w="80%" />
                    <Bar w="50%" h="meta" />
                  </Stack>
                ))}
              </Stack>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ marginTop: "var(--space-8)" }}>
          <Bar w={100} h="heading" style={{ marginBottom: "var(--space-6)" }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
            }}
          >
            {[80, 70, 90, 60, 75, 65, 85, 70].map((w, i) => (
              <Pill key={i} w={w} />
            ))}
          </div>
        </div>
      </div>

      {/* Blog posts */}
      <div className="m-section">
        <Bar w={220} h="heading" style={{ marginBottom: "var(--space-6)" }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="m-skel-split"
            style={{
              padding: "var(--space-3) 0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <Bar w="60%" />
            <Bar w={80} h="meta" />
          </div>
        ))}
      </div>
    </Skeleton>
  );
}
