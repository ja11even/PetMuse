import Action from "../Components/Action";
import Faq from "../Components/Faq";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Navbar from "../Components/Navbar";
import Testimonials from "../Components/Testimonials";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Action />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
}

export default Home;
