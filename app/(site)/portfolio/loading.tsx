const S = { background: "var(--line)", borderRadius: 4 } as const;
const pill = { ...S, borderRadius: 999 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return <div style={{ ...S, width: w, height: h }} />;
}

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}>
      {/* Page title */}
      <div style={{ padding: "2.6rem 0 0", marginBottom: "1.4rem" }}>
        <div style={{ ...S, width: 200, height: 36, borderRadius: 6 }} />
      </div>

      {/* Work list rows */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          style={{
            padding: "1.2rem 0",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column" as const,
            gap: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Bar w="42%" h={18} />
            <div style={{ ...pill, width: 68, height: 22 }} />
          </div>
          <Bar w="72%" h={13} />
        </div>
      ))}
    </div>
  );
}
