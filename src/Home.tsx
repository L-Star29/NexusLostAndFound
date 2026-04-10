import './App.css';
import Hero from "./Sections/Hero.tsx";
import Section1 from "./Sections/Section1.tsx";
import PixelDivider from "./Components/PixelDivider.tsx";
import Section2 from "./Sections/Section2.tsx";
import Testimonials from "./Sections/Testimonials.tsx";
import CTA from "./Components/CTA.tsx";
import Banner from "./Components/Banner.tsx";
import Footer from "./Components/Footer.tsx";


function Home() {
  return (
    <div>
      <Banner />
      <Hero />
      <PixelDivider />
      <Section1 />
      <Section2 />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
