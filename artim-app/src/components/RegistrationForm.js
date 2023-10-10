import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const RegistrationForm = () => {
  const {
    handleSubmit: handleFormSubmit,
    control,
    errors,
    register,
  } = useForm();
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

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
        setRegistered(true);
      } else {
        // Handle registration error
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", errors);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <div className="bg-white h-screen overflow-hidden flex items-center justify-center font-alegreya-sans">
        <div className="rounded-lg bg-amber-200 lg:w-6/12 md:9/12 w-12/12 shadow-2xl text-black p-8 text-center font-alegreya-sans">
          {!registered && (
            <div>
              <h2 className=" drop-shadow-md text-5xl font-bold mx-auto text-pink-500 font-alegreya-sans">
                Hello friend
              </h2>
              <h3 className="italic mb-12 text-neutral-500">
                Please, enter your details
              </h3>
              <form onSubmit={handleFormSubmit((data) => onSubmit(data))}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block mb-1 text-left">
                    FullName:
                  </label>
                  <input
                    type="text"
                    id="FullName"
                    {...register("FullName")} // Use the corrected register function
                    required
                    className="block w-full rounded-lg py-2 px-3 border border-gray-300 focus:border-pink-300 focus:ring focus:ring-pink-200"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-left">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="Email"
                    {...register("email")} // Use the corrected register function
                    required
                    className="block w-full rounded-lg py-2 px-3 border border-gray-300 focus:border-pink-100 focus:ring focus:ring-pink-200"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-1 text-left">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="Password"
                    {...register("password")} // Use the corrected register function
                    required
                    className="block w-full rounded-lg py-2 px-3 border border-gray-300 focus:border-pink-100 focus:ring focus:ring-pink-200"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-400 text-white font-extrabold py-2 px-4 rounded-lg hover:bg-teal-600 w-full"
                >
                  Register
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}
            </div>
          )}
          ;
          {registered && (
            <div className="bg-white block w-full rounded-md py-2 px-3 border border-gray-400 focus:border-teal-100 focus:ring focus:ring-teal-200 drop-shadow-lg">
              <Link href="/login" className="text-pink-500 ">
                <span className="font-bold mb-8 hover:text-pink-700">
                  {" "}
                  Please Login!{" "}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
