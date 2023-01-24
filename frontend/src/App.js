import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/UserPages/Home";
import About from "./Pages/UserPages/About";
import Service from "./Pages/UserPages/Service";
import Contact from "./Pages/UserPages/Contact";
import SignIn from "./Pages/UserPages/Login";
import Register from "./Pages/UserPages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/authSlice";
import AdminHome from "./Pages/AdminPages/AdminHome";
import TrainerRegister from "./Pages/TrainerPages/TrainerSignup";
import TrainerSignIn from "./Pages/TrainerPages/TrainerLogin";
import AdminSignIn from "./Pages/AdminPages/AdminLogin";
import TrainerHome from "./Pages/TrainerPages/TrainerHome";

export default function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdminAuth = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminSignIn />} />
        <Route path="/trainerSignup" element={<TrainerRegister />} />
        <Route path="/trainerLogin" element={<TrainerSignIn />} />
        <Route path="/trainerHome" element={<TrainerHome />} />
      </Routes>
    </div>
  );
}