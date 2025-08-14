// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css"; //
import "./styles/Login.css"; // استایل هدر
import "./styles/VenuesHeader.css"; // استایل هدر صفحه مکان‌ها
import "./styles/ClientLogin.css"; // استایل صفحه لاگین کاربر
import "./styles/VenueLogin.css"; // استایل صفحه لاگین مکان

import Login from "./pages/login"; //
import ClientLogin from "./pages/ClientLogin";
import VenueLogin from "./pages/VenueLogin";
import Venues from "./pages/Venues";
import Home from "./pages/Home";

import Search from "./components/Search";
import Header from "./components/Header"; // کامپوننت هدر برای ناوبری
import VenuesHeader from "./components/VenuesHeader"; // هدر صفحه مکان‌ها

import Data from "./data"; // داده‌های اولیه برای مکان‌ها

const App = () => {
  return (
    <Router>
      {/*مدیریت مسیرها */}
      <Routes>
        {" "}
        {/*جایی که لیست مسیرها رو می‌ذاریم.*/}
        <Route path="/" element={<Home />} /> {/*مسیر صفحه اصلی */}
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/venue-login" element={<VenueLogin />} />
        {/*مسیر صفحه لاگین مکان */}
        <Route path="/venues" element={<Venues />} />
        {/*مسیر لاگین */}
      </Routes>
    </Router>
  );
};

export default App;
