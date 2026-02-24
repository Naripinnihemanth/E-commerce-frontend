import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Protected from "./Components/Protected";
import Error from "./Pages/Error";
import Forget from "./Pages/Forget";
import Details from "./Pages/Details";
import Cart from "./Pages/Cart";
import Payments from "./Pages/Payments";
import Address from "./Pages/Address";
import MyOrders from "./Pages/MyOrders";
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
        <Route path="/error" element={<Error />}></Route>
        <Route path="/forget" element={<Forget />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/payment/:id" element={<Payments />}></Route>
        <Route path="/myaddress" element={<Address />}></Route>
        <Route path="/myorders" element={<MyOrders />}></Route>
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        ></Route>
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
