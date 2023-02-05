import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import { useParams } from "react-router-dom";
import CheckAvailable from "../../components/UserComponents/CheckAvailability/CheckAvailability";

function CheckAvailability() {

    const { id } = useParams();

    return (
      <>
        <Navbar />
        <Hero
          cName="hero-mid"
          heroImg={heroImg}
          title="Booking"
          btnClass="hide"
        />
        <CheckAvailable
          trainerId={id}
        />
        <Footer />
      </>
    );
  }

export default CheckAvailability