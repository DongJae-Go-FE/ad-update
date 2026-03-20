import { Fragment } from "react";
import { NotionRichText } from "@/types/notion";

interface RichTextProps {
  richText: NotionRichText[];
}

function TextWithBreaks({ text, className }: { text: string; className?: string }) {
  const parts = text.split("\n");
  if (parts.length === 1) {
    return className ? <span className={className}>{text}</span> : <>{text}</>;
  }
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {className ? <span className={className}>{part}</span> : part}
          {i < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

const colorMap: Record<string, string> = {
  default: "",
  gray: "text-gray-500",
  brown: "text-amber-700",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
  green: "text-green-600",
  blue: "text-blue-500",
  purple: "text-purple-600",
  pink: "text-pink-500",
  red: "text-red-500",
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

export function RichText({ richText }: RichTextProps) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, i) => {
        const { bold, italic, strikethrough, underline, code, color } =
          text.annotations;

        let className = colorMap[color] || "";
        if (bold) className += " font-bold";
        if (italic) className += " italic";
        if (strikethrough) className += " line-through";
        if (underline) className += " underline";

        if (code) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 bg-notion-code-bg text-notion-code text-[85%] rounded font-mono"
            >
              {text.plain_text}
            </code>
          );
        }

        if (text.href) {
          return (
            <a
              key={i}
              href={text.href}
              className={`underline text-notion-text opacity-70 hover:opacity-100 ${className}`.trim()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TextWithBreaks text={text.plain_text} />
            </a>
          );
        }

        return (
          <span key={i}>
            <TextWithBreaks text={text.plain_text} className={className.trim() || undefined} />
          </span>
        );
      })}
    </>
  );
}
