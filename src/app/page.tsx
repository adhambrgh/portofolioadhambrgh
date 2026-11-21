import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navigation />
      <main id="main-content" className="min-h-screen" role="main">
        <Hero />
        <SelectedWorks />
        <About />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}