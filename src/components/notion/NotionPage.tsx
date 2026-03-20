/* eslint-disable @next/next/no-img-element */
import { NotionBlock, NotionPage as NotionPageType } from "@/types/notion";
import { NotionRenderer } from "./NotionRenderer";

interface NotionPageProps {
  page: NotionPageType;
  blocks: NotionBlock[];
}

export function NotionPage({ page, blocks }: NotionPageProps) {
  const title = page.properties?.title?.title
    ?.map((t) => t.plain_text)
    .join("") || "광고 제안";

  const coverUrl =
    page.cover?.type === "file"
      ? page.cover.file?.url
      : page.cover?.external?.url;

  const icon =
    page.icon?.type === "emoji" ? page.icon.emoji : null;

  return (
    <article className="animate-fadeUp">
      {/* Cover Image */}
      {coverUrl && (
        <div className="w-full h-[30vh] min-h-50 max-h-85 relative overflow-hidden">
          <img
            src={coverUrl}
            alt="커버 이미지"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-225 mx-auto px-24 max-[780px]:px-12 max-[480px]:px-6 pb-24 max-[780px]:pb-20">
        {/* Title Area */}
        <div className="mt-8 mb-6">
          {icon && <span className="text-[40px] mb-2 block">{icon}</span>}
          <h1 className="text-[40px] max-[480px]:text-[32px] font-bold text-notion-text leading-tight">
            {title}
          </h1>
        </div>

        {/* Notion Blocks */}
        <div className="notion-content">
          <NotionRenderer blocks={blocks} />
        </div>
      </div>
    </article>
  );
}
