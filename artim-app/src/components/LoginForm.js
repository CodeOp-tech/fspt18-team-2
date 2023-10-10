import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import Link from "next/link";

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
    
    <div className="bg-white h-screen overflow-hidden flex items-center justify-center font-alegreya-sans">
      <div className="rounded-lg bg-neutral-100 lg:w-6/12 md:9/12 w-12/12 shadow-2xl text-black p-8 text-center font-alegreya-sans">
      <h2 className=" drop-shadow-md text-5xl font-bold mx-auto text-teal-400 font-alegreya-sans">Welcome back!</h2>
      <h3 className="italic mb-12 text-neutral-500">
          Please, enter your details
        </h3>
      {isLogged ? (
        <div>
          <p className="success-message">Logged in successfully!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-left">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-left">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200 mb-6"
            />
          </div>
          <button 
          type="submit" 
          className="bg-yellow-300 text-white font-extrabold py-2 px-4 rounded-md hover:bg-yellow-500 w-full mb-8">Log In</button>
        </form>
      )}
      {error && <p className="error-message text-red-700 mb-6">{error}</p>}
      <Link href="/registration" className="text-pink-500">
          <span className="font-bold mb-8 hover:text-pink-700">Or Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;