import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `https://password-reset-3kti.onrender.com/api/v1/auth/resetpassword/${token}`,
        {
          newPassword,
        }
      );
      toast.success(response.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/"), 2000); // Redirect to homepage after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong hi", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="flex bg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl text-gray-200">Reset Password</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;
