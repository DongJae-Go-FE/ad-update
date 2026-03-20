"use client";

import { useState } from "react";
import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";
import { NotionRenderer } from "../NotionRenderer";

interface ToggleBlockProps {
  block: NotionBlock;
}

export function ToggleBlock({ block }: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const data = block.toggle;
  if (!data) return null;

  return (
    <div className="my-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 w-full text-left leading-[1.7] text-notion-text hover:bg-notion-hover rounded px-1 py-0.5 transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        >
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <RichText richText={data.rich_text} />
      </button>
      {isOpen && block.children && (
        <div className="pl-6 mt-0.5">
          <NotionRenderer blocks={block.children} />
        </div>
      )}
    </div>
  );
}
