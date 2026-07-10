import { certifications, education } from "@/lib/resumeData";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function EducationAndCerts() {
  return (
    <section id="education" className="relative overflow-hidden bg-surface-alt">
      <div
        className="blob left-1/3 -top-10 h-64 w-64"
        style={{ animationDelay: "-8s" }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <Reveal>
          <h2>
            <Eyebrow>Education</Eyebrow>
          </h2>
          <ul className="mt-6 space-y-6">
            {education.map((item) => (
              <li
                key={item.degree}
                className="transition-transform duration-300 hover:translate-x-1.5"
              >
                <p className="text-sm font-semibold">{item.degree}</p>
                <p className="text-sm text-muted">{item.school}</p>
                <p className="text-xs text-muted">{item.period}</p>
                {item.note && (
                  <p className="mt-1 text-xs text-muted">{item.note}</p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <h2>
            <Eyebrow>Certifications</Eyebrow>
          </h2>
          <ul className="mt-6 space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted transition-transform duration-300 hover:translate-x-1.5"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {cert}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
