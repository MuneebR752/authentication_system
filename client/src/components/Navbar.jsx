import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="topnav">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
}
