// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css"; //
import "./styles/Login.css"; // استایل هدر
import Login from "./pages/login"; //
import ClientLogin from "./pages/ClientLogin";

import Home from "./pages/Home";
import Header from "./components/Header"; // کامپوننت هدر برای ناوبری

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
        {/*مسیر لاگین */}
      </Routes>
    </Router>
  );
};

export default App;
