import Link from "next/link";
import { NotionBlock } from "@/types/notion";

interface ChildPageBlockProps {
  block: NotionBlock;
}

export function ChildPageBlock({ block }: ChildPageBlockProps) {
  const title = block.child_page?.title;
  if (!title) return null;

  return (
    <Link
      href={`/${block.id}`}
      className="flex items-center gap-2 my-1 px-2 py-1.5 rounded-md text-notion-text hover:bg-notion-hover transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="underline">{title}</span>
    </Link>
  );
}
