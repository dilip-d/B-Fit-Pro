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

export default function App() {

  // const [trainerAuth, setTrainerAuth] = useState(JSON.parse(localStorage.getItem("trainer")) || null);
  const userAuth = JSON.parse(localStorage.getItem("user"));
  const trainerAuth = JSON.parse(localStorage.getItem("trainer"));
  const adminAuth = JSON.parse(localStorage.getItem("admin"));

  // useEffect(() => {
  //   setTrainerAuth(JSON.parse(localStorage.getItem("trainer")));
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminSignIn />} />
        <Route path="/trainerSignup" element={trainerAuth ? <TrainerHome /> : <TrainerRegister />} />
        <Route path="/trainerLogin" element={trainerAuth ? <TrainerHome /> : <TrainerSignIn />} />
        <Route path="/trainerHome" element={<TrainerHome />} />
        <Route path="/addDetails" element={<AddMoreDetails />} />
        <Route path="/trainerDetailedView" element={<TrainerDetails />} />
      </Routes>
    </div>
  );
}