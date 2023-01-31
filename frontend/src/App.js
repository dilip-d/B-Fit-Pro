import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/UserPages/Home";
import About from "./Pages/UserPages/About";
import Trainers from "./Pages/UserPages/Trainers";
import Contact from "./Pages/UserPages/Contact";
import SignIn from "./Pages/UserPages/Login";
import Register from "./Pages/UserPages/Signup";
import { useEffect, useState } from "react";
import AdminHome from "./Pages/AdminPages/AdminHome";
import TrainerRegister from "./Pages/TrainerPages/TrainerSignup";
import TrainerSignIn from "./Pages/TrainerPages/TrainerLogin";
import AdminSignIn from "./Pages/AdminPages/AdminLogin";
import TrainerHome from "./Pages/TrainerPages/TrainerHome";
import AddMoreDetails from "./Pages/TrainerPages/AddDetails";
import TrainerDetails from "./Pages/UserPages/TrainerDetails";
import EditDetails from "./Pages/TrainerPages/EditDetails";
import E404 from "./Pages/E404/E404";
import BookTrainer from "./Pages/UserPages/BookTrainer";
import EmailOTP from "./Pages/UserPages/EmailOTP";
import VerificationDone from "./Pages/UserPages/VerificationDone";
import ResendOtp from "./Pages/UserPages/ResendOtp";

export default function App() {

  const userAuth = JSON.parse(localStorage.getItem("user"));
  const trainerAuth = JSON.parse(localStorage.getItem("trainer"));
  const adminAuth = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="App">
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
        <Route path="/bookTrainer/:id" element={userAuth ? <BookTrainer /> : <SignIn />} />
        {/* admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminSignIn />} />
        {/* trainer */}
        <Route path="/trainerSignup" element={trainerAuth ? <TrainerHome /> : <TrainerRegister />} />
        <Route path="/trainerLogin" element={trainerAuth ? <TrainerHome /> : <TrainerSignIn />} />
        <Route path="/trainerHome" element={<TrainerHome />} />
        <Route path="/addDetails" element={<AddMoreDetails />} />
        <Route path="/editDetails/:id" element={<EditDetails />} />
        <Route path="/*" element={<E404 />} />
      </Routes>
    </div>
  );
}