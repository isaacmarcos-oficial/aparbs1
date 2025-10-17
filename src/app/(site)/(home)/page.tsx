import About from "./_components/about";
import VonixxBanner from "./_components/catalog";
import Contact from "./_components/contact";
import Destaque from "./_components/destaque";
import Hero from "./_components/hero";
import { MercadoLivreBanner } from "./_components/mercadoLivreBanner";
import Offices from "./_components/offices/offices";
import Partners from "./_components/partners";
import Rent from "./_components/rent";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <Destaque />
      <About />
      <Offices />
      <Rent />
      <VonixxBanner />
      <MercadoLivreBanner />
      <Contact />
      <Partners />
    </div>
  );
}
