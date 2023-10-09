import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function LoginForm() {
  // State to manage form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
 
  const { isLogged, login, logout, token } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    

    const formData = {
      Email: email,
      Password: password,
    };

    console.log("FormData",formData);

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to a dashboard or home page upon successful login
        // window.location.href = "/dashboard";

        // Parse the response to get the token
        const data = await response.json();
        const { token } = data;

        // Set the localStorage to access token in all app
        localStorage.setItem("token", token);

        // Set the token in the state
        login(token);
       

        console.log("User logged in successfully");
        console.log("token--->", token);
      } else {
        // Handle login error
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during login.");
        console.log(error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

 const handleLogout = () => {
   logout();
   console.log("User Logged out!!")
  };

  return (
    <div>
      <h2>Login</h2>
      {isLogged ? (
        <div>
          <p className="success-message">Logged in successfully!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginForm;