"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/types/notion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setOpenSubmenu(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-[80vw] max-w-100 p-0 [&>button]:hidden"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <SheetTitle>메뉴</SheetTitle>
        </VisuallyHidden>

        {/* Menu Header */}
        <div className="sticky top-0 flex items-center justify-end h-12 px-4 bg-white border-b-2 border-gray-100 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-notion-hover transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col overflow-y-auto">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center h-10 px-4 text-sm font-medium text-notion-text hover:bg-gray-100 transition-colors duration-300"
          >
            홈
          </Link>

          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isSubmenuOpen = openSubmenu === item.href;

            return (
              <div key={item.href}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex-1 flex items-center h-10 px-4 text-sm font-medium text-notion-text hover:bg-gray-100 transition-colors duration-300"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleSubmenu(item.href)}
                      className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 transition-colors"
                      aria-label="하위 메뉴 펼치기"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        className={`transition-transform duration-200 ${isSubmenuOpen ? "rotate-90" : ""}`}
                      >
                        <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasChildren && isSubmenuOpen && (
                  <div className="border-l-2 border-primary-purple ml-4">
                    {item.children!.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center h-10 pl-4 pr-4 text-sm text-notion-text hover:bg-gray-100 transition-colors duration-300"
                      >
                        {sub.icon && <span className="mr-2">{sub.icon}</span>}
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
