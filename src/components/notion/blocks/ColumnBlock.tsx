import { NotionBlock } from "@/types/notion";
import { NotionRenderer } from "../NotionRenderer";

interface ColumnBlockProps {
  block: NotionBlock;
}

export function ColumnBlock({ block }: ColumnBlockProps) {
  if (!block.children) return null;

  return (
    <div className="flex gap-4 my-2 max-[480px]:flex-col">
      {block.children.map((column) => (
        <div key={column.id} className="flex-1 min-w-0">
          {column.children && <NotionRenderer blocks={column.children} />}
        </div>
      ))}
    </div>
  );
}
