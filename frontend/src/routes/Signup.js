import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Signup from '../screens/Signup'

function Register() {
    return (
        <>
            <Navbar />
            <ToastContainer />
            <Signup />
            <Footer />
        </>
    );
}

export default Register;