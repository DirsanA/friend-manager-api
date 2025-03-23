import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message

  async function Submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/users/createUser",
        { name, email }
      );
      console.log(response);

      // ✅ Show success message
      setSuccessMessage("Success!");

      // ✅ Clear input fields
      setName("");
      setEmail("");

      // ✅ Remove success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Hide message after 3 seconds
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center bg-black min-h-screen text-white">
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg w-80">
        <h1 className="mb-4 font-semibold text-xl text-center">Register</h1>

        {/* ✅ Success message appears when registration is successful */}
        {successMessage && (
          <p className="bg-green-500 mb-3 p-2 rounded-md text-white text-center">
            {successMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={Submit}>
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-2 rounded-md w-full font-semibold text-white transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
