// src/components/VenuesHeader.jsx
import React from "react";
import Search from "./Search"; // reuse your existing search component
import Logo from "../assets/ovblogo.png";
import "../styles/VenuesHeader.css"; // import your CSS styles

export default function VenuesHeader() {
  return (
    <header className="venues-header">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Logo" width="300" />
      </div>

      {/* Search component */}
      <div className="search-bar">
        <Search />
      </div>

      {/* Menu items */}
      <nav className="venues-menu">
        <a href="/login">Log in</a>
        <a href="/list">List your venue</a>
      </nav>
    </header>
  );
}
