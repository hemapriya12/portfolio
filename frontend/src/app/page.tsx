import { About } from "@/components/About";
import { ChatWidget } from "@/components/ChatWidget";
import { Contact, Footer } from "@/components/Contact";
import { EducationAndCerts } from "@/components/EducationAndCerts";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Skills } from "@/components/Skills";
import { StickyNav } from "@/components/StickyNav";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgressBar />
      <StickyNav />
      <Hero />
      <main className="flex-1">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EducationAndCerts />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
