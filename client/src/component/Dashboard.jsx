import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null); // State to store the single user object
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // State to handle error message
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/logout");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/auth/userdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
            withCredentials: true,
          }
        );
        setUser(response.data); // Set the single user object in the state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Failed to load user data"); // Set error message
        setLoading(false); // Stop loading on error
        toast.error("Failed to load user data", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };
    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty array ensures the effect runs only once when component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex min-h-full flex-1 gap-5 flex-col justify-center px-6 py-12 lg:px-8 border rounded-md">
      <h2 className="text-center text-3xl text-gray-200">Hi {user.name}</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
