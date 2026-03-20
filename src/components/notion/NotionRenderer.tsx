import { NotionBlock } from "@/types/notion";
import { TextBlock } from "./blocks/TextBlock";
import { HeadingBlock } from "./blocks/HeadingBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TableBlock } from "./blocks/TableBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ColumnBlock } from "./blocks/ColumnBlock";
import { BulletedListItem, NumberedListItem } from "./blocks/ListBlock";
import { ToggleBlock } from "./blocks/ToggleBlock";
import { BookmarkBlock } from "./blocks/BookmarkBlock";
import { EmbedBlock } from "./blocks/EmbedBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { ChildPageBlock } from "./blocks/ChildPageBlock";

interface NotionRendererProps {
  blocks: NotionBlock[];
}

function renderBlock(block: NotionBlock) {
  switch (block.type) {
    case "paragraph":
      return <TextBlock key={block.id} block={block} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <HeadingBlock key={block.id} block={block} />;
    case "image":
      return <ImageBlock key={block.id} block={block} />;
    case "table":
      return <TableBlock key={block.id} block={block} />;
    case "divider":
      return <DividerBlock key={block.id} />;
    case "callout":
      return <CalloutBlock key={block.id} block={block} />;
    case "column_list":
      return <ColumnBlock key={block.id} block={block} />;
    case "bulleted_list_item":
      return <BulletedListItem key={block.id} block={block} />;
    case "numbered_list_item":
      return <NumberedListItem key={block.id} block={block} />;
    case "toggle":
      return <ToggleBlock key={block.id} block={block} />;
    case "bookmark":
      return <BookmarkBlock key={block.id} block={block} />;
    case "embed":
      return <EmbedBlock key={block.id} block={block} />;
    case "quote":
      return <QuoteBlock key={block.id} block={block} />;
    case "video":
      return <VideoBlock key={block.id} block={block} />;
    case "child_page":
      return <ChildPageBlock key={block.id} block={block} />;
    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return <>{blocks.map((block) => renderBlock(block))}</>;
}
