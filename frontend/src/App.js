import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/UserPages/Home";
import About from "./Pages/UserPages/About";
import Trainers from "./Pages/UserPages/Trainers";
import Contact from "./Pages/UserPages/Contact";
import SignIn from "./Pages/UserPages/Login";
import Register from "./Pages/UserPages/Signup";
import AdminHome from "./Pages/AdminPages/AdminHome";
import TrainerRegister from "./Pages/TrainerPages/TrainerSignup";
import TrainerSignIn from "./Pages/TrainerPages/TrainerLogin";
import AdminSignIn from "./Pages/AdminPages/AdminLogin";
import TrainerHome from "./Pages/TrainerPages/TrainerHome";
import AddMoreDetails from "./Pages/TrainerPages/AddDetails";
import TrainerDetails from "./Pages/UserPages/TrainerDetails";
import EditDetails from "./Pages/TrainerPages/EditDetails";
import E404 from "./Pages/E404/E404";
import EmailOTP from "./Pages/UserPages/EmailOTP";
import VerificationDone from "./Pages/UserPages/VerificationDone";
import ResendOtp from "./Pages/UserPages/ResendOtp";
import CheckAvailability from "./Pages/UserPages/CheckAvailability";
import Payment from "./Pages/UserPages/Payment";
import PaymentSuccessScreen from "./Pages/UserPages/PaymentSuccessScreen";
import UserProfilePage from "./Pages/UserPages/UserProfilePage";
import ViewBookings from "./Pages/UserPages/ViewBookings";
import ChatPage from "./Pages/UserPages/ChatPage";
import ChatApp from "./Pages/ChatHome/ChatApp";
import RoomPage from "./Pages/ChatHome/RoomPage";
import Room from "./Pages/ChatHome/Room";
import UserChatPage from "./Pages/UserPages/UserChatPage";
import Bookings from "./Pages/TrainerPages/Bookings";
import TrainerChat from "./Pages/TrainerPages/TrainerChat";
import EditProfile from "./Pages/UserPages/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallets from "./Pages/UserPages/Wallets";

export default function App() {

  const userAuth = JSON.parse(localStorage.getItem("user"))?.token;
  const trainerAuth = JSON.parse(localStorage.getItem("trainer"))?.token;
  const adminAuth = JSON.parse(localStorage.getItem("admin"))?.token;

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/emailVerification/:id" element={<EmailOTP />} />
        <Route path="/verificationSuccess" element={<VerificationDone />} />
        <Route path="/resendOtp" element={<ResendOtp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/trainerDetailedView/:id" element={<TrainerDetails />} />
        <Route path="/bookTrainer/:id" element={<CheckAvailability />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccessScreen />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/editUserProfile/:id" element={<EditProfile />} />
        <Route path="/viewPlan/:id" element={<ViewBookings />} />
        <Route path="/userWallet/:id" element={<Wallets />} />
        {/* <Route path="/chat" element={<ChatPage socket={socket} />} /> */}
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path='/textChat' element={<UserChatPage />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminSignIn />} />

        <Route path="/trainerSignup" element={<TrainerRegister />} />
        <Route path="/trainerLogin" element={<TrainerSignIn />} />
        <Route path="/trainerHome" element={<TrainerHome />} />
        <Route path="/addDetails" element={<AddMoreDetails />} />
        <Route path="/editDetails/:id" element={<EditDetails />} />
        <Route path="/viewTrainerPlan/:id" element={<Bookings />} />
        <Route path='/trainerMessages' element={<TrainerChat />} />
        <Route path="/*" element={<E404 />} />
      </Routes>
    </div>
  );
}