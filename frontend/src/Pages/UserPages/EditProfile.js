import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import { useParams } from "react-router-dom";
import EditUserProfile from "../../components/UserComponents/EditUserprofile.js/EditUserProfile";

const EditProfile = () => {

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={heroImg}
        title="Edit Profile"
        btnClass="hide"
      />
      <EditUserProfile
        userId={id}
      />
      <Footer />
    </>
  );
}

export default EditProfile;