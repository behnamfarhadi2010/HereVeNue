import React from "react";
import { Link } from "react-router-dom";
import "../styles/VenueLogin.css";
import "../styles/Login.css";
import "../styles/main.css";
import Header from "../components/Header";

const VenueLogin = () => {
  return (
    <>
      <div>
        <Header />

        <main>
          <div className="Venuelogin-page">
            <div className="Venuelogin-title">
              <span className="Venuelogin-icon">🏠</span>
              <h1>Venue login</h1>
            </div>

            <div className="Venuelogin-box-user">
              <input
                type="email"
                placeholder="Email address"
                className="Venuelogin-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="Venuelogin-input"
              />

              <a href="#" className="Clientforgot-password">
                Forgot your password?
              </a>

              <button className="Venuelogin-btn-usr">Log in</button>

              <div className="Venueline" />

              <p>
                Don’t have a User Account?{" "}
                <a href="#" className="Venuesignup-link">
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

export default VenueLogin;
