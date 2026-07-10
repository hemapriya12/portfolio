import { experienceByCompany } from "@/lib/resumeData";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <div
        className="blob -right-24 top-1/4 h-80 w-80"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2>
            <Eyebrow>Experience</Eyebrow>
          </h2>
        </Reveal>

        <div className="mt-6 space-y-6">
          {experienceByCompany.map((company, i) => {
            const overallStart = company.roles[company.roles.length - 1].start;
            const overallEnd = company.roles[0].end;
            const multiRole = company.roles.length > 1;

            return (
              <Reveal key={company.company} delay={i * 90}>
                <div className="group card-glow rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-sm sm:p-8">
                    <span className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-8xl italic text-foreground/4">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-sm font-semibold text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {company.short}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="text-lg font-semibold">{company.company}</h3>
                          <span className="text-sm text-muted">
                            {overallStart} – {overallEnd}
                          </span>
                        </div>
                        <p className="text-sm text-muted">
                          {company.location}
                          {multiRole && ` · ${company.roles.length} roles`}
                        </p>
                      </div>
                    </div>

                    {multiRole ? (
                      <div className="relative mt-6 space-y-6 border-l border-border pl-6 sm:ml-16">
                        {company.roles.map((role, roleIndex) => (
                          <Reveal key={role.title} delay={roleIndex * 120}>
                            <div className="relative">
                              <span className="absolute -left-6.75 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent transition-transform duration-300 hover:scale-150" />
                              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h4 className="text-sm font-semibold">{role.title}</h4>
                                <span className="text-xs text-muted">
                                  {role.start} – {role.end}
                                </span>
                              </div>
                              <ul className="mt-2 space-y-1.5">
                                {role.bullets.map((bullet) => (
                                  <li
                                    key={bullet}
                                    className="text-sm leading-relaxed text-muted"
                                  >
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    ) : (
                      <div className="relative mt-6 sm:ml-16">
                        <h4 className="text-sm font-semibold">
                          {company.roles[0].title}
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                          {company.roles[0].bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="text-sm leading-relaxed text-muted"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
