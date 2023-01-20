import { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { ToastContainer } from 'react-toastify';
import TrainerLogin from '../../components/TrainerComponents/TrainerLogin/TrainerLogin';
import Footer from '../../components/UserComponents/Footer/Footer';
import Navbar from '../../components/UserComponents/Navbar/Navbar';

function TrainerSignIn() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {loading ? (
        <GridLoader
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          color={'#ee9802'}
          loading={loading}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"

        />
      ) : (
        <>
          <Navbar />
          <ToastContainer />
          <TrainerLogin />
          <Footer />
        </>
      )}
    </>
  );
}

export default TrainerSignIn;