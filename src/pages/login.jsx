// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import person from "../assets/person.svg";
import Header from "../components/Header";
import "../styles/Login.css"; // استایل هدر

//import "./Login.css";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //  can also add form validation here
    navigate("/client-login");
  };

  const handleVenueLogin = () => {
    //  can also add form validation here
    navigate("/venue-login");
  };

  return (
    <div>
      <Header />
      <main>
        <div className="login-page">
          <h1 className="login-title">Log in</h1>
          <div className="login-options">
            {/* User Box */}
            <div className="login-box-user">
              <div className="login-icon">👤</div>
              <h2>User</h2>
              <p>Find the perfect venue for your event.</p>
              <button className="login-btn-usr" onClick={handleLogin}>
                User login
              </button>
              <div className="line"></div>
              <p className="login-footer">
                Don’t have a User Account? <br />
                <Link to="/signup">Sign up</Link>
              </p>
            </div>

            {/* Venue Box */}
            <div className="login-box-venue">
              <div className="login-icon">🏠</div>
              <h2>Venue</h2>
              <p>Manage enquiries and edit your listings.</p>
              <button className="login-btn-vnu" onClick={handleVenueLogin}>
                Venue login
              </button>
              <div className="line"></div>
              <p className="login-footer">
                Don’t have a Venue Account? <br />
                <Link to="/list-your-venue">List your venue with us</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
