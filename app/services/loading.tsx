const S = { background: "var(--line)", borderRadius: 4 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return <div style={{ ...S, width: w, height: h }} />;
}

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}
    >
      {/* Hero */}
      <div
        style={{
          padding: "4rem 0 3.5rem",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ ...S, width: "70%", height: 34, borderRadius: 6 }} />
        <div style={{ ...S, width: "50%", height: 34, borderRadius: 6 }} />
        <Bar w="60%" h={13} />
      </div>

      {/* Offer blocks */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            padding: "1.6rem 0",
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column" as const,
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Bar w="38%" h={20} />
            <Bar w={64} h={14} />
          </div>
          <Bar w="92%" h={13} />
          <Bar w="80%" h={13} />
        </div>
      ))}
    </div>
  );
}
