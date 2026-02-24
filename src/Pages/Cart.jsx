import React, { useEffect, useState } from "react";
import "../css/Cart.css";
import api from "../api";
import Navbar from "../Components/Navbar";
import { BiRupee } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";

import { MdDelete } from "react-icons/md";
import CartQuantity from "../Components/CartQuantity";
function Cart() {
  const [cart, setCart] = useState([]);
  const [totel, setTotel] = useState(0);
  const [descount, setDescount] = useState(0);
  async function deleteItem(id) {
    try {
      const res = await api.delete(`/products/deletecart/${id}/`);
      if (res.status === 204) {
        getCart();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getTotel() {
    setTotel(0);
    cart.map((it) => {
      let quantityprice = it.quantity * it.item_price;

      setTotel(
        (pre) =>
          pre +
          Math.floor(quantityprice - (it.item_descount / 100) * quantityprice),
      );
    });
  }

  async function getCart() {
    try {
      const res = await api.get("/products/getcart/");
      console.log(res);

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getTotel();
  }, [cart]);

  function getMean() {
    let des = [...cart.map((item) => item.item_descount)];
    return des;
  }

  useEffect(() => {
    setDescount(totel / 10);
  }, [totel]);
  return (
    <div className="cart-page">
      <Navbar></Navbar>
      <h1 className="cart-h1">Shopping cart</h1>
      {cart.length == 0 ? (
        <h1 className="empty-cart">Cart is Empty </h1>
      ) : (
        <div className="cart-container">
          <div className="items-container">
            {cart
              ? cart.map((item) => (
                  <div className="cart-item-card" key={item.id}>
                    <Link to={`/details/${item.item_id}`}>
                      <img src={item.item_image} alt="error" width={"100px"} />
                    </Link>
                    <div className="title-color">
                      <h3>{item.item_title}</h3>
                      <p>{item.item_color}</p>
                    </div>
                    <CartQuantity
                      id={item.id}
                      price={item.item_price}
                      getPrice={getTotel}
                      descount={item.item_descount}
                    ></CartQuantity>

                    <div
                      className="item-delet"
                      onClick={() => deleteItem(item.id)}
                    >
                      <MdDelete />
                    </div>
                    <Link to={`/payment/${item.id}`} className="cart-buy">
                      Buy
                    </Link>
                  </div>
                ))
              : null}
          </div>
          {/* <div className="order-summery">
            <h3>Order Summary</h3>
            <div className="summery-price">
              <div className="sub-totel">
                <p>Sub Totel</p>
                <p>{totel} INR</p>
              </div>
              <div className="descount">
                <p>Descount(10%)</p>
                <p>{descount} INR</p>
              </div>
              <div className="delivery-charge">
                <p>delivery fee</p>
                <p>85 INR</p>
              </div>
            </div>
            <div className="grand-totel">
              <p>Totel</p>
              <p>{totel - descount + 85}</p>
            </div>
            <button className="check-out-btn">Check Out</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Cart;
