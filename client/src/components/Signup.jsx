import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  let [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();
  let [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  let changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={submit}>
        <h3>SignUp Here</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Email or Phone"
          id="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <button type="submit">Sign Up</button>

        <p>
          Already have an Account? <Link to="/login">Click Here</Link>
        </p>
        <div className="social">
          <div className="go">
            <i className="fab fa-google" /> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook" /> Facebook
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
