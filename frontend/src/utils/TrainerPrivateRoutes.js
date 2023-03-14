import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('trainer'))

const TrainerPrivateRoutes = () => {
    return (
        token ? <Outlet /> : <Navigate to='/trainerLogin' />
    )
}

export default TrainerPrivateRoutes;