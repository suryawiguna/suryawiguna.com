import type { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import type { ImageSizes } from "lib/posts";

// Renders a post body. No `prose` classes: article typography is .m-article in
// styles/v3-blog-post.css, and layering @tailwindcss/typography over it meant
// two systems setting the same sizes, margins and colours.
export default function Markdown({
  source,
  images = {},
  className,
}: {
  source: string;
  // From getImageSizes(); an image missing here has no known dimensions.
  images?: ImageSizes;
  className?: string;
}) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
            if (/^https?:\/\//.test(href)) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <a href={href}>{children}</a>;
          },

          img: ({ src = "", alt = "", title }) => {
            const size = images[src];
            if (!size) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} title={title} loading="lazy" decoding="async" />
              );
            }
            return (
              <Image
                src={src}
                alt={alt}
                title={title}
                width={size.width}
                height={size.height}
                sizes="(min-width: 720px) 720px, 100vw"
                style={{ width: "100%", height: "auto" }}
              />
            );
          },

          // A fenced block arrives as <pre><code class="language-x">.
          pre: ({ children }) => {
            const code = children as ReactElement<{
              className?: string;
              children?: string;
            }>;
            const language = /language-(\S+)/.exec(code?.props?.className || "")?.[1];
            return (
              <SyntaxHighlighter style={oneDark} language={language} showLineNumbers>
                {String(code?.props?.children ?? "").replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
