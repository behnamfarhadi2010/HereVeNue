// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import Background from "../assets/bg.jpg";
import Search from "../components/Search"; // new component

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <main>
          <div className="mainpage container left">
            <div className="hero-section">
              <div className="hero-content">
                <div className="search-container">
                  <p className="trust-badge">
                    Over 17k venues - Trusted by TM+ customers
                  </p>
                  <h2>Find and book venues for any event imaginable</h2>
                  <Search />
                </div>

                <div className="hero-image">
                  <img src={Background} alt="Venue image" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
