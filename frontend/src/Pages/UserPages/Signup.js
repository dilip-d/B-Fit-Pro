import { ToastContainer } from 'react-toastify';
import CsignUp from '../../components/UserComponents/CsignUp/CsignUp';
import Footer from '../../components/UserComponents/Footer/Footer';
import Navbar from '../../components/UserComponents/Navbar/Navbar';
import Signup from '../../screens/Signup'

function Register() {
    return (
        <>
            <Navbar />
            <ToastContainer />
            {/* <Signup /> */}
            <CsignUp />
            <Footer />
        </>
    );
}

export default Register;