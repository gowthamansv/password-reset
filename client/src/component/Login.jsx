import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://password-reset-3kti.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
        localStorage.setItem("token", data.token); // Save token
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirect to dashboard
        }, 1000);
      } else {
        toast.error(data.message || "Login failed. Please try again.", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="flex bg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl text-gray-200">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base text-gray-200">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-left">
          <p className="text-sm">
            Forgot your password?{" "}
            <Link to="/forgotPassword" className="a hover:underline">
              Forgot Password
            </Link>
          </p>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="a hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
