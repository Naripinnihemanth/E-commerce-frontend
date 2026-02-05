import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constents";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const [userStatus, setUserStatus] = useState(null);
  const naviaget = useNavigate();
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

  if (userStatus === null) {
    return <h1>Loading...</h1>;
  }
  return userStatus ? children : naviaget("/login");
}

export default Protected;
