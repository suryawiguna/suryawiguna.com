"use client";

import { RichText } from "components/global";
import Link from "next/link";

export default function WorkCard({ work }: { work: any }) {
  return (
    <li className="m-work-item">
      <Link
        href={work.link.url}
        target="_blank"
        className="m-work-row"
      >
        <div className="m-work-body">
          <div className="m-work-link">
            <span className="m-work-title">{work.title}</span>
            <span className="m-work-meta">
              {work.category?.[0] && (
                <span className="m-chip">{work.category[0]}</span>
              )}
            </span>
          </div>
          <RichText
            data={work.description}
            className="m-work-blurb"
          />
        </div>
      </Link>
    </li>
  );
}
