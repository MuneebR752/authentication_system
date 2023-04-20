import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className="topnav">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/about">About</NavLink>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Log out
      </div>
      <NavLink style={{ float: "right" }} to="/change-password">
        Change Password
      </NavLink>
    </div>
  );
}
