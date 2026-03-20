import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";
import { NotionRenderer } from "../NotionRenderer";

interface CalloutBlockProps {
  block: NotionBlock;
}

const bgColorMap: Record<string, string> = {
  default: "bg-white",
  gray_background: "bg-gray-100",
  brown_background: "bg-amber-50",
  orange_background: "bg-orange-50",
  yellow_background: "bg-yellow-50",
  green_background: "bg-green-50",
  blue_background: "bg-blue-50",
  purple_background: "bg-purple-50",
  pink_background: "bg-pink-50",
  red_background: "bg-red-50",
};

export function CalloutBlock({ block }: CalloutBlockProps) {
  const callout = block.callout;
  if (!callout) return null;

  const bgClass = bgColorMap[callout.color] || "bg-gray-50";
  const icon =
    callout.icon?.type === "emoji" ? callout.icon.emoji : null;

  return (
    <div className={`flex gap-3 p-4 rounded-md my-2 ${bgClass}`}>
      {icon && <span className="text-xl shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="leading-[1.7] text-notion-text">
          <RichText richText={callout.rich_text} />
        </p>
        {block.children && block.children.length > 0 && (
          <NotionRenderer blocks={block.children} />
        )}
      </div>
    </div>
  );
}
