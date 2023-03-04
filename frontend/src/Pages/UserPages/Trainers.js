import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/cover7.jpg'
import TrainerList from "../../components/UserComponents/TrainerList/TrainerList";

function Trainers() {
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

export default Trainers;
