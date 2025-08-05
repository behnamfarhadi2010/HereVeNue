// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">Log in</h1>
      <div className="login-options">
        {/* User Box */}
        <div className="login-box">
          <div className="login-icon">👤</div>
          <h2>User</h2>
          <p>Find the perfect venue for your event.</p>
          <button className="login-btn">User login</button>
          <p className="login-footer">
            Don’t have a User Account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        {/* Venue Box */}
        <div className="login-box">
          <div className="login-icon">🏠</div>
          <h2>Venue</h2>
          <p>Manage enquiries and edit your listings.</p>
          <button className="login-btn">Venue login</button>
          <p className="login-footer">
            Don’t have a Venue Account?{" "}
            <Link to="/list-your-venue">List your venue with us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
