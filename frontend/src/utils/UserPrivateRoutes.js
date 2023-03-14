import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('user'))

const UserPrivateRoutes = () => {
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default UserPrivateRoutes;