import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect } from "react";
import { Context } from "./index.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Navbars from "./components/Layout/Navbar.jsx";
import Footer from "./components/Home/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import JobDetail from "./components/Job/JobDetail.jsx";
import Myjob from "./components/Job/Myjob.jsx";
import Job from "./components/Job/Job.jsx";
import PostJob from "./components/Job/PostJob.jsx";
import Application from "./components/Application/Application.jsx";
import MyApplication from "./components/Application/MyApplication.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import axios from "axios";
import AboutUs from "./components/Layout/About.jsx";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        {isAuthorized && <Navbars />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/job/getall" element={<Job />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<Myjob />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {isAuthorized && <Footer />}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
