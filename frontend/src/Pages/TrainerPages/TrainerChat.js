import { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Chat from '../../components/TrainerComponents/Chat/Chat';
import TrainerNavbar from '../../components/TrainerComponents/TrainerNavbar/TrainerNavbar';

function TrainerChat() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

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
                    <TrainerNavbar />
                    <Chat />
                </>
            )}
        </>
    );
}

export default TrainerChat;