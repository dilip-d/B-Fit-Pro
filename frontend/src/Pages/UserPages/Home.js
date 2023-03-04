import Trainer from "../../components/UserComponents/Trainer/Trainer";
import Footer from "../../components/UserComponents/Footer/Footer";
import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import AboutImg from '../../assets/cover6.jpg'
import Testimonials from "../../components/UserComponents/Testimonials/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={AboutImg}
        title="Your Health Our Priority"
        text="Choose Your Personal Trainer"
        buttonText="Join Us"
        url='/trainerSignup'
        btnClass="show"
      />
      <Trainer />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
