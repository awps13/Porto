import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Studio from "@/components/experience";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Rain from "@/components/rain";
import Cursor from "@/components/cursor";

export default function Page() {
  return (
    <>
      <Cursor />
      <main className="relative">
        <Rain />
        <Navbar />
        <Hero />
        <Projects />
        <Studio />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
