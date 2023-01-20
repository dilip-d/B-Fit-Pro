import { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import NewAdminLogin from '../../components/AdminComponents/AdminLogin/NewAdminLogin';
// import AdminLogin from '../../screens/AdminLogin';

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
          <NewAdminLogin />
        </>
      )}
    </>
  );
}

export default AdminSignIn;