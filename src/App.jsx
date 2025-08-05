// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css"; //
import Login from "./pages/login"; //

import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      {/*مدیریت مسیرها */}
      <Routes>
        {" "}
        {/*جایی که لیست مسیرها رو می‌ذاریم.*/}
        <Route path="/" element={<Home />} /> {/*مسیر صفحه اصلی */}
        <Route path="/login" element={<Login />} />
        {/*مسیر لاگین */}
      </Routes>
    </Router>
  );
};

export default App;
