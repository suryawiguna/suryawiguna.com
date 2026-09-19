import Link from "next/link";
import WorkCard from "./workCard";
import ProjectCard from "./projectCard";
import type { Project } from "content/projects";

// `heading` is only set on the home page, where the list is a section of a
// longer page; /portfolio renders its own <h1> and needs no "all projects" link.
export default function Portfolios({
  projects,
  heading,
  showcase = false,
}: {
  projects: Project[];
  heading?: string;
  showcase?: boolean;
}) {
  if (showcase) {
    const clientProjects = projects.filter((project) => project.kind === "client");
    const conceptProjects = projects.filter((project) => project.kind === "concept");

    return (
      <div className="m-portfolio-showcase">
        <section id="client-work" className="m-project-group m-section-lead">
          <div className="m-project-group-head">
            <div>
              <p className="m-eyebrow">Selected work</p>
              <h2 className="m-h2">Client projects</h2>
            </div>
            <p className="m-project-group-intro">
              Websites and storefronts designed around a real business goal,
              then built for the team that has to use them.
            </p>
          </div>
          <ul className="m-project-grid">
            {clientProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
        </section>

        {conceptProjects.length > 0 && (
          <section className="m-project-group">
            <div className="m-project-group-head">
              <div>
                <p className="m-eyebrow">Explorations</p>
                <h2 className="m-h2">Design concepts</h2>
              </div>
              <p className="m-project-group-intro">
                Interface studies where I explore layout, visual direction,
                and product ideas without a client brief.
              </p>
            </div>
            <ul className="m-project-grid">
              {conceptProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return (
    <section id="portfolio" className={heading ? "m-section" : ""}>
      {heading && <h2 className="m-h2">{heading}</h2>}
      <ul className="m-work-list">
        {projects.map((project) => (
          <WorkCard key={project.title} work={project} />
        ))}
      </ul>
      {heading && (
        <Link href="/portfolio" className="m-more">
          All projects →
        </Link>
      )}
    </section>
  );
}
