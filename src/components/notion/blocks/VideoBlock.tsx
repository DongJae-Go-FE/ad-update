import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface VideoBlockProps {
  block: NotionBlock;
}

export function VideoBlock({ block }: VideoBlockProps) {
  const video = block.video;
  if (!video) return null;

  const url = video.type === "file" ? video.file?.url : video.external?.url;
  if (!url) return null;

  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <figure className="my-2">
      {isYoutube ? (
        <iframe
          src={url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
          className="w-full aspect-video rounded-lg border-0"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <video src={url} controls className="w-full rounded-lg" />
      )}
      {video.caption && video.caption.length > 0 && (
        <figcaption className="mt-1 text-sm text-gray-500 text-center">
          <RichText richText={video.caption} />
        </figcaption>
      )}
    </figure>
  );
}
