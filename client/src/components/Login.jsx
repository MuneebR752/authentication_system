import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  let navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  let [formData, setFormData] = useState({
    username: "",
    password: "",
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
      .post("http://localhost:5000/login", formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
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
        <h3>Login Here</h3>
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
        <button type="submit">Log In</button>

        <p>
          Don't have an Account? <Link to="/signup">Click Here</Link>
        </p>
        <p style={{ textAlign: "center" }}>Forget Password?</p>
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
