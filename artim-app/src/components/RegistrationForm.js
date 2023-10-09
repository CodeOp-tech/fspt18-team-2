import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const RegistrationForm = () => {
  const {
    handleSubmit: handleFormSubmit,
    control,
    errors,
    register,
  } = useForm();
  const [error, setError] = useState("");

  // Function to handle form submission
  const onSubmit = async (formData) => {
    const { email: Email, password: Password, FullName } = formData;
    const dataToSend = { Email, Password, FullName };

    console.log("Formdata:", formData);
    const formData = {
      email: email,
      password: password,
      fullName: fullName, // Include full name in the formData
    };

    try {
      const response = await fetch("http://localhost:5001/auth/register", {
        // Use the correct API endpoint for registration
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // Registration was successful
        console.log("Registration successful");
      } else {
        // Handle registration error
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-white h-screen overflow-hidden flex items-center justify-center font-alegreya-sans">
      <div className="rounded-lg bg-amber-200 lg:w-6/12 md:w-9/12 w-full shadow-2xl text-gray-600 p-8 text-center font-alegreya-sans">
        <h1 className="drop-shadow-md text-5xl font-bold mx-auto text-pink-500 mb-2 font-alegreya-sans">
          Hello friend
        </h1>
        <h3 className="italic mb-12 text-neutral-500">
          Please, enter your details
        </h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1 text-left">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update full name state
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-left">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 text-left">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-400 text-white font-extrabold py-2 px-4 rounded-md hover:bg-teal-600 w-full"
          >
            Register
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegistrationForm;
