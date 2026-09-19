import Image from "next/image";
import Link from "next/link";
import type { Project } from "content/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="m-project-card">
      <Link
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="m-project-link"
        aria-label={`View ${project.title} project (opens in a new tab)`}
      >
        {project.image && (
          <div className="m-project-media">
            <Image
              src={project.image.src}
              alt={project.image.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        <div className="m-project-body">
          <div className="m-project-heading">
            <h3 className="m-project-title">{project.title}</h3>
            <span className="m-project-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <p className="m-project-description">{project.description}</p>
          <div className="m-project-tags" aria-hidden="true">
            {project.categories.map((category) => (
              <span key={category} className="m-chip">
                {category}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
}
