"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SubscribeForm from "./subscribe";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  XIcon,
  FacebookIcon,
} from "react-share";

export default function Sidebar() {
  const [fullUrl, setFullUrl] = useState("");
  const router = usePathname();

  useEffect(() => {
    setFullUrl("https://suryawiguna.com" + router);
  }, [router]);

  return (
    <div className="grid grid-cols md:grid-cols-2 gap-10">
      <div>
        <h5 className="mb-4 text-xl">Share this</h5>
        <div className="flex gap-2">
          <TwitterShareButton url={fullUrl}>
            <XIcon size={48} iconFillColor="#fff" borderRadius={100} />
          </TwitterShareButton>
          <LinkedinShareButton url={fullUrl}>
            <LinkedinIcon size={48} iconFillColor="#fff" borderRadius={100} />
          </LinkedinShareButton>
          <FacebookShareButton url={fullUrl} hashtag="#react">
            <FacebookIcon size={48} iconFillColor="#fff" borderRadius={100} />
          </FacebookShareButton>
        </div>
      </div>
      <div>
        <h5 className="mb-4 text-xl">Subscribe</h5>
        <SubscribeForm />
      </div>
    </div>
  );
}
