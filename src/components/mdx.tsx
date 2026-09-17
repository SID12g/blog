import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import remarkGfm from "remark-gfm";

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  const caption = props.title || props.alt;
  return (
    <figure className="my-4">
      <div className="flex justify-center">
        <Image alt={props.alt} className="rounded-xl" {...props} />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MdxImage(props) {
  const caption = props.title || props.alt;
  // Use span wrappers to remain valid inside <p> that markdown often creates around images
  return (
    <span className="block my-4">
      <span className="flex justify-center block">
        <img alt={props.alt} className="rounded-xl m-0" {...props} />
      </span>
      {caption ? (
        <span className="mt-2 block text-center text-sm text-muted">
          {caption}
        </span>
      ) : null}
    </span>
  );
}

function Code({ children, ...props }) {
  // Check if this is inline code (no className) or code block (has className)
  const isInlineCode = !props.className;

  if (isInlineCode) {
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-muted-15 text-primary text-[0.875em] font-jetbrains-mono font-medium"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Code block - use syntax highlighting
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function extractFilename(metastring?: string): string | undefined {
  if (!metastring) return undefined;
  const namedMatch = metastring.match(
    /(?:^|\s)(?:title|file|filename|name)="([^"]+)"/
  );
  if (namedMatch && namedMatch[1]) return namedMatch[1];
  const bareMatch = metastring.trim().match(/([\w@./-]+\.[\w]+)(?:\s|$)/);
  if (bareMatch && bareMatch[1]) return bareMatch[1];
  return undefined;
}

function languageFromClassName(className?: string): string | undefined {
  if (!className) return undefined;
  const m = className.match(/language-([\w+-]+)/);
  return m ? m[1] : undefined;
}

function Pre(props) {
  const child = props.children as any;
  if (child && typeof child === "object" && "props" in child) {
    const { className, children, metastring } = child.props || {};
    const filename = extractFilename(metastring);
    const language = languageFromClassName(className);
    const code =
      typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children.join("")
        : "";
    const codeHTML = highlight(code);

    return (
      <div className="my-5 overflow-hidden rounded-xl border border-surface-border">
        {filename ? (
          <div className="flex items-center justify-between px-4 py-2.5 text-xs bg-muted-5 border-b border-surface-border">
            <span className="font-medium text-muted font-jetbrains-mono truncate">
              {filename}
            </span>
            {language ? (
              <span className="ml-2 uppercase text-[10px] text-muted">
                {language}
              </span>
            ) : null}
          </div>
        ) : null}
        <pre className="bg-muted-5 overflow-x-auto py-4 px-4 text-sm leading-[1.7]">
          <code
            className={className}
            dangerouslySetInnerHTML={{ __html: codeHTML }}
          />
        </pre>
      </div>
    );
  }
  return <pre {...props} />;
}

function Blockquote({ children, ...props }) {
  return (
    <blockquote
      className="rounded-xl border border-surface-border bg-muted-5 px-4 py-3.5 my-5 text-[0.9375rem] leading-[1.7] text-muted"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\u3131-\u3163\uac00-\ud7a3\-]+/g, "") // Keep Korean characters and word characters
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function TableWrapper({ children, ...props }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-surface-border">
      <table className="w-full border-collapse text-sm leading-[1.6]" {...props}>
        {children}
      </table>
    </div>
  );
}

function TableHead({ children, ...props }) {
  return (
    <thead className="bg-muted-5" {...props}>
      {children}
    </thead>
  );
}

function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

function TableRow({ children, ...props }) {
  return (
    <tr className="border-b border-surface-border last:border-b-0" {...props}>
      {children}
    </tr>
  );
}

function TableHeader({ children, ...props }) {
  return (
    <th
      className="px-4 py-2.5 text-left font-semibold whitespace-nowrap text-primary"
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({ children, ...props }) {
  return (
    <td className="px-4 py-2.5 align-top text-muted" {...props}>
      {children}
    </td>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: MdxImage,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  table: TableWrapper,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export function CustomMDX(props) {
  const existingOptions = props.options || {};
  const existingRemarkPlugins = existingOptions.mdxOptions?.remarkPlugins || [];

  return (
    <MDXRemote
      {...props}
      options={{
        ...existingOptions,
        mdxOptions: {
          ...existingOptions.mdxOptions,
          remarkPlugins: [remarkGfm, ...existingRemarkPlugins],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
