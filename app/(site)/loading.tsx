const S = { background: "var(--line)", borderRadius: 4 } as const;
const pill = { ...S, borderRadius: 999 } as const;

function Bar({ w, h = 14 }: { w: number | string; h?: number }) {
  return (
    <div style={{ ...S, width: w, height: h, borderRadius: 4 }} />
  );
}

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" style={{ animation: "pulse 2s cubic-bezier(.4,0,.6,1) infinite" }}>

      {/* Hero */}
      <div className="m-hero" style={{ gap: "1rem" }}>
        <div style={{ ...pill, width: 76, height: 76, borderRadius: 999, marginBottom: 4 }} />
        <div style={{ ...S, width: "60%", height: 36, borderRadius: 6, maxWidth: 320 }} />
        <div style={{ ...S, width: "80%", height: 14, maxWidth: 400 }} />
        <div style={{ ...S, width: "65%", height: 14, maxWidth: 320 }} />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <div style={{ ...pill, width: 100, height: 38 }} />
          <div style={{ ...pill, width: 88, height: 38 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <div style={{ ...pill, width: 7, height: 7 }} />
          <Bar w={160} h={12} />
        </div>
      </div>

      {/* Portfolio */}
      <div className="m-section">
        <div style={{ ...S, width: 120, height: 22, borderRadius: 4, marginBottom: "1.4rem" }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ padding: "1.2rem 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Bar w="45%" h={18} />
              <div style={{ ...pill, width: 64, height: 22 }} />
            </div>
            <Bar w="75%" h={13} />
          </div>
        ))}
      </div>

      {/* Experience + Education */}
      <div className="m-section">
        <div className="m-cols">
          {[0, 1].map((col) => (
            <div key={col}>
              <Bar w={100} h={22} />
              <div style={{ marginTop: "1.4rem", display: "flex", flexDirection: "column", gap: 16 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <Bar w="80%" h={14} />
                    <div style={{ marginTop: 4 }}>
                      <Bar w="50%" h={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Skills */}
        <div style={{ marginTop: "2.2rem" }}>
          <Bar w={60} h={22} />
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: "1.4rem" }}>
            {[80, 70, 90, 60, 75, 65, 85, 70].map((w, i) => (
              <div key={i} style={{ ...pill, width: w, height: 28 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Blog posts */}
      <div className="m-section">
        <Bar w={160} h={22} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.85rem 0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <Bar w="60%" h={14} />
            <Bar w={80} h={12} />
          </div>
        ))}
      </div>
    </div>
  );
}
