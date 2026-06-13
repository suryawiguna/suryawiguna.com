const S = { background: "var(--line)", borderRadius: 4 } as const;
const pill = { ...S, borderRadius: 999 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return <div style={{ ...S, width: w, height: h }} />;
}

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, padding: "1.6rem 0 0" }}>
        <Bar w={32} h={12} />
        <Bar w={8} h={12} />
        <Bar w={60} h={12} />
      </div>

      {/* Article head */}
      <div style={{ padding: "2rem 0 2.4rem", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column" as const, gap: 16 }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 6 }}>
          {[56, 68, 48].map((w, i) => (
            <div key={i} style={{ ...pill, width: w, height: 24 }} />
          ))}
        </div>
        {/* Title */}
        <div style={{ ...S, width: "85%", height: 42, borderRadius: 6 }} />
        <div style={{ ...S, width: "65%", height: 42, borderRadius: 6 }} />
        {/* Dek */}
        <Bar w="90%" h={15} />
        <Bar w="70%" h={15} />
        {/* Byline */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <div style={{ ...pill, width: 36, height: 36 }} />
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
            <Bar w={100} h={13} />
            <Bar w={140} h={11} />
          </div>
        </div>
      </div>

      {/* Cover */}
      <div style={{ ...S, width: "100%", aspectRatio: "16/9", borderRadius: 6, margin: "2rem 0" }} />

      {/* Article body */}
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, padding: "1.5rem 0 2.5rem" }}>
        {[
          "90%", "100%", "75%",
          "60%", // h2
          "95%", "85%", "100%", "70%",
          "55%", // h3
          "90%", "80%", "100%", "65%",
        ].map((w, i) => (
          <Bar key={i} w={w} h={i === 3 || i === 8 ? 20 : 14} />
        ))}
      </div>
    </div>
  );
}
