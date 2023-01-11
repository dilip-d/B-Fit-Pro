import Destination from "../components/Destination";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Trip from "../components/Trip";
import AboutImg from '../assets/13.jpg'

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
    </>
  );
}

export default Home;
