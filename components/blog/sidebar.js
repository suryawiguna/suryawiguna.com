"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InlineShareButtons } from "sharethis-reactjs";
import SubscribeForm from "./subscribe";

export default function Sidebar({ featuredPosts }) {
  const [showShare, setShowShare] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowShare(false);
    setTimeout(() => {
      setShowShare(true);
    }, 500);
  }, [router.asPath]);

  return (
    <div className="grid grid-cols md:grid-cols-2 gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold px-2 flex gap-2">Share this</h3>
        <div className="ml-2">
          {showShare ? (
            <InlineShareButtons
              config={{
                alignment: "left", // alignment of buttons (left, center, right)
                color: "social", // set the color of buttons (social, white)
                enabled: true, // show/hide buttons (true, false)
                font_size: 18, // font size for the buttons
                labels: "null", // button labels (cta, counts, null)
                language: "en", // which language to use (see LANGUAGES)
                networks: [
                  // which networks to include (see SHARING NETWORKS)
                  "linkedin",
                  "twitter",
                  "facebook",
                  "whatsapp",
                ],
                padding: 10, // padding within buttons (INTEGER)
                radius: 100, // the corner radius on each button (INTEGER)
                show_total: false,
                size: 40, // the size of each button (INTEGER)
                url: `https://suryawiguna.com${router.asPath}`,
              }}
            />
          ) : (
            <span>
              <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold mb-2">Subscribe</p>
        <SubscribeForm />
      </div>
    </div>
  );
}
