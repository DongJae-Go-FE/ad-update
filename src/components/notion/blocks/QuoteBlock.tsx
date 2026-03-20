import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface QuoteBlockProps {
  block: NotionBlock;
}

export function QuoteBlock({ block }: QuoteBlockProps) {
  const quote = block.quote;
  if (!quote) return null;

  return (
    <blockquote className="my-2 pl-4 border-l-[3px] border-notion-text">
      <p className="leading-[1.7] text-notion-text">
        <RichText richText={quote.rich_text} />
      </p>
    </blockquote>
  );
}
