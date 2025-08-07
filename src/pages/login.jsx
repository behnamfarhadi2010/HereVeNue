// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
//import "./Login.css";
const Login = () => {
  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" />
        <title>Online Venue Booking</title>
        <link rel="stylesheet" href="/src/styles/main.css" />
      </head>
      <body>
        <header>
          <a href="/index.html" target="_blank" rel="noopener noreferrer">
            <img
              src="./src/assets/Blue Yellow Simple Modern Travel Booking Platform Logo (1).png"
              class="logo"
              alt="Vite logo"
              width="300"
            />
          </a>
          <nav class="menu">
            <ul>
              <li>
                <a href="/login">
                  <img
                    src="./src/assets/person.svg"
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
        </header>
        <main>
          <div className="login-page">
            <h1 className="login-title">Log in</h1>
            <div className="login-options">
              {/* User Box */}
              <div className="login-box-user">
                <div className="login-icon">👤</div>
                <h2>User</h2>
                <p>Find the perfect venue for your event.</p>
                <button className="login-btn">User login</button>
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
                <button className="login-btn">Venue login</button>
                <p className="login-footer">
                  Don’t have a Venue Account? <br />
                  <Link to="/list-your-venue">List your venue with us</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
};

export default Login;
