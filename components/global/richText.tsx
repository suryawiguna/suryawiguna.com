import {
  render,
  MARK_BOLD,
  MARK_CODE,
  NODE_CODEBLOCK,
  NODE_LI,
} from "storyblok-rich-text-react-renderer";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

// Storyblok rich-text JSON -> React.
function renderStoryblok(data: any) {
  return render(data, {
    markResolvers: {
      [MARK_BOLD]: (children) => <strong>{children}</strong>,
      [MARK_CODE]: (children) => <code>{children}</code>,
    },
    nodeResolvers: {
      [NODE_CODEBLOCK]: (children, { ...props }) => (
        <SyntaxHighlighter
          style={oneDark}
          language={props.class?.split("-")[1]}
          showLineNumbers
        >
          {children}
        </SyntaxHighlighter>
      ),
      [NODE_LI]: (children) => <li className="not-prose">{children}</li>,
    },
  });
}

// Sanity Portable Text -> React. Mirrors the Storyblok resolvers above.
const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }) => (
      <SyntaxHighlighter
        style={oneDark}
        language={value?.language || "text"}
        showLineNumbers
      >
        {value?.code || ""}
      </SyntaxHighlighter>
    ),
  },
  marks: {
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="not-prose">{children}</li>,
    number: ({ children }) => <li className="not-prose">{children}</li>,
  },
};

export default function RichText({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  // Sanity returns Portable Text as an array; Storyblok returns a `{type:"doc"}` object.
  const content = Array.isArray(data) ? (
    <PortableText value={data} components={portableTextComponents} />
  ) : (
    renderStoryblok(data)
  );

  return (
    <div
      className={`prose prose-zinc prose-headings:font-normal prose-headings:mb-3 prose-headings:mt-7 prose-p:mb-3 prose-ul:my-3 w-full min-w-full ${
        className ? className : ""
      } `}
    >
      {content}
    </div>
  );
}
