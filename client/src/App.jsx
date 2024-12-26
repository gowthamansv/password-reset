import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/Register.jsx";
import ForgotPassword from "./component/ForgotPassword.jsx";
import PasswordReset from "./component/PasswordReset.jsx";
import "./App.css";
import Dashboard from "./component/Dashboard.jsx";
import Login from "./component/login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./component/Logout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
