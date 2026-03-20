import { redirect } from "next/navigation";

export default function Home() {
  const pageId = process.env.NOTION_PAGE_ID;

  if (pageId) {
    redirect(`/${pageId}`);
  }

  return (
    <div className="max-w-225 mx-auto px-24 max-[780px]:px-12 max-[480px]:px-6 py-20">
      <div className="animate-fadeUp">
        <h1 className="text-[40px] max-[480px]:text-[32px] font-bold text-notion-text mb-4">
          광고 제안
        </h1>
        <p className="text-notion-text leading-[1.7]">
          환경 변수를 설정해주세요.
        </p>
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-notion-text">설정 방법</h2>
          <ol className="list-decimal ml-6 space-y-2 text-notion-text">
            <li>
              <code className="px-1.5 py-0.5 bg-notion-code-bg rounded text-sm">.env.local</code> 파일을 열어주세요.
            </li>
            <li>
              <code className="px-1.5 py-0.5 bg-notion-code-bg rounded text-sm">NOTION_API_KEY</code>에 노션 API 키를 입력하세요.
            </li>
            <li>
              <code className="px-1.5 py-0.5 bg-notion-code-bg rounded text-sm">NOTION_PAGE_ID</code>에 노션 페이지 ID를 입력하세요.
            </li>
            <li>개발 서버를 재시작하세요.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
