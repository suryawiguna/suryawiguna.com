import {
  render,
  MARK_BOLD,
  NODE_HEADING,
  MARK_CODE,
} from "storyblok-rich-text-react-renderer";

export default function RichText({ data, className }) {
  return (
    <div className={`prose ${className}`}>
      {render(data, {
        markResolvers: {
          [MARK_BOLD]: (children) => <strong>{children}</strong>,
          [NODE_HEADING]: (children) => <h1>{children}</h1>,
          [MARK_CODE]: (children) => <code>{children}</code>,
        },
      })}
    </div>
  );
}
