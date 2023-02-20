import Hero from "../../components/UserComponents/Hero/Hero";
import Navbar from "../../components/UserComponents/Navbar/Navbar";
import Footer from "../../components/UserComponents/Footer/Footer";
import heroImg from '../../assets/trainerdetail1.png';
import { useParams } from "react-router-dom";
import Wallet from "../../components/UserComponents/Wallet/Wallet";

const Wallets = () => {

    const { id } = useParams();

    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={heroImg}
                title="Wallet"
                btnClass="hide"
            />
            <Wallet
                userId={id}
            />
            <Footer />
        </>
    );
}

export default Wallets;