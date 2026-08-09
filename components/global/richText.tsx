import {
  render,
  MARK_BOLD,
  MARK_CODE,
  NODE_CODEBLOCK,
  NODE_IMAGE,
  NODE_LI,
} from "storyblok-rich-text-react-renderer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import Image from "next/image";

// Storyblok asset paths embed intrinsic dimensions: /f/<space>/<W>x<H>/<hash>/name.ext
const STORYBLOK_ASSET = /^https:\/\/a\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\//;

// The renderer's default image resolver just spreads props onto a bare <img>,
// which shipped full-size originals with no dimensions and no lazy loading.
// Only a.storyblok.com is an allowed next/image host, and a handful of older
// imported posts point at wp.com / cloudinary / unsplash, so anything we can't
// measure and optimise falls back to a plain — but still lazy — <img>.
function ImageNode({ src, alt, title }: Record<string, string>) {
  const url = src?.startsWith("//") ? `https:${src}` : src;
  const dimensions = url?.match(STORYBLOK_ASSET);

  if (!dimensions || url.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt || ""} title={title} loading="lazy" decoding="async" />
    );
  }

  return (
    <Image
      src={url}
      alt={alt || ""}
      title={title}
      width={Number(dimensions[1])}
      height={Number(dimensions[2])}
      sizes="(min-width: 720px) 720px, 100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
}

export default function RichText({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-zinc prose-headings:font-normal prose-headings:mb-3 prose-headings:mt-7 prose-p:mb-3 prose-ul:my-3 w-full min-w-full ${
        className ? className : ""
      } `}
    >
      {render(data, {
        markResolvers: {
          [MARK_BOLD]: (children) => <strong>{children}</strong>,
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
          [NODE_LI]: (children) => <li className="not-prose">{children}</li>,
          [NODE_IMAGE]: (_children, props) => <ImageNode {...(props as any)} />,
        },
      })}
    </div>
  );
}
