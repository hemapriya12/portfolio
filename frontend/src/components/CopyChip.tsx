"use client";

import { useEffect, useRef, useState } from "react";

export function CopyChip({
  label,
  value,
  className,
  children,
  panelClassName = "left-0 top-full mt-2",
}: {
  label: string;
  value: string;
  className: string;
  children: React.ReactNode;
  panelClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => setCopied(false), [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — the value is still visible for manual copy.
    }
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Show ${label.toLowerCase()}`}
        className={className}
      >
        {children}
      </button>
      {open && (
        <div className={`absolute z-30 w-60 rounded-xl border border-border bg-surface p-3 text-foreground shadow-xl ${panelClassName}`}>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-1 break-all text-sm font-medium">{value}</p>
          <button
            type="button"
            onClick={copy}
            className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-transform hover:scale-105"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
