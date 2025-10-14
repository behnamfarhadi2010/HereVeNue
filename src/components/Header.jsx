import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/ovblogo.png";
import Person from "../assets/person.svg";
import Home24 from "../assets/home_24.svg";
import "../styles/main.css";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      setCurrentUser(authUser);
    }

    // Listen for storage changes (in case of logout from another tab)
    const handleStorageChange = () => {
      const user = localStorage.getItem("authUser");
      setCurrentUser(user);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
    // Optional: redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <header>
      <Link to="/">
        <img src={Logo} className="logo" alt="OVB" width="300" />
      </Link>
      <nav className="menu">
        <ul>
          <li>
            {currentUser ? (
              <div className="user-menu">
                <img src={Person} alt="Person icon" width="24" height="24" />
                <span>Welcome, {currentUser}</span>
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <img src={Person} alt="Person icon" width="24" height="24" />
                <span>Log in</span>
              </Link>
            )}
          </li>
          <li>
            <Link to="/about">
              <img src={Home24} alt="Home icon" width="24" height="24" />
              <span>List your venue</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
