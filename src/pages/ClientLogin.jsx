import React from "react";
import { Link } from "react-router-dom";
import "../styles/ClientLogin.css";
import "../styles/Login.css";
import "../styles/main.css";
import Header from "../components/Header";

const ClientLogin = () => {
  return (
    <>
      <div>
        <Header />

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
      </div>
    </>
  );
};

export default ClientLogin;
