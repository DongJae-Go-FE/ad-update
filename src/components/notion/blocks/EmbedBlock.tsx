import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface EmbedBlockProps {
  block: NotionBlock;
}

export function EmbedBlock({ block }: EmbedBlockProps) {
  const embed = block.embed;
  if (!embed) return null;

  return (
    <figure className="my-2">
      <iframe
        src={embed.url}
        className="w-full min-h-100 rounded-lg border-0"
        allowFullScreen
        loading="lazy"
      />
      {embed.caption && embed.caption.length > 0 && (
        <figcaption className="mt-1 text-sm text-gray-500 text-center">
          <RichText richText={embed.caption} />
        </figcaption>
      )}
    </figure>
  );
}
