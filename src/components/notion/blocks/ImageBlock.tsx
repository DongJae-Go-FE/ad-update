/* eslint-disable @next/next/no-img-element */
import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface ImageBlockProps {
  block: NotionBlock;
}

export function ImageBlock({ block }: ImageBlockProps) {
  const image = block.image;
  if (!image) return null;

  const url =
    image.type === "file" ? image.file?.url : image.external?.url;

  if (!url) return null;

  return (
    <figure className="my-2">
      <img
        src={url}
        alt={image.caption?.map((c) => c.plain_text).join("") || ""}
        className="w-full rounded-lg"
        loading="lazy"
      />
      {image.caption && image.caption.length > 0 && (
        <figcaption className="mt-1 text-sm text-gray-500 text-center">
          <RichText richText={image.caption} />
        </figcaption>
      )}
    </figure>
  );
}
