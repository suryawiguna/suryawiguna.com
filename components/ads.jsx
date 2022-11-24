import { useEffect } from "react";

export function GoogleAdsenseContainer() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div style={{ textAlign: "left", overflow: "hidden" }}>
      <span className="text-xs">Advertisment</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8562944824984533"
        data-ad-slot="5983640257"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
