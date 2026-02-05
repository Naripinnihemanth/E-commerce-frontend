import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constents";
import api from "../api";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { jwtDecode } from "jwt-decode";
function ComponentProtect({ children }) {
  const [userStatus, setUserStatus] = useState(false);
  async function refresh() {
    try {
      const refresh_token = localStorage.getItem(REFRESH_TOKEN);

      const res = await api.post("/api/refresh/", {
        refresh: refresh_token,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    } catch (err) {
      console.log(err);
      setUserStatus(false);
    }
  }

  async function validate() {
    const access_token = localStorage.getItem(ACCESS_TOKEN);

    if (!access_token) {
      setUserStatus(false);
      return;
    }
    const decode = jwtDecode(access_token);
    const exp = decode.exp;
    const now = Date.now() / 1000;

    if (exp < now) {
      await refresh();
    } else {
      setUserStatus(true);
    }
  }
  useEffect(() => {
    validate().catch((err) => {
      console.log(err);
    });
  }, []);

  return userStatus ? (
    children
  ) : (
    <Link to={"/login"} className="login-btn">
      Login
    </Link>
  );
}

export default ComponentProtect;
