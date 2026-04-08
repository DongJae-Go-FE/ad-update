import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { getChildPages } from "@/lib/notion";
import { NavItem } from "@/types/notion";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "부동산R114 광고",
  description: "부동산R114 광고",
  openGraph: {
    images: ["/og.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let navItems: NavItem[] = [];

  const pageId = process.env.NOTION_PAGE_ID;
  if (pageId) {
    try {
      const childPages = await getChildPages(pageId);
      navItems = childPages.map((cp) => ({
        label: cp.title,
        href: `/${cp.id}`,
        icon: cp.icon ?? undefined,
        children: cp.children?.map((sub) => ({
          label: sub.title,
          href: `/${sub.id}`,
          icon: sub.icon ?? undefined,
        })),
      }));
    } catch {
      // Notion API 연결 실패 시 빈 메뉴
    }
  }

  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Header navItems={navItems} />
        <main className="flex-1 pb-14">{children}</main>
        <BottomNav navItems={navItems} />
      </body>
    </html>
  );
}
