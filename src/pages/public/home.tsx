import Hero from "@/components/shared/hero";
import Contact from "./contact";
import Pricing from "./pricing";
import About from "./about";
import Features from "./features";

// Footer

// Home Page
function Home() {
  return (
    <div className="mt-20">
      <Hero />
      <About />

      <Pricing />
      <Features />
      <Contact />
    </div>
  );
}

export default Home;
