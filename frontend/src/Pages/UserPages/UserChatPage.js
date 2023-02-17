import { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { ToastContainer } from 'react-toastify';
import ChatPage from '../../components/UserComponents/ChatPage/ChatPage';
import Footer from '../../components/UserComponents/Footer/Footer';
import Navbar from '../../components/UserComponents/Navbar/Navbar';

function UserChatPage() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);

    return (
        <>
            {loading ? (
                <GridLoader
                    style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    color={'#32C9A6'}
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"

                />
            ) : (
                <>
                    <Navbar />
                    <ToastContainer />
                    <ChatPage/>
                    <Footer />
                </>
            )}
        </>
    );
}

export default UserChatPage;