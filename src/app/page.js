

import Header from "../components/header";
import Hero from "../components/hero";
import Features from "../components/features";
import Contact from "../components/contact";
import BackgroundCarousel from "../components/background-carousel";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-darkBrown">
      <BackgroundCarousel />
      <div className="relative z-10 pt-20">
     
        <Hero />
        <Features />
        <Contact />
      </div>
    </main>
  );
}