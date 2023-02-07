import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import UserProfile from "../../components/UserComponents/UserProfile/UserProfile";

function UserProfilePage() {

   
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={heroImg}
                title="Profile"
                btnClass="hide"
            />
            <UserProfile
            />
            <Footer />
        </>
    );
}

export default UserProfilePage;