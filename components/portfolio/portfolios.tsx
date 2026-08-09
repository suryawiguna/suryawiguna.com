import Link from "next/link";
import WorkCard from "./workCard";
import type { Project } from "content/projects";

// `heading` is only set on the home page, where the list is a section of a
// longer page; /portfolio renders its own <h1> and needs no "all projects" link.
export default function Portfolios({
  projects,
  heading,
}: {
  projects: Project[];
  heading?: string;
}) {
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
