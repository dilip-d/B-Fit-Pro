import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import TrainerDetailedView from "../../components/UserComponents/TrainerDetailedView.js/TrainerDetailedView";
import { useParams } from "react-router-dom";

const TrainerDetails = () => {

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={heroImg}
        title="Trainer"
        btnClass="hide"
      />
      <TrainerDetailedView
        trainerId={id}
      />
      <Footer />
    </>
  );
}

export default TrainerDetails;