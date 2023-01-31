import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import { useParams } from "react-router-dom";
// import ClientPlanPayment from "../../components/UserComponents/Checkout/Checkout";
import BookingPage from "../../components/UserComponents/Checkout/Checkout";

function BookTrainer() {

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
        <BookingPage
          trainerId={id}
        />
        <Footer />
      </>
    );
  }

export default BookTrainer