import Hero from "./Components/Hero.tsx";
import './App.css';
import Section1 from "./Components/Section1.tsx";
import PixelDivider from "./Components/PixelDivider.tsx";
import Section2 from "./Components/Section2.tsx";
import Testimonials from "./Components/Testimonials.tsx";
import CTA from "./Components/CTA.tsx";
import Banner from "./Components/Banner.tsx";
import Footer from "./Components/Footer.tsx";


function App() {
  return (
    <div>
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

export default App;
