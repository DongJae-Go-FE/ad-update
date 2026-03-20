"use client";

import Link from "next/link";
import { NavItem } from "@/types/notion";

interface BottomNavProps {
  navItems: NavItem[];
}

const defaultPageIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function BottomNav({ navItems }: BottomNavProps) {
  const allItems = [
    {
      label: "홈",
      href: "/",
      icon: <span className="text-xl leading-none">🏠</span>,
    },
    ...navItems.map((item) => ({
      label: item.label,
      href: item.href,
      icon: item.icon ? (
        <span className="text-xl leading-none">{item.icon}</span>
      ) : (
        defaultPageIcon
      ),
    })),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-225 mx-auto">
        <div className="grid grid-cols-4 h-14">
          {allItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 text-notion-text hover:text-primary-purple transition-colors"
            >
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
