"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/resumeData";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `Hi! I'm ${profile.name}'s portfolio assistant. Ask me about her experience, skills, or projects.`,
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    if (open) {
      setRendered(true);
      raf = requestAnimationFrame(() => setEntered(true));
    } else {
      setEntered(false);
      timeout = setTimeout(() => setRendered(false), 200);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const data = await res.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Sorry, the assistant is unavailable right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {rendered && (
        <div
          className={`glass flex h-112 w-88 max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl shadow-xl transition-all duration-200 ease-out ${
            entered
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border bg-accent/10 px-4 py-3 backdrop-blur-sm">
            <div>
              <p className="text-sm font-semibold">Ask about {profile.name.split(" ")[0]}</p>
              <p className="text-xs text-muted">Usually replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-muted transition-colors hover:bg-surface"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-accent-foreground"
                    : "bg-surface-alt text-foreground"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex max-w-[85%] items-center gap-1 rounded-2xl bg-surface-alt px-4 py-3">
                <span className="bounce-dot h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
                <span className="bounce-dot h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
                <span className="bounce-dot h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-shine rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <div className="relative">
        {!open && (
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent opacity-40"
            style={{ animationDuration: "2.5s" }}
          />
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="flex h-14 items-center gap-2.5 rounded-full bg-accent px-6 text-accent-foreground shadow-lg transition-transform hover:scale-105"
        >
          {open ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              <span className="text-sm font-medium">Close</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span className="text-sm font-medium">Chat with me</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
