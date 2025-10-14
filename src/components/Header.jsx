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

      console.log("Header - Loading user data:", { authUser, storedUserType });

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
      console.log("Header - Storage changed, reloading user data");
      loadUserData();
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom login events
    window.addEventListener("userLoggedIn", loadUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", loadUserData);
    };
  }, []);

  const handleLogout = () => {
    console.log("Header - Logging out user");
    localStorage.removeItem("authUser");
    localStorage.removeItem("userType");
    setCurrentUser(null);
    setUserType(null);
    navigate("/");
  };

  const handleUserClick = () => {
    if (currentUser && userType) {
      console.log("Header - User clicked, type:", userType);
      // Redirect based on user type
      if (userType === "venue_owner") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } else {
      console.log(
        "Header - No user type found, redirecting to owner dashboard"
      );
      navigate("/dashboard");
    }
  };

  console.log("Header - Current state:", { currentUser, userType });

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
