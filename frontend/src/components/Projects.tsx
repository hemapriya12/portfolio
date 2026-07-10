import { projects } from "@/lib/resumeData";
import { Eyebrow } from "./Eyebrow";
import { ProjectVideo } from "./ProjectVideo";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="blob -left-24 top-1/3 h-80 w-80" style={{ animationDelay: "-7s" }} />

      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2>
            <Eyebrow>Projects</Eyebrow>
          </h2>
        </Reveal>

        <div className="mt-6 space-y-8">
          {projects.map((project, i) => (
            <Reveal
              key={project.name}
              delay={i * 90}
              className="card-glow rounded-2xl"
            >
              <div className="grid gap-0 overflow-hidden rounded-2xl bg-surface md:grid-cols-2">
                <ProjectVideo src={project.video} />

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-shine rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
                    >
                      GitHub
                    </a>
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
