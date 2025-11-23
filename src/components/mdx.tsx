import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import remarkGfm from "remark-gfm";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

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
        <Image alt={props.alt} className="rounded-lg" {...props} />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
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
        <img alt={props.alt} className="rounded-lg m-0" {...props} />
      </span>
      {caption ? (
        <span className="mt-2 block text-center text-sm text-neutral-500 dark:text-neutral-400">
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
    // Inline code styling with neutral gray theme and red text (Notion style)
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-red-600 dark:text-red-400 text-sm font-medium"
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
      <div className="my-4 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-900">
        {filename ? (
          <div className="flex items-center justify-between px-3 py-2 text-xs bg-neutral-100 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-900">
            <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
              {filename}
            </span>
            {language ? (
              <span className="ml-2 uppercase text-[10px] text-neutral-500 dark:text-neutral-400">
                {language}
              </span>
            ) : null}
          </div>
        ) : null}
        <pre className="bg-neutral-50 dark:bg-neutral-900 overflow-x-auto py-2 px-3 text-sm">
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

type FileTreeNodeType = {
  name: string;
  type: "file" | "dir";
  children?: FileTreeNodeType[];
};

function FileTreeNode({
  node,
  depth = 0,
}: {
  node: FileTreeNodeType;
  depth?: number;
}) {
  const isDirectory = node.type === "dir";
  return (
    <div className="leading-6">
      <div
        className={
          `flex items-center` +
          ` ${
            isDirectory
              ? "font-medium text-neutral-800 dark:text-neutral-200"
              : "text-neutral-600 dark:text-neutral-400"
          }`
        }
        style={{ paddingLeft: `${depth * 12}px` }}
      >
        <span className="mr-2 select-none">{isDirectory ? "📁" : "📄"}</span>
        <span className="truncate">{node.name}</span>
      </div>
      {isDirectory && node.children && node.children.length > 0 ? (
        <div className="mt-1">
          {node.children.map((child, idx) => (
            <FileTreeNode
              key={`${node.name}-${idx}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FileTree({ tree }: { tree: FileTreeNodeType[] }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 text-sm overflow-hidden">
      {tree.map((node, idx) => (
        <FileTreeNode key={`root-${idx}`} node={node} />
      ))}
    </div>
  );
}

function CodeWithTree({
  code,
  language = "tsx",
  tree,
}: {
  code: string;
  language?: string;
  tree: FileTreeNodeType[];
}) {
  const codeHTML = highlight(code);
  return (
    <div className="my-4 md:grid md:grid-cols-5 gap-4">
      <div className="md:col-span-2 mb-4 md:mb-0">
        <FileTree tree={tree} />
      </div>
      <div className="md:col-span-3">
        <pre className="bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-x-auto border border-neutral-200 dark:border-neutral-900 py-2 px-3 text-sm">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: codeHTML }}
          />
        </pre>
      </div>
    </div>
  );
}

function Blockquote({ children, ...props }) {
  return (
    <blockquote
      className="border-l-4 border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50 pl-4 pr-4 py-2 my-4 italic text-neutral-700 dark:text-neutral-300"
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
    <div className="my-4 overflow-x-auto">
      <table
        className="min-w-full border-collapse border border-neutral-300 dark:border-neutral-700"
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function TableHead({ children, ...props }) {
  return (
    <thead className="bg-neutral-100 dark:bg-neutral-800" {...props}>
      {children}
    </thead>
  );
}

function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>;
}

function TableRow({ children, ...props }) {
  return (
    <tr
      className="border-b border-neutral-200 dark:border-neutral-700"
      {...props}
    >
      {children}
    </tr>
  );
}

function TableHeader({ children, ...props }) {
  return (
    <th
      className="px-4 py-2 text-left font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({ children, ...props }) {
  return (
    <td
      className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700"
      {...props}
    >
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
  FileTree,
  CodeWithTree,
  Table,
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
