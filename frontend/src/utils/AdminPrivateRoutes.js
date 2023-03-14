import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('admin'))

const AdminPrivateRoutes = () => {
    return (
        token ? <Outlet /> : <Navigate to='/adminLogin' />
    )
}

export default AdminPrivateRoutes;