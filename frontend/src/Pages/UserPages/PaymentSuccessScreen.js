import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png'
import PaymentSuccess from "../../components/UserComponents/Checkout/PaymentSuccess";

function PaymentSuccessScreen() {

    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={heroImg}
                title="Booking"
                btnClass="hide"
            />
            <PaymentSuccess
            />
            <Footer />
        </>
    );
}

export default PaymentSuccessScreen;