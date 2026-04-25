const S = { background: "var(--line)", borderRadius: 4 } as const;
const pill = { ...S, borderRadius: 999 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return <div style={{ ...S, width: w, height: h }} />;
}

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}>
      {/* Hero / avatar */}
      <div className="m-hero">
        <div style={{ ...pill, width: 76, height: 76, marginBottom: 4 }} />
        <Bar w="55%" h={15} />
        <Bar w="40%" h={15} />
      </div>

      {/* Links section */}
      <div className="m-section">
        <Bar w={180} h={22} />
        {/* Social chip row */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, margin: "1.4rem 0 1.2rem" }}>
          {[72, 80, 60, 70, 66].map((w, i) => (
            <div key={i} style={{ ...pill, width: w, height: 30 }} />
          ))}
        </div>
        {/* Primary link buttons */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ ...S, width: "100%", height: 44, borderRadius: 999 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
