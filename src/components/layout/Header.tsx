"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { NavItem } from "@/types/notion";

interface HeaderProps {
  navItems: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-2 items-center h-14 px-5 max-w-225 mx-auto">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="로고" width={80} height={32} className="h-7 w-auto" unoptimized />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden min-[781px]:flex items-center justify-end gap-0.5">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-notion-secondary rounded-md hover:text-notion-text hover:bg-gray-50 transition-all duration-200"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full right-0 pt-2 hidden group-hover:block z-50">
                    <div className="bg-white border border-gray-200/80 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-1.5 min-w-44">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-[13px] text-notion-secondary hover:text-notion-text hover:bg-gray-50 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center justify-end min-[781px]:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -mr-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="메뉴 열기"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
