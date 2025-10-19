import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="OVB-footer">
      <div className="footer-container">
        <div className="footer-sections">
          {/* Users Section */}
          <div className="footer-section">
            <h3>Users</h3>
            <ul>
              <li>
                <a href="/why-OVB">Why Online Venue Booking</a>
              </li>
              <li>
                <a href="/login">User login</a>
              </li>
            </ul>
          </div>

          {/* Venues Section */}
          <div className="footer-section">
            <h3>Venues</h3>
            <ul>
              <li>
                <a href="/why-list">Why list with us</a>
              </li>
              <li>
                <a href="/add-listing">List your venue</a>
              </li>
              <li>
                <a href="/venue-login">Venue login</a>
              </li>
            </ul>
          </div>

          {/*  Section */}
          <div className="footer-section">
            <h3>Online Venue Booking</h3>
            <ul>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/help">Help Centre</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/terms">Terms & Privacy</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/locations">Locations</a>
              </li>
              <li>
                <a href="/events">Popular events</a>
              </li>
            </ul>
          </div>

          {/* Locations Section */}
          <div className="footer-section">
            <h3>Locations</h3>
            <ul>
              <li>
                <a href="/stjohns">OVB St. John's</a>
              </li>
              <li>
                <strong>
                  <a href="/cornerbrook">OVB Corner Brook</a>
                </strong>
              </li>
              <li>
                <strong>
                  <a href="/cbs">OVB CBS</a>
                </strong>
              </li>
              <li>
                <strong>
                  <a href="/grandfalls">OVB Grand Falls</a>
                </strong>
              </li>
              <li>
                <strong>
                  <a href="/holyroad">OVB Holy Road</a>
                </strong>
              </li>
              <li>
                <strong>
                  <a href="/usa">OVB USA</a>
                </strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>&copy; 2025 Online Venue Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
