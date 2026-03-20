import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";
import { NotionRenderer } from "../NotionRenderer";

interface ListBlockProps {
  block: NotionBlock;
}

export function BulletedListItem({ block }: ListBlockProps) {
  const data = block.bulleted_list_item;
  if (!data) return null;

  return (
    <li className="my-0.5 leading-[1.7] text-notion-text list-disc ml-6">
      <RichText richText={data.rich_text} />
      {block.children && block.children.length > 0 && (
        <ul className="mt-0.5">
          <NotionRenderer blocks={block.children} />
        </ul>
      )}
    </li>
  );
}

export function NumberedListItem({ block }: ListBlockProps) {
  const data = block.numbered_list_item;
  if (!data) return null;

  return (
    <li className="my-0.5 leading-[1.7] text-notion-text list-decimal ml-6">
      <RichText richText={data.rich_text} />
      {block.children && block.children.length > 0 && (
        <ol className="mt-0.5">
          <NotionRenderer blocks={block.children} />
        </ol>
      )}
    </li>
  );
}
