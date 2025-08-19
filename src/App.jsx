// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./pages/myDashboard.jsx";

import Login from "./pages/login"; //
import ClientLogin from "./pages/ClientLogin";
import VenueLogin from "./pages/VenueLogin";
import Venues from "./pages/Venues";
import Home from "./pages/Home";
import MyDashboard from "./pages/myDashboard";
import AddListing from "./components/AddListing/AddListing.jsx";

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
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/venue-login" element={<VenueLogin />} />
        <Route path="/my-dashboard" element={<MyDashboard />} />
        <Route path="/add-listing" element={<AddListing />} />
        {/*مسیر صفحه لاگین مکان */}
        <Route path="/venues" element={<Venues />} />
        {/*مسیر لاگین */}
      </Routes>
    </Router>
  );
};

export default App;
