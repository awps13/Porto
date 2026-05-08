"use client"
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

// Desktop-only components: skip SSR entirely → zero JS shipped on mobile
const Rain = dynamic(() => import("@/components/rain"), {
  ssr: false,
  loading: () => null,
});
const Cursor = dynamic(() => import("@/components/cursor"), {
  ssr: false,
  loading: () => null,
});

// Lazy-load below-fold sections
const Projects = dynamic(() => import("@/components/projects"), { ssr: true });
const Studio = dynamic(() => import("@/components/experience"), { ssr: true });
const Newsletter = dynamic(() => import("@/components/newsletter"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });

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
