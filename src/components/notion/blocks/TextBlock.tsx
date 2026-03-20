import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface TextBlockProps {
  block: NotionBlock;
}

export function TextBlock({ block }: TextBlockProps) {
  const richText = block.paragraph?.rich_text;

  if (!richText || richText.length === 0) {
    return <div className="min-h-[1em] my-1" />;
  }

  return (
    <p className="my-1 leading-[1.7] text-notion-text">
      <RichText richText={richText} />
    </p>
  );
}
