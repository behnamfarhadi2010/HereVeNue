// src/pages/Home.jsx

import React from "react";
import Header from "../components/Header";
// کامپوننت Link را برای جابجایی بین صفحات بدون رفرش شدن صفحه وارد می‌کنیم
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* // تگ والد میزاری بقیه کد رو این تو میذاری */}
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" />
        <title>Online Venue Booking</title>
        <link rel="stylesheet" href="/src/styles/main.css" />
      </head>
      <div>
        <Header />
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
        </header> */}
        <main>
          <div className="mainpage container left">
            <div className="hero-section">
              <div className="hero-content">
                <div className="search-container">
                  <p className="trust-badge">
                    Over 17k venues - Trusted by TM+ customers
                  </p>
                  <h2>Find and book venues for any event imaginable</h2>
                  <div className="search-box">
                    <div className="filter-group">
                      <label>EVENT TYPE</label>
                      <p className="filter-description">
                        What are you planning?
                      </p>
                      <div className="select-wrapper">
                        <input
                          type="text"
                          id="event-type"
                          name="event-type"
                          placeholder="e.g., Wedding"
                        />
                      </div>
                    </div>

                    <div className="filter-group">
                      <label>GUESTS</label>
                      <p className="filter-description">Number of guests</p>
                      <div className="select-wrapper">
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          placeholder="e.g., 100"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="filter-group">
                      <label>LOCATION</label>
                      <p className="filter-description">Choose City</p>
                      <div className="select-wrapper">
                        <input
                          type="text"
                          id="location"
                          name="location"
                          placeholder="e.g., St. John's"
                        />
                      </div>
                    </div>

                    <button className="search-btn">Search</button>
                  </div>
                </div>

                <div className="hero-image">
                  <img src="/src/assets/bg.jpg" alt="Venue image" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// کامپوننت را export می‌کنیم تا در فایل App.jsx بتوانیم از آن استفاده کنیم
export default Home;
