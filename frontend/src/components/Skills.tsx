import { skills } from "@/lib/resumeData";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-surface-alt">
      <div className="blob -left-16 -top-10 h-72 w-72" />
      <div
        className="blob right-0 top-1/3 h-64 w-64"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2>
            <Eyebrow>Skills</Eyebrow>
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 70}>
              <div className="card-glow h-full rounded-xl transition-transform duration-300 hover:-translate-y-1.5">
                <div className="glass h-full rounded-xl p-5">
                  <h3 className="text-sm font-semibold">{group.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-transparent bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition-all hover:scale-105 hover:border-accent/40 hover:bg-accent hover:text-accent-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
