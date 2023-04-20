import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
export default function ChangePassword() {
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    token: localStorage.getItem("token"),
  });
  let changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/changePassword", formData)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form onSubmit={submit}>
          <h3>Change Password</h3>
          <label htmlFor="current_password">Current Password</label>
          <input
            type="password"
            name="current_password"
            placeholder="Enter Current Password"
            id="current_password"
            value={formData.current_password}
            onChange={changeHandler}
          />
          <label htmlFor="new_password">New Password</label>
          <input
            name="new_password"
            type="password"
            placeholder="Enter New Password"
            id="new_password"
            value={formData.new_password}
            onChange={changeHandler}
          />
          <button type="submit">Change</button>
          <p>
            Don't have an Account? <Link to="/signup">Click Here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
