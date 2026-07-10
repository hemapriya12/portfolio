import { profile } from "@/lib/resumeData";
import { HeroSocialIcons } from "./HeroSocialIcons";
import { HeroVideo } from "./HeroVideo";
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

export function Hero() {
  return (
    <header
      id="home"
      className="relative flex min-h-[92vh] flex-col overflow-hidden bg-neutral-900"
    >
      <HeroVideo />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,14,13,0.94) 0%, rgba(12,14,13,0.8) 30%, rgba(12,14,13,0.35) 58%, rgba(12,14,13,0.05) 78%)",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-sm font-semibold tracking-wide text-white">
            {profile.name}
          </span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 transition-opacity hover:opacity-90 sm:inline-block"
          >
            Hire Me
          </a>
          <ThemeToggle variant="overlay" />
        </div>
      </nav>

      <HeroSocialIcons />

      <div className="relative z-10 mt-auto flex flex-col gap-6 px-6 pb-14 pt-10 sm:px-10 lg:max-w-2xl lg:pl-24">
        <div>
          <p
            className="animate-fade-in-up text-sm font-medium uppercase tracking-widest text-accent"
            style={{ animationDelay: "0ms" }}
          >
            {profile.welcome}
          </p>
          <h1
            className="animate-fade-in-up mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            Hi, I&apos;m {profile.name}.
          </h1>
          <p
            className="animate-fade-in-up mt-2 text-xl font-medium text-accent sm:text-2xl"
            style={{ animationDelay: "200ms" }}
          >
            {profile.title}
          </p>
        </div>

        <p
          className="animate-fade-in-up max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
          style={{ animationDelay: "300ms" }}
        >
          {profile.tagline}
        </p>

        <div
          className="animate-fade-in-up flex flex-wrap items-center gap-4"
          style={{ animationDelay: "400ms" }}
        >
          <a
            href="#experience"
            className="btn-shine rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
          >
            View my work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>
          <a
            href="/Hema-Priya-Resume.pdf"
            download
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <DownloadIcon />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />
    </svg>
  );
}
