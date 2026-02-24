import React, { useEffect, useState } from "react";
import "../css/CartQuantity.css";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { BiRupee } from "react-icons/bi";
import api from "../api";
import { FaQ } from "react-icons/fa6";
function CartQuantity({ id, price, getPrice, descount }) {
  const [itemQ, setItemQ] = useState(0);
  async function incressQuantity() {
    try {
      setItemQ((pre) => pre + 1);
      const incRes = await api.patch(`/products/setquantity/${id}/`, {
        quantity: itemQ + 1,
      });
      getPrice();
    } catch (err) {
      console.log(err);
    }
  }
  async function decressQuantity() {
    try {
      if (itemQ >= 1) {
        setItemQ((pre) => pre - 1);
        const deRes = await api.patch(`/products/setquantity/${id}/`, {
          quantity: itemQ - 1,
        });
        getPrice();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function quantity() {
    try {
      const res = await api(`/products/setquantity/${id}/`);
      setItemQ(res.data.quantity);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    quantity();
  });
  return (
    <div className="quantity-container">
      {/* <div className="quntity">
        <div>
          <CiCirclePlus onClick={incressQuantity} />
        </div>
        <p>{itemQ}</p>
        <div>
          <CiCircleMinus onClick={decressQuantity} />
        </div>
      </div> */}
      <p className="price">
        <BiRupee />
        {Math.floor(price * itemQ - (descount / 100) * price * itemQ)}
      </p>
    </div>
  );
}

export default CartQuantity;
