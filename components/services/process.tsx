import Link from "next/link";
import type { Step } from "content/services";

export default function Process({
  heading,
  timeline,
  steps,
  more,
}: {
  heading: string;
  timeline: string;
  steps: Step[];
  more?: { href: string; label: string };
}) {
  return (
    <section id="process" className="m-section">
      <h2 className="m-h2">{heading}</h2>
      <ol className="m-steps">
        {steps.map((step, index) => (
          <li key={step.title} className="m-step">
            <span className="m-step-num" aria-hidden="true">
              {index + 1}
            </span>
            <span className="m-step-body">
              <span className="m-step-title">{step.title}</span>
              <span className="m-step-line">{step.line}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="m-timeline">{timeline}</p>
      {more && (
        <Link href={more.href} className="m-more">
          {more.label}
        </Link>
      )}
    </section>
  );
}
