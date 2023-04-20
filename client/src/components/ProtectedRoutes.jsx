import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .post("http://localhost:5000/api/auth", { token })
        .then((res) => {
          if (res.data.authentication) {
            setAuth(true);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  return auth ? children : null;
}
