import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import heroImg from '../assets/night.jpg'

function About() {
  return (
    <>
      <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={heroImg}
        title="About"
        btnClass="hide"
      />
      <AboutUs />
      <Footer />
    </>
  );
}

export default About;
