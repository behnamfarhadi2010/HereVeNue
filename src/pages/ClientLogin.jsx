import React from "react";
import { Link } from "react-router-dom";
import "../styles/ClientLogin.css";
import "../styles/Login.css";
import "../styles/main.css";

const ClientLogin = () => {
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
          <div className="Clientlogin-page">
            <div className="Clientlogin-title">
              <span className="Clientlogin-icon">👤</span>
              <h1>User login</h1>
            </div>

            <div className="Clientlogin-box-user">
              <input
                type="email"
                placeholder="Email address"
                className="Clientlogin-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="Clientlogin-input"
              />

              <a href="#" className="Clientforgot-password">
                Forgot your password?
              </a>

              <button className="Clientlogin-btn-usr">Log in</button>

              <div className="Clientline" />

              <p>
                Don’t have a User Account?{" "}
                <a href="#" className="Clientsignup-link">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </main>
      </body>
    </>
  );
};

export default ClientLogin;
