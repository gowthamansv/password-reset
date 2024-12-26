import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // To store the selected role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://password-reset-3kti.onrender.com/api/v1/auth/register",
        { name, email, password, role },
        { withCredentials: true }
      );

      if (response.data) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl text-gray-200">Sign Up</h2>

        {/* Error Message */}
        {error && (
          <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            required
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            required
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            required
          />

          {/* Radio Inputs for Role */}
          <div className="relative flex items-center cursor-pointer">
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
              className="h-5 w-5 cursor-pointer rounded-full border border-slate-300 checked:border-slate-100 transition-all"
            />
            <label htmlFor="user" className="ml-2 cursor-pointer text-sm">
              User
            </label>
          </div>

          <div className="relative flex items-center cursor-pointer">
            <input
              type="radio"
              id="manager"
              name="role"
              value="Manager"
              checked={role === "Manager"}
              onChange={(e) => setRole(e.target.value)}
              className="h-5 w-5 cursor-pointer rounded-full border border-slate-300 checked:border-slate-100 transition-all"
            />
            <label htmlFor="manager" className="ml-2 cursor-pointer text-sm">
              Manager
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation back to Login */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="a hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
