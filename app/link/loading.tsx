import { Bar, Pill, Skeleton, Stack } from "components/global/skeleton";

// Mirrors app/link/page.tsx: masthead, then the split link list.
export default function Loading() {
  return (
    <div className="m-page-wide">
      <Skeleton>
        <div className="m-hero m-hero-left m-home-hero">
          <div className="m-masthead">
            <Pill w={44} h={44} />
            <Bar w={120} />
          </div>
          <Bar w="50%" h="blockTitle" />
        </div>

        <div className="m-section m-split">
          <Bar w={100} h="heading" />
          <Stack gap="var(--space-6)">
            {[1, 2, 3, 4, 5].map((i) => (
              <Bar key={i} w="70%" h="blockTitle" />
            ))}
          </Stack>
        </div>
      </Skeleton>
    </div>
  );
}
