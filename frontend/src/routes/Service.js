import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../components/Footer";
import Trip from "../components/Trip";
import heroImg from '../assets/15.jpg'

function Service() {
  return (
    <>
       <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={heroImg}
        title="Trainers"
        btnClass="hide"
      />
    </>
  );
}

export default Service;
