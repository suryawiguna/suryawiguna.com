import {
  AVATAR,
  Bar,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/link/page.tsx: masthead, profile chips, then the grouped links.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div className="m-hero m-hero-left m-home-hero">
          <div className="m-profile">
            <div style={{ gridArea: "avatar" }}>
              <Pill w={AVATAR} h={AVATAR} />
            </div>
            <Bar w={200} h="heading" style={{ gridArea: "name" }} />
            <Bar w="60%" h="blockTitle" style={{ gridArea: "bio" }} />
          </div>
        </div>

        <div className="m-section m-split">
          <Bar w={120} h="heading" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
            }}
          >
            {[56, 72, 70, 72, 58].map((w, i) => (
              <Pill key={i} w={w} />
            ))}
          </div>
        </div>

        <div className="m-section m-split">
          <Bar w={100} h="heading" />
          <Stack gap="var(--space-8)">
            {[3, 2, 2].map((rows, g) => (
              <Stack key={g} gap="var(--space-5)">
                <Bar w={80} h="meta" />
                {Array.from({ length: rows }, (_, i) => (
                  <Bar key={i} w="70%" h="blockTitle" />
                ))}
              </Stack>
            ))}
          </Stack>
        </div>
      </Skeleton>
    </div>
  );
}
