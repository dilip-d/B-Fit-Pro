import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import { useParams } from "react-router-dom";
import Checkout from "../../components/UserComponents/Checkout/Checkout";

function Payment() {

    const { id } = useParams();
    console.log('in payment');
    const isAvailable = JSON.parse(decodeURIComponent(id));
    console.log(isAvailable);
    
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={heroImg}
                title="Booking"
                btnClass="hide"
            />
            <Checkout
                data={isAvailable}
            />
            <Footer />
        </>
    );
}

export default Payment