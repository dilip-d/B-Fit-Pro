import MainDash from "../../components/AdminComponents/MainDash/MainDash";
import Sidebar from "../../components/AdminComponents/Siderbar/Sidebar";
import styled from 'styled-components';
import UserManagement from "./UserManagement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerManagement from "./TrainerManagement";
import VerifyTrainer from "./VerifyTrainer";

const AdminHome = () => {
  const navigate = useNavigate();
  const [pages, setPage] = useState('dashboard')
  console.log('pages', pages);
  useEffect(() => {
    const token = localStorage.getItem('admin');
    if (!token) {
      navigate('/adminLogin');
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const App = styled.div`
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
`;

  const AppGlass = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  ${'' /* border-radius: 2rem; */}
  ${'' /* gap: 16px; */}
  grid-template-columns: 11rem auto 2rem;
  overflow-y: scroll;


 @media screen and (max-width: 1200px) {
    ${'' /* grid-template-columns: 10% 50% auto; */}
    overflow-y: scroll;
}
@media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    overflow-y: scroll;
}
`;

  return (
    <>
      <App>
        <AppGlass>
          <Sidebar setPage={setPage} />
          {pages === 'dashboard' && <MainDash />}
          {pages === 'users' && <UserManagement />}
          {pages === 'trainers' && <TrainerManagement />}
          {/* {pages === 'verify' && <AdminTrainerDetailsView />} */}
          {pages === 'verify' && <VerifyTrainer />}
        </AppGlass>
      </App>
    </>
  );
};

export default AdminHome;