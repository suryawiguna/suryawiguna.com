import {
  render,
  MARK_BOLD,
  NODE_HEADING,
  MARK_CODE,
  NODE_CODEBLOCK,
} from "storyblok-rich-text-react-renderer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

export default function RichText({ data, className = null }) {
  return (
    <div
      className={`prose prose-zinc dark:prose-invert w-full min-w-full ${
        className ? className : ""
      } `}
    >
      {render(data, {
        markResolvers: {
          [MARK_BOLD]: (children) => <strong>{children}</strong>,
          [NODE_HEADING]: (children) => <h1>{children}</h1>,
          [MARK_CODE]: (children) => <code>{children}</code>,
        },
        nodeResolvers: {
          [NODE_CODEBLOCK]: (children, { ...props }) => (
            <SyntaxHighlighter
              style={oneDark}
              language={props.class.split("-")[1]}
              showLineNumbers
            >
              {children}
            </SyntaxHighlighter>
          ),
        },
      })}
    </div>
  );
}
