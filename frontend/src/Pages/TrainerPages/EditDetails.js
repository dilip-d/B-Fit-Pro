import React from 'react'
import { useParams } from 'react-router-dom';
import EditProfile from '../../components/TrainerComponents/EditProfile/EditProfile'
import TrainerNavbar from '../../components/TrainerComponents/TrainerNavbar/TrainerNavbar'

function EditDetails() {

    const { id } = useParams();

    return (
        <>
            <TrainerNavbar />
            <EditProfile
                trainerId={id}
            />
        </>
    )
}

export default EditDetails