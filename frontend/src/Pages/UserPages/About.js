import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import AboutUs from "../../components/UserComponents/About/AboutUs";
import heroImg from '../../assets/night.jpg'

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
