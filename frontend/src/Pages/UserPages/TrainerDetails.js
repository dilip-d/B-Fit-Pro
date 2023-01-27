import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/15.jpg'
import TrainerDetailedView from "../../components/UserComponents/TrainerDetailedView.js/TrainerDetailedView";

function TrainerDetails() {
  return (
    <>
       <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={heroImg}
        title="Trainer"
        btnClass="hide"
      />
      <TrainerDetailedView />
      <Footer />
    </>
  );
}

export default TrainerDetails;