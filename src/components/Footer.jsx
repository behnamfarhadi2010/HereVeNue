import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// Import icons from assets/icons
import buildingIcon from "../assets/icons/building.svg";
import userIcon from "../assets/icons/user.svg";
import starIcon from "../assets/icons/star.svg";
import keyIcon from "../assets/icons/key.svg";
import infoIcon from "../assets/icons/info.svg";
import helpIcon from "../assets/icons/help.svg";
import emailIcon from "../assets/icons/email.svg";
import briefcaseIcon from "../assets/icons/briefcase.svg";
import shieldIcon from "../assets/icons/shield.svg";
import newsIcon from "../assets/icons/news.svg";
import blogIcon from "../assets/icons/blog.svg";
import globeIcon from "../assets/icons/globe.svg";
import calendarIcon from "../assets/icons/calendar.svg";
import mapIcon from "../assets/icons/map.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import logoIcon from "../assets/icons/logo.svg";

const Footer = () => {
  return (
    <footer className="ovb-footer">
      <div className="footer-container">
        {/* Logo and Social Media Section */}
        <div className="footer-top">
          <div className="footer-logo">
            <img src={logoIcon} alt="OVB Logo" className="logo-icon" />
            <span>Online Venue Booking</span>
          </div>
          <div className="social-media">
            <Link to="#" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" />
            </Link>
            <Link to="#" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" />
            </Link>
            <Link to="#" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" />
            </Link>
            <Link to="#" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" />
            </Link>
          </div>
        </div>

        <div className="footer-sections">
          {/* Users Section */}
          <div className="footer-section">
            <h3>
              <img src={userIcon} alt="" className="section-icon" />
              Users
            </h3>
            <ul>
              <li>
                <img src={starIcon} alt="" className="link-icon" />
                <Link to="/why-ovb">Why OVB</Link>
              </li>
              <li>
                <img src={keyIcon} alt="" className="link-icon" />
                <Link to="/login">User login</Link>
              </li>
            </ul>
          </div>

          {/* Venues Section */}
          <div className="footer-section">
            <h3>
              <img src={buildingIcon} alt="" className="section-icon" />
              Venues
            </h3>
            <ul>
              <li>
                <img src={starIcon} alt="" className="link-icon" />
                <Link to="/why-list">Why list with us</Link>
              </li>
              <li>
                <img src={buildingIcon} alt="" className="link-icon" />
                <Link to="/add-listing">List your venue</Link>
              </li>
              <li>
                <img src={keyIcon} alt="" className="link-icon" />
                <Link to="/venue-login">Venue login</Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h3>
              <img src={infoIcon} alt="" className="section-icon" />
              OVB
            </h3>
            <ul>
              <li>
                <img src={infoIcon} alt="" className="link-icon" />
                <Link to="/about">About us</Link>
              </li>
              <li>
                <img src={helpIcon} alt="" className="link-icon" />
                <Link to="/help">Help Centre</Link>
              </li>
              <li>
                <img src={emailIcon} alt="" className="link-icon" />
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <img src={briefcaseIcon} alt="" className="link-icon" />
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <img src={shieldIcon} alt="" className="link-icon" />
                <Link to="/terms">Terms & Privacy</Link>
              </li>
              <li>
                <img src={newsIcon} alt="" className="link-icon" />
                <Link to="/press">Press</Link>
              </li>
              <li>
                <img src={blogIcon} alt="" className="link-icon" />
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <img src={globeIcon} alt="" className="link-icon" />
                <Link to="/locations">Locations</Link>
              </li>
              <li>
                <img src={calendarIcon} alt="" className="link-icon" />
                <Link to="/events">Popular events</Link>
              </li>
            </ul>
          </div>

          {/* Locations Section */}
          <div className="footer-section">
            <h3>
              <img src={mapIcon} alt="" className="section-icon" />
              Locations
            </h3>
            <ul>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/stjohns">OVB St. John's</Link>
              </li>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/cornerbrook">OVB Corner Brook</Link>
              </li>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/cbs">OVB CBS</Link>
              </li>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/grandfalls">OVB Grand Falls</Link>
              </li>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/holyroad">OVB Holy Road</Link>
              </li>
              <li className="highlighted">
                <img src={mapIcon} alt="" className="link-icon" />
                <Link to="/usa">OVB USA</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>© 2025 Online Venue Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
