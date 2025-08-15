const userPass = [{ user: "Admin", password: "123" }];

function checkLogin(username, password) {
  const foundUser = userPass.find(
    (u) => u.user === username && u.password === password
  );

  return foundUser
    ? { success: true, message: "Login successful!" }
    : { success: false, message: "Invalid username or password." };
}

export default checkLogin;
