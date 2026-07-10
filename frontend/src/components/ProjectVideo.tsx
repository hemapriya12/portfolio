"use client";

import { useEffect, useRef, useState } from "react";

export function ProjectVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  if (failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-surface-alt text-sm text-muted">
        Preview unavailable
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="group relative overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        className="aspect-video w-full bg-black object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause preview" : "Play preview"}
        className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}
