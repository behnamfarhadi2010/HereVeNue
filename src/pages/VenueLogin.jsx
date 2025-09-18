import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/ClientLogin.css";
import "../styles/Login.css";
import "../styles/main.css";
import Header from "../components/Header";
import checkLogin from "./checkLogin"; // Import the checkLogin function

const ClientLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", user, password);
    const result = checkLogin(user, password);
    console.log("Login result:", result);

    setMessage(result.message);
    if (result.success && typeof window !== "undefined") {
      localStorage.setItem("authUser", user);
      console.log("User stored in localStorage");
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="Clientlogin-page">
          <div className="Clientlogin-title">
            <span className="Clientlogin-icon">🏠</span>
            <h1>Venue login</h1>
          </div>

          <form className="Clientlogin-box-user" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="user"
              className="Clientlogin-input"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="Clientlogin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="Clientlogin-btn-usr">
              Log in
            </button>

            {message && (
              <p
                style={{
                  marginTop: 10,
                  color: message.includes("Invalid") ? "red" : "green",
                }}
              >
                {message}
              </p>
            )}

            <div className="Clientline" />
            <p>
              Don't have an account?{" "}
              <a href="#" className="Clientsignup-link">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ClientLogin;

// import React from "react";

// import "../styles/VenueLogin.css";
// import "../styles/Login.css";
// import "../styles/main.css";
// import Header from "../components/Header";

// const VenueLogin = () => {
//   return (
//     <div>
//       <Header />

//       <main>
//         <div className="Venuelogin-page">
//           <div className="Venuelogin-title">
//             <span className="Venuelogin-icon">🏠</span>
//             <h1>Venue login</h1>
//           </div>

//           <div className="Venuelogin-box-user">
//             <input
//               type="email"
//               placeholder="Email address"
//               className="Venuelogin-input"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="Venuelogin-input"
//             />

//             <a href="#" className="Clientforgot-password">
//               Forgot your password?
//             </a>

//             <button className="Venuelogin-btn-usr">Log in</button>

//             <div className="Venueline" />

//             <p>
//               Don’t have a User Account?{" "}
//               <a href="#" className="Venuesignup-link">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VenueLogin;
