"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { profile } from "@/lib/resumeData";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Browser blocked autoplay-with-sound — wait for a tap, then play with sound.
        setNeedsTapToPlay(true);
      });
    }
  }, []);

  if (videoFailed) {
    return (
      <Image
        src="/images/profile.jpg"
        alt={profile.name}
        fill
        priority
        className="object-cover object-[60%_28%]"
      />
    );
  }

  const startWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    video.play();
    setNeedsTapToPlay(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        setEnded(false);
      }
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        poster="/images/profile.jpg"
        onError={() => setVideoFailed(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
        }}
        className="absolute inset-0 h-full w-full object-cover object-[60%_28%]"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {needsTapToPlay && (
        <button
          type="button"
          onClick={startWithSound}
          className="group absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-accent shadow-lg transition-transform group-hover:scale-105">
              <PlayIcon large />
            </span>
            <span className="rounded-full bg-black/40 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Tap to play with sound
            </span>
          </span>
        </button>
      )}

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2.5">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : ended ? "Replay video" : "Play video"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          {playing ? <PauseIcon /> : ended ? <ReplayIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (video) video.muted = !muted;
            setMuted((m) => !m);
          }}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          {muted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>
    </>
  );
}

function PlayIcon({ large = false }: { large?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={large ? "ml-1 h-6 w-6" : "ml-0.5 h-4 w-4"}>
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

function ReplayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="m23 9-6 6M17 9l6 6" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
