import { education, experienceByCompany, profile } from "@/lib/resumeData";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const currentCompany = experienceByCompany[0];
const currentRole = currentCompany.roles[0].title.split(" (")[0];
const currentEducation = education[0];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="blob -left-24 top-0 h-72 w-72" style={{ animationDelay: "-2s" }} />

      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2>
            <Eyebrow>About</Eyebrow>
          </h2>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal delay={60}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-glow rounded-2xl">
              <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-surface p-6 sm:p-8">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Experience
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">10+ Years</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Current Role
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">
                    {currentRole}
                  </dd>
                  <dd className="text-xs text-muted">{currentCompany.company}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Based in
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {currentCompany.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Studying
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug">
                    M.Sc. ML &amp; AI
                  </dd>
                  <dd className="text-xs text-muted">{currentEducation.school}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
