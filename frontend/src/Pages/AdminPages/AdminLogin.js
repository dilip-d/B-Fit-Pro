import { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import AdminLogin from '../../components/AdminComponents/AdminLogin/AdminLogin';

function AdminSignIn() {
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
          <AdminLogin />
        </>
      )}
    </>
  );
}

export default AdminSignIn;