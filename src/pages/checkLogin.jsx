// checkLogin.jsx
const checkLogin = (username, password) => {
  // Regular user login
  if (username === "Admin" && password === "123") {
    return {
      success: true,
      message: "Login successful!",
      userType: "user", // Add userType
    };
  }

  // Venue owner login (add your venue owner credentials)
  if (username === "owner" && password === "owner123") {
    return {
      success: true,
      message: "Login successful!",
      userType: "venue_owner", // Add userType
    };
  }

  // Add more users as needed...

  return {
    success: false,
    message: "Invalid username or password",
    userType: null,
  };
};

export default checkLogin;
