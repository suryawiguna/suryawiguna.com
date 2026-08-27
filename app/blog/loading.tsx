import { Bar, CONTROL_SM_H, Pill, Skeleton, Stack, Thumb } from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Blog head — the same .m-hero the real page uses. */}
      <div className="m-hero m-hero-left">
        <Bar w={40} h="meta" />
        <Bar w="55%" h="title" />
        <Bar w="80%" />
        <Bar w="65%" />
      </div>

      {/* Toolbar */}
      <div className="m-toolbar">
        <Pill w="100%" h={CONTROL_SM_H} />
        <Pill w={110} h={CONTROL_SM_H} />
      </div>

      {/* Post rows */}
      <div className="m-blog-list">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="m-skel-line">
            <div style={{ display: "flex", gap: "var(--space-5)" }}>
              <Thumb />
              <Stack gap="var(--space-2)" style={{ flex: 1, minWidth: 0 }}>
                <Bar w={110} h="meta" />
                <Bar w="70%" h="rowTitle" />
                <Bar w="85%" />
                <Bar w="60%" />
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  {[60, 50, 70].map((w, j) => (
                    <Pill key={j} w={w} />
                  ))}
                </div>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </Skeleton>
  );
}
