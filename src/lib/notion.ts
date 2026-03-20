import { ChildPage, NotionBlock, NotionPage } from "@/types/notion";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

export async function getPage(pageId: string): Promise<NotionPage> {
  const res = await fetch(`${NOTION_API_BASE}/pages/${pageId}`, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getBlocks(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`${NOTION_API_BASE}/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) {
      url.searchParams.set("start_cursor", cursor);
    }

    const res = await fetch(url.toString(), {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blocks: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  // Fetch children for blocks that have them (skip child_page/child_database)
  const blocksWithChildren = blocks.filter(
    (block) =>
      block.has_children &&
      block.type !== "child_page" &&
      block.type !== "child_database"
  );
  await Promise.all(
    blocksWithChildren.map(async (block) => {
      block.children = await getBlocks(block.id);
    })
  );

  return blocks;
}

export async function getChildPages(pageId: string, depth = 0): Promise<ChildPage[]> {
  const blocks = await getBlocks(pageId);
  const childPageBlocks = blocks.filter(
    (block) => block.type === "child_page" && block.child_page
  );

  const childPages = await Promise.all(
    childPageBlocks.map(async (block) => {
      let icon: string | null = null;
      try {
        const page = await getPage(block.id);
        if (page.icon?.type === "emoji") {
          icon = page.icon.emoji ?? null;
        }
      } catch {
        // 아이콘 가져오기 실패 시 무시
      }

      // 2depth까지 하위 페이지 탐색
      let children: Awaited<ReturnType<typeof getChildPages>> | undefined;
      if (depth < 1) {
        try {
          const sub = await getChildPages(block.id, depth + 1);
          if (sub.length > 0) children = sub;
        } catch {
          // 하위 탐색 실패 시 무시
        }
      }

      return {
        id: block.id,
        title: block.child_page!.title,
        icon,
        children,
      };
    })
  );

  return childPages;
}

export async function getPageWithBlocks(pageId: string) {
  const [page, blocks] = await Promise.all([
    getPage(pageId),
    getBlocks(pageId),
  ]);

  const childPages = blocks
    .filter((block) => block.type === "child_page" && block.child_page)
    .map((block) => ({
      id: block.id,
      title: block.child_page!.title,
    }));

  return { page, blocks, childPages };
}
