import { Bar, Pill, Skeleton, Stack } from "components/global/skeleton";

export default function Loading() {
  return (
    <Skeleton>
      {/* Breadcrumb */}
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

      {/* Article head */}
      <div className="m-article-head">
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          {[56, 68, 48].map((w, i) => (
            <Pill key={i} w={w} />
          ))}
        </div>
        <Bar w="85%" h="title" />
        <Bar w="65%" h="title" />
        <Bar w="90%" h="blockTitle" />
        <Bar w="70%" h="blockTitle" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          <Pill w={36} h={36} />
          <Stack gap="var(--space-1)">
            <Bar w={100} h="meta" />
            <Bar w={140} h="meta" />
          </Stack>
        </div>
      </div>

      {/* Cover */}
      <div
        className="m-skel-bar"
        style={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "var(--radius-md)",
          margin: "var(--space-8) 0",
        }}
      />

      {/* Article body */}
      <Stack
        gap="var(--space-5)"
        style={{ padding: "var(--space-6) 0 var(--space-10)" }}
      >
        {[
          "90%",
          "100%",
          "75%",
          "60%", // h2
          "95%",
          "85%",
          "100%",
          "70%",
          "55%", // h3
          "90%",
          "80%",
          "100%",
          "65%",
        ].map((w, i) => (
          <Bar key={i} w={w} h={i === 3 ? "heading" : i === 8 ? "rowTitle" : "text"} />
        ))}
      </Stack>
    </Skeleton>
  );
}
