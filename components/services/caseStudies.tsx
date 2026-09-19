import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "content/services";
import { visibleProjects } from "content/projects";

// The live URL and category come from content/projects.ts rather than being
// copied into content/services.ts, so a project that changes href or gets
// hidden only has to be edited in one place.
function findProject(title: string) {
  return visibleProjects.find((project) => project.title === title);
}

export default function CaseStudies({
  heading,
  items,
  more,
  cta,
}: {
  heading: string;
  items: CaseStudy[];
  more?: { href: string; label: string };
  cta?: { href: string; label: string };
}) {
  return (
    <section id="case-studies" className="m-section">
      <h2 className="m-h2">{heading}</h2>
      <div className="m-case-list">
        {items.map((study) => {
          const project = findProject(study.projectTitle);

          return (
            <article key={study.projectTitle} className="m-case">
              {project?.image && (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="m-case-media"
                  aria-label={`View ${study.projectTitle} project (opens in a new tab)`}
                >
                  <Image
                    src={project.image.src}
                    alt={project.image.alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              )}

              <div className="m-case-content">
                <div className="m-case-head">
                  <h3 className="m-case-title">{study.projectTitle}</h3>
                  {project?.categories.slice(0, 2).map((category) => (
                    <span key={category} className="m-chip">
                      {category}
                    </span>
                  ))}
                </div>

                <dl className="m-case-body">
                  <dt className="m-case-label">The problem</dt>
                  <dd className="m-case-text">{study.problem}</dd>
                  <dt className="m-case-label">What I built</dt>
                  <dd className="m-case-text">{study.built}</dd>
                  <dt className="m-case-label">Where it landed</dt>
                  <dd className="m-case-text">{study.result}</dd>
                </dl>

                {project && (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="m-case-link"
                  >
                    Visit {study.projectTitle} ↗
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {(more || cta) && (
        <div className="m-section-actions">
          {cta && (
            <Link href={cta.href} className="m-btn primary">
              {cta.label}
            </Link>
          )}
          {more && (
            <Link href={more.href} className="m-btn ghost">
              {more.label}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
