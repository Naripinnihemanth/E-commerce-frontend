import React, { useEffect, useState } from "react";
import "../css/Cart.css";
import api from "../api";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

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
      <Navbar />

      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* LEFT - ITEMS */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <h2 className="empty">Your cart is empty</h2>
          ) : (
            cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.item_image} alt="" />

                <div className="cart-info">
                  <h3>{item.item_title}</h3>
                  <p>{item.item_color}</p>

                  {/* <CartQuantity
                    id={item.id}
                    price={item.item_price}
                    getPrice={getTotel}
                    discount={item.item_descount}
                  /> */}
                </div>

                <div className="cart-actions">
                  <h3>
                    ₹{" "}
                    {Math.floor(
                      item.item_price -
                        (item.item_descount / 100) * item.item_price,
                    )}
                  </h3>

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    <MdDelete />
                  </button>

                  <Link to={`/payment/${item.item_id}`} className="buy-btn">
                    Checkout
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total</span>
            <span>₹ {totel}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>- ₹ {descount}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Final Amount</span>
            <span>₹ {totel - descount}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
