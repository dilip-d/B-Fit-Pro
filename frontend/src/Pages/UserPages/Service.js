import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/15.jpg'
import TrainerList from "../../screens/TrainerScreen";

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
