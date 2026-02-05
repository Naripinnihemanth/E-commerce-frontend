import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Protected from "./Components/Protected";
import Error from "./Pages/Error";
import Forget from "./Pages/Forget";
function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to={"/login"} />;
  }
  function Signup() {
    localStorage.clear();
    return <Register />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="/forget" element={<Forget />}></Route>
        <Route
          path="/Profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
