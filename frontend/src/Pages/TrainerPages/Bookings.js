import React from 'react'
import { useParams } from 'react-router-dom';
import TrainerNavbar from '../../components/TrainerComponents/TrainerNavbar/TrainerNavbar'
import ViewTrainerBookings from '../../components/TrainerComponents/ViewPlan/ViewTrainerBookings';

function Bookings() {

    const { id } = useParams();

    return (
        <>
            <TrainerNavbar />
            <ViewTrainerBookings
                trainerId={id}
            />
        </>
    )
}

export default Bookings;