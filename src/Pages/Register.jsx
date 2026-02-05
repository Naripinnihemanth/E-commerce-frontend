import React, { useState } from "react";
import api from "../api";
import { FaRegUser, FaLock, FaInfoCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import "../css/Register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function register(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/api/register/", {
        username: username,
        password: password,
        first_name: firstName,
        last_name: LastName,
        email: email,
      });
      console.log(res);
      if (res.status === 201) {
        navigate("/login");
        setLoading(false);
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <form
        onSubmit={(e) => {
          register(e);
        }}
      >
        <Link to={"/"} className="login-home-btn">
          <FaArrowLeft />
        </Link>
        <h1>USER SIGNUP</h1>
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
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <div className="input username">
          <label htmlFor="firstname">
            <FaInfoCircle />
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First name"
          />
        </div>
        <div className="input password">
          <label htmlFor="lastname">
            <FaInfoCircle />
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last name"
          />
        </div>
        <div className="input username">
          <label htmlFor="email">
            <MdEmail />
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
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
          <input type="submit" value="SignUp" className="sub-btn" />
        )}

        <p>
          Already have an account.{" "}
          <Link to={"/login"} style={{ color: "var(--btn)" }}>
            click here{" "}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
