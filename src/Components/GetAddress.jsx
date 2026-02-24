import React, { useEffect, useState } from "react";
import "../css/GetAddress.css";
import api from "../api";
import { FaLocationDot } from "react-icons/fa6";
function GetAddress({ address }) {
  const [OrderAddress, setOrderAddress] = useState({});
  async function getAddress() {
    try {
      const address_res = await api.get(`/api/getsingleaddress/${address}/`);
      setOrderAddress(address_res.data);
      console.log(address_res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div className="order-address">
      <h3>Location</h3>
      <p>
        <FaLocationDot /> {OrderAddress.city} , {OrderAddress.state}
      </p>
    </div>
  );
}

export default GetAddress;
