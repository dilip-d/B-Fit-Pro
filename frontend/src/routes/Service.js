import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/night.jpg";
import Footer from "../components/Footer";
import heroImg from '../assets/15.jpg'
import TrainerList from "../screens/TrainerScreen";

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
      <TrainerList />
      <Footer />
    </>
  );
}

export default Service;
