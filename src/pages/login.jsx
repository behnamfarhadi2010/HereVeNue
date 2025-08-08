// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import person from "../assets/person.svg";
import Header from "../components/Header";
//import "./Login.css";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // you can also add form validation here
    navigate("/client-login");
  };

  return (
    <>
      <div>
        {/* <header>
          <a href="/index.html" target="_blank" rel="noopener noreferrer">
            <img
              src="./src/assets/Blue Yellow Simple Modern Travel Booking Platform Logo (1).png"
              className="logo"
              alt="Vite logo"
              width="300"
            />
          </a>
          <nav className="menu">
            <ul>
              <li>
                <a href="/login">
                  <img
                    src={person}
                    id="icon"
                    alt="Person icon"
                    width="24"
                    height="24"
                  />
                  <span>Log in</span>
                </a>
              </li>
              <li>
                <a href="/about">
                  <img
                    src="./src/assets/home_24.svg"
                    id="icon"
                    alt="Person icon"
                    width="24"
                    height="24"
                  />
                  <span> List your venue </span>
                </a>
              </li>
            </ul>
          </nav>
        </header> */}
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
                <button className="login-btn-vnu">Venue login</button>
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
    </>
  );
};

export default Login;
