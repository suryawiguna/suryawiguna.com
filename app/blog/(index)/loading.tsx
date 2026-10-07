import {
  Bar,
  CONTROL_SM_H,
  Pill,
  Skeleton,
  Stack,
} from "components/global/skeleton";

// Mirrors app/blog/(index)/page.tsx: wide canvas, hero, toolbar, 3-column card grid.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div className="m-hero m-hero-left">
          <Bar w={40} h="meta" />
          <Bar w="40%" h="title" />
          <Bar w="55%" h="blockTitle" />
        </div>

        <div className="m-toolbar">
          <Pill w={352} h={CONTROL_SM_H} />
          <Pill w={110} h={CONTROL_SM_H} />
        </div>

        <div className="m-blog-list">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
