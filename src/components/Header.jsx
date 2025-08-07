import { Link } from "react-router-dom";
// import './Header.css';

function Header() {
  return (
    <header>
      <Link to="/">
        <img
          src="/src/assets/Blue Yellow Simple Modern Travel Booking Platform Logo (1).png"
          className="logo"
          alt="OVB"
          width="300"
        />
      </Link>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/login">
              <img
                src="/src/assets/person.svg"
                alt="Person icon"
                width="24"
                height="24"
              />
              <span>Log in</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <img
                src="/src/assets/home_24.svg"
                alt="Home icon"
                width="24"
                height="24"
              />
              <span>List your venue</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
