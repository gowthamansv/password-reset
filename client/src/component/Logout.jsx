import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the backend logout endpoint
        await axios.post(
          "https://password-reset-3kti.onrender.com/api/v1/auth/logout",
          {},
          { withCredentials: true } // Include cookies in the request
        );

        // Clear local storage (if you stored user data there)
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show a success toast
        toast.success("Logged out successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });

        // Redirect to login page after logout
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        // Handle error if logout fails
        toast.error("Failed to log out. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
