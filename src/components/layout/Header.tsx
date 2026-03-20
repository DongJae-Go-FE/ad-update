"use client";

import { useState } from "react";
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="grid grid-cols-2 items-center h-12 px-4 max-w-225 mx-auto">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="rgb(126, 29, 252)" />
                <path
                  d="M6 8h12M6 12h12M6 16h8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-semibold text-sm text-notion-text">
                광고 제안
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden min-[781px]:flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-1.5 text-sm text-notion-text rounded-md hover:bg-notion-hover transition-colors duration-200"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-40">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-notion-text hover:bg-notion-hover transition-colors"
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
              className=" p-2 -mr-2 rounded-md hover:bg-notion-hover transition-colors"
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
