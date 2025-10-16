import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/ovblogo.png";
import Person from "../assets/person.svg";
import Home24 from "../assets/home_24.svg";
import "../styles/main.css";

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when component mounts
    const loadUserData = () => {
      const authUser = localStorage.getItem("authUser");
      const storedUserType = localStorage.getItem("userType");

      if (authUser) {
        setCurrentUser(authUser);
        setUserType(storedUserType);
      } else {
        setCurrentUser(null);
        setUserType(null);
      }
    };

    loadUserData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLoggedIn", loadUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", loadUserData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("userType");
    setCurrentUser(null);
    setUserType(null);
    navigate("/");
  };

  const handleUserClick = () => {
    if (currentUser && userType) {
      // Redirect based on user type
      if (userType === "venue_owner") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } else {
      navigate("/userdashboard");
    }
  };

  const handleFavoritesClick = () => {
    if (currentUser) {
      // Redirect to userdashboard with favorites tab active
      navigate("/userdashboard", { state: { activeTab: "favorites" } });
    } else {
      // If not logged in, redirect to login page
      navigate("/login");
    }
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
                <span
                  className="user-welcome"
                  onClick={handleUserClick}
                  style={{ cursor: "pointer" }}
                >
                  Welcome, {currentUser}
                  {userType &&
                    ` (${userType === "venue_owner" ? "Owner" : "User"})`}
                </span>
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
            {currentUser && userType === "user" ? (
              // Show "Favorites" only for regular users
              <div
                className="favorites-link"
                onClick={handleFavoritesClick}
                style={{ cursor: "pointer" }}
              >
                <img src={Home24} alt="Favorites icon" width="24" height="24" />
                <span>Favorites</span>
              </div>
            ) : (
              // Show "List your venue" for venue owners and logged out users
              <Link to="/add-listing">
                <img src={Home24} alt="Home icon" width="24" height="24" />
                <span>List your venue</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
