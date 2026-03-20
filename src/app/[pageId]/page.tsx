import { getPageWithBlocks } from "@/lib/notion";
import { NotionPage } from "@/components/notion/NotionPage";
import { NotionBlock, NotionPage as NotionPageType } from "@/types/notion";

interface PageProps {
  params: Promise<{ pageId: string }>;
}

async function fetchPageData(pageId: string): Promise<{
  page: NotionPageType;
  blocks: NotionBlock[];
} | null> {
  try {
    const { page, blocks } = await getPageWithBlocks(pageId);
    return { page, blocks };
  } catch {
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { pageId } = await params;
  const data = await fetchPageData(pageId);

  if (!data) {
    return (
      <div className="max-w-225 mx-auto px-24 max-[780px]:px-12 max-[480px]:px-6 py-20">
        <div className="animate-fadeUp text-center">
          <h1 className="text-2xl font-bold text-notion-text mb-4">
            페이지를 불러올 수 없습니다
          </h1>
          <p className="text-gray-500">
            노션 API 키와 페이지 ID가 올바르게 설정되어 있는지 확인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return <NotionPage page={data.page} blocks={data.blocks} />;
}
