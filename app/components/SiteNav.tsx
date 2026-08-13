"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

// Root-relative, not bare fragments. A bare "#offer" resolves against whatever
// page you're on, so from /blog/<slug> these would silently do nothing.
const LINKS = [
  { href: "/#offer", label: "The audit" },
  { href: "/#founders", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/#ladder", label: "Beyond the audit" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Close on Escape, and don't let the page scroll behind the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 sm:px-10">
      <Link href="/" className="text-lg font-extrabold tracking-tight">
        MiHo <span className="font-accent italic">Partners</span>
      </Link>

      {/* Desktop: links inline */}
      <nav className="hidden items-center gap-8 text-sm font-medium text-foreground sm:flex">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-link">
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {/* Wrapper, not a class on the button: BookButton's own `inline-flex`
            collides with `hidden`, and display utilities resolve by CSS source
            order, so the hide silently loses. */}
        <span className="hidden sm:block">
          <BookButton />
        </span>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md transition-colors hover:bg-surface sm:hidden"
        >
          <span
            className={`block h-[2px] w-5 bg-foreground transition-transform duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-foreground transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-foreground transition-transform duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[84px] bottom-0 z-50 flex flex-col gap-1 bg-background px-6 pt-4 sm:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ux-gray-2 py-5 text-2xl font-light tracking-tight transition-colors hover:text-link"
            >
              {l.label}
            </Link>
          ))}
          <BookButton className="mt-6 w-full py-4 text-base" />
        </div>
      )}
    </header>
  );
}
