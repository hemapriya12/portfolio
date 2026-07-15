"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/resumeData";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`glass fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <Logo />
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            {profile.name}
          </span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="btn-shine hidden rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground transition-transform hover:scale-105 sm:inline-block"
          >
            Hire Me
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
