import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import { useParams } from "react-router-dom";
import ViewPlan from "../../components/UserComponents/ViewPlan/ViewPlan";

const ViewBookings = () => {

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={heroImg}
        title="Bookings"
        btnClass="hide"
      />
      <ViewPlan
        userId={id}
      />
      <Footer />
    </>
  );
}

export default ViewBookings;