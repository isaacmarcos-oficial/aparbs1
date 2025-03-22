import About from "./_components/about";
import Contact from "./_components/contact";
import Destaque from "./_components/destaque";
import Hero from "./_components/hero";
import Offices from "./_components/offices/offices";
import Partners from "./_components/partners";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <Destaque />
      <About />
      <Offices/>
      <Contact />
      <Partners />
    </div>
  );
}
