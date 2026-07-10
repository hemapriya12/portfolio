import { profile } from "@/lib/resumeData";
import { ContactForm } from "./ContactForm";
import { CopyChip } from "./CopyChip";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 py-16"
    >
      <div className="blob -right-20 top-0 h-80 w-80" style={{ animationDelay: "-3s" }} />
      <div className="blob -left-20 bottom-0 h-64 w-64" style={{ animationDelay: "-9s" }} />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <h2>
            <Eyebrow>Contact</Eyebrow>
          </h2>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Let&apos;s work together.
          </h3>
          <p className="mt-3 max-w-xl text-base text-muted">
            Open to senior frontend, full-stack, and React Native roles. Send a
            message below, or reach out directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyChip
              label="Email"
              value={profile.email}
              className="btn-shine rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
            >
              {profile.email}
            </CopyChip>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              GitHub
            </a>
            <CopyChip
              label="Phone"
              value={profile.phone}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              {profile.phone}
            </CopyChip>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Reveal>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with Next.js &amp; FastAPI</span>
        </div>
      </Reveal>
    </footer>
  );
}
