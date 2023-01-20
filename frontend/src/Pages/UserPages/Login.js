import { ToastContainer } from 'react-toastify';
import Clogin from '../../components/UserComponents/Clogin/Clogin';
import Footer from '../../components/UserComponents/Footer/Footer';
import Navbar from '../../components/UserComponents/Navbar/Navbar';
import Login from '../../screens/Login'

function signIn() {
    return (
      <>
        <Navbar />
        <ToastContainer />
        {/* <Login /> */}
        <Clogin />
        <Footer />
      </>
    );
  }
  
  export default signIn;