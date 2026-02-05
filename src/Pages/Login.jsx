import React, { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constents";
import api from "../api.js";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";
import { FaRegUser, FaLock } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/api/login/", {
        username: username,
        password: password,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={(e) => login(e)}>
        <Link to={"/"} className="login-home-btn">
          <FaArrowLeft />
        </Link>
        <h1>USER LOGIN</h1>
        <div className="input username">
          <label htmlFor="username">
            <FaRegUser />
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
        </div>
        <div className="input password">
          <label htmlFor="password">
            <FaLock />
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
        </div>

        {loading ? (
          <input
            type="submit"
            value="Loading..."
            className="sub-btn"
            disabled
          />
        ) : (
          <input type="submit" value="Login" className="sub-btn" />
        )}
        <Link to={"/forget"} className="forget-pass">
          Forget Password ?
        </Link>
        <p>
          Create new account.{" "}
          <Link to={"/register"} style={{ color: "var(--btn)" }}>
            click here{" "}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
