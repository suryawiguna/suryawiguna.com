const S = { background: "var(--line)", borderRadius: 4 } as const;
const pill = { ...S, borderRadius: 999 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return <div style={{ ...S, width: w, height: h }} />;
}

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}>

      {/* Blog head */}
      <div className="m-blog-head">
        <Bar w={40} h={11} />
        <div style={{ ...S, width: "55%", height: 36, borderRadius: 6, margin: "0.7rem 0" }} />
        <Bar w="80%" h={14} />
        <Bar w="65%" h={14} />

        {/* Tag row */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: "1.6rem" }}>
          {[44, 36, 60, 72, 56, 40, 44, 36].map((w, i) => (
            <div key={i} style={{ ...pill, width: w, height: 30 }} />
          ))}
        </div>
      </div>

      {/* Post cards */}
      <div style={{ display: "flex", flexDirection: "column" as const, padding: "0.5rem 0 1.5rem" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column" as const, gap: 10, padding: "1.6rem 0", borderBottom: "1px solid var(--line)" }}>
            <Bar w={100} h={12} />
            <div style={{ ...S, width: "70%", height: 22, borderRadius: 4 }} />
            <Bar w="85%" h={13} />
            <Bar w="60%" h={13} />
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              {[60, 50, 70].map((w, j) => (
                <div key={j} style={{ ...pill, width: w, height: 24 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
