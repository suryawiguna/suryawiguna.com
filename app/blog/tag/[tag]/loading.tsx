import { Bar, Skeleton, Stack } from "components/global/skeleton";

// Mirrors app/blog/tag/[tag]/page.tsx: breadcrumb, a tight hero, then the
// same card grid as /blog without its toolbar.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            padding: "var(--space-6) 0 0",
          }}
        >
          <Bar w={32} h="meta" />
          <Bar w={8} h="meta" />
          <Bar w={60} h="meta" />
        </div>

        <div className="m-hero m-hero-left m-hero-tight">
          <Bar w={48} h="meta" />
          <Bar w="30%" h="title" />
          <Bar w={180} h="blockTitle" />
        </div>

        <div className="m-blog-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="m-bp">
              <div className="m-bp-media m-skel-bar" />
              <Stack gap="var(--space-2)">
                <Bar w={140} h="meta" />
                <Bar w="85%" h="rowTitle" />
                <Bar w="95%" />
                <Bar w="90%" />
                <Bar w="60%" />
              </Stack>
            </div>
          ))}
        </div>
      </Skeleton>
    </div>
  );
}
