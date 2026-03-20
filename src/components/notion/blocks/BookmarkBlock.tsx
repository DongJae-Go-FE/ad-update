import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface BookmarkBlockProps {
  block: NotionBlock;
}

export function BookmarkBlock({ block }: BookmarkBlockProps) {
  const bookmark = block.bookmark;
  if (!bookmark) return null;

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-2 border border-notion-border rounded-md p-4 hover:bg-notion-hover transition-colors"
    >
      <span className="text-sm text-notion-text break-all">
        {bookmark.url}
      </span>
      {bookmark.caption && bookmark.caption.length > 0 && (
        <span className="block mt-1 text-xs text-gray-500">
          <RichText richText={bookmark.caption} />
        </span>
      )}
    </a>
  );
}
