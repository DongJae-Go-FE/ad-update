"use client";

import { useState } from "react";
import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";
import { NotionRenderer } from "../NotionRenderer";

interface HeadingBlockProps {
  block: NotionBlock;
}

export function HeadingBlock({ block }: HeadingBlockProps) {
  const level = block.type as "heading_1" | "heading_2" | "heading_3";
  const data = block[level];
  const isToggleable = data?.is_toggleable;
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  const content = <RichText richText={data.rich_text} />;

  const headingStyles = {
    heading_1:
      "text-[1.875em] max-[480px]:text-[1.5em] font-semibold mt-8 mb-1",
    heading_2:
      "text-[1.5em] max-[480px]:text-[1.25em] font-semibold mt-6 mb-1",
    heading_3:
      "text-[1.25em] max-[480px]:text-[1.1em] font-semibold mt-4 mb-1",
  };

  const Tag = level === "heading_1" ? "h1" : level === "heading_2" ? "h2" : "h3";

  if (isToggleable) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 w-full text-left text-notion-text ${headingStyles[level]}`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {content}
        </button>
        {isOpen && block.children && (
          <div className="pl-6">
            <NotionRenderer blocks={block.children} />
          </div>
        )}
      </div>
    );
  }

  return (
    <Tag className={`text-notion-text ${headingStyles[level]}`}>
      {content}
    </Tag>
  );
}
