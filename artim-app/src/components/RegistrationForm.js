import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const RegistrationForm = () => {
  const { handleSubmit: handleFormSubmit, control, errors, register } = useForm();
  const [error, setError] = useState("");

  // Function to handle form submission
  const onSubmit = async (formData) => {
    const { email: Email, password: Password, FullName } = formData;
    const dataToSend = { Email, Password, FullName }; 

    console.log("Formdata:", formData);

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
    <div className="flex flex-col items-center justify-center main-h-screen py-2">
      <h2>Registration</h2>
      <form onSubmit={handleFormSubmit((data) => onSubmit(data))}>
        <div>
          <label htmlFor="FullName">FullName:</label>
          <input
            type="text"
            id="FullName"
            {...register("FullName")} // Use the corrected register function
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            {...register("email")} // Use the corrected register function
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="Password"
            {...register("password")} // Use the corrected register function
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegistrationForm;
