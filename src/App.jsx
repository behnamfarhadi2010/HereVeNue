import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Login from "./pages/login";
import Home from "/";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
