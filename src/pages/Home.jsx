// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import Background from "../assets/bg.jpg";
import Search from "../components/Search"; // new component
import "../styles/main.css";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="mainpage container left">
          <div className="hero-section">
            <div className="hero-content"></div>
            <span>Over 17k venues - Trusted by TM+ customers</span>
            <h2>Find and book venues for any event imaginable</h2>
            <div className="hero-image">
              <img src={Background} alt="Venue image" />
            </div>
            <Search />
          </div>
        </div>
      </main>
      <div className="tagline">
        <h2>Discover top event spaces in Canada</h2>
      </div>
    </div>
  );
};

export default Home;
