import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Login from '../screens/Login'

function signIn() {
    return (
      <>
        <Navbar />
        <ToastContainer />
        <Login />
        <Footer />
      </>
    );
  }
  
  export default signIn;