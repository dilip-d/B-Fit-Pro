import Trainer from "../components/Trainer";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from '../assets/13.jpg'
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={AboutImg}
        title="Your Health Our Priority"
        text="Choose Your Personal Trainer"
        buttonText="Monthly Plan"
        url='/'
        btnClass="show"
      />
      <Trainer />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
