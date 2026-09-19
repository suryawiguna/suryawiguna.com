import Image from "next/image";
import Link from "next/link";
import type { Project } from "content/projects";

export default function WorkCard({ work }: { work: Project }) {
  return (
    <li className="m-work-item">
      <Link
        href={work.href}
        target="_blank"
        rel="noreferrer"
        className="m-work-row"
        aria-label={`View ${work.title} project (opens in a new tab)`}
      >
        {work.image && (
          <div className="m-work-img">
            <Image
              src={work.image.src}
              alt={work.image.alt || work.title}
              fill
              sizes="96px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className="m-work-body">
          <div className="m-work-link">
            <span className="m-work-title">{work.title}</span>
            <span className="m-work-meta">
              {work.categories.slice(0, 2).map((category) => (
                <span key={category} className="m-chip">
                  {category}
                </span>
              ))}
              <span className="m-work-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </div>
          <div className="m-work-blurb">
            <p>{work.description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
