import { Link } from "react-router-dom";
import Logo from "../assets/ovblogo.png";
import Person from "../assets/person.svg";
import Home24 from "../assets/home_24.svg";
import "../styles/main.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo} className="logo" alt="OVB" width="300" />
      </Link>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/login">
              <img src={Person} alt="Person icon" width="24" height="24" />
              <span>Log in</span>
            </Link>
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
