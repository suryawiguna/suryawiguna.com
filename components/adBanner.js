import React, { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      class="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8562944824984533"
      data-ad-slot="5983640257"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdBanner;
