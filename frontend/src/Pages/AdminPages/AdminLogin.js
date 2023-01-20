import { ToastContainer } from 'react-toastify';
import AdminLogin from '../../components/AdminComponents/AdminLogin/AdminLogin';
import Footer from '../../components/UserComponents/Footer/Footer';
import Navbar from '../../components/UserComponents/Navbar/Navbar';
// import AdminLogin from '../../screens/AdminLogin';

function AdminSignIn() {
    return (
      <>
        <Navbar />
        <ToastContainer />
        <AdminLogin />
        <Footer />
      </>
    );
  }
  
  export default AdminSignIn;