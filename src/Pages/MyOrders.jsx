import React, { useEffect, useState } from "react";
import "../css/MyOrders.css";
import api from "../api";
import GetProduct from "../Components/GetProduct";
import GetAddress from "../Components/GetAddress";
import Navbar from "../Components/Navbar";
import { SlHandbag } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import { BsChevronDoubleRight } from "react-icons/bs";
function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [all, setAll] = useState(true);
  const [pending, setPending] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [refunded, setRefunded] = useState(false);

  async function getOrders() {
    try {
      const res = await api.get("/api/getorder/");
      setOrders(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="my-orders-container">
      <button className="pop-up-btn" popoverTarget="orders-side">
        <BsChevronDoubleRight />
      </button>
      <Navbar></Navbar>
      <div className="orders-side-bar" popover="auto" id="orders-side">
        <p
          onClick={() => {
            setAll(true);
            setAccepted(false);
            setCancelled(false);
            setFailed(false);
            setPending(false);
            setRefunded(false);
          }}
          className={all ? "item-active" : ""}
        >
          All
        </p>
        <p
          onClick={() => {
            setAll(false);
            setAccepted(true);
            setCancelled(false);
            setFailed(false);
            setPending(false);
            setRefunded(false);
          }}
          className={accepted ? "item-active" : ""}
        >
          Accepted
        </p>
        <p
          onClick={() => {
            setAll(false);
            setAccepted(false);
            setCancelled(false);
            setFailed(false);
            setPending(true);
            setRefunded(false);
          }}
          className={pending ? "item-active" : ""}
        >
          Pending
        </p>
        <p
          onClick={() => {
            setAll(false);
            setAccepted(false);
            setCancelled(false);
            setFailed(true);
            setPending(false);
            setRefunded(false);
          }}
          className={failed ? "item-active" : ""}
        >
          failed
        </p>
        <p
          onClick={() => {
            setAll(false);
            setAccepted(false);
            setCancelled(true);
            setFailed(false);
            setPending(false);
            setRefunded(false);
          }}
          className={cancelled ? "item-active" : ""}
        >
          cancelled
        </p>
        <p
          onClick={() => {
            setAll(false);
            setAccepted(false);
            setCancelled(false);
            setFailed(false);
            setPending(false);
            setRefunded(true);
          }}
          className={refunded ? "item-active" : ""}
        >
          refunded
        </p>
      </div>
      <div className="orders">
        {all
          ? orders.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-header">
                  <h3>
                    <SlHandbag /> OID{item.id}
                  </h3>
                  {item.payment_status === "pending" ? (
                    <p
                      style={{
                        color: "blue",
                        background: "rgba(0, 0, 255, 0.2)",
                        fontSize: ".7rem",
                        border: "1px solid",
                        padding: "0px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      pending
                    </p>
                  ) : null}
                  {item.payment_status === "accepted" ? (
                    <p
                      style={{
                        color: "green",
                        background: "rgba(0, 128, 0, 0.2)",
                        fontSize: ".7rem",
                        border: "1px solid",
                        padding: "0px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      Accepted
                    </p>
                  ) : null}
                  {item.payment_status === "refunded" ? (
                    <p
                      style={{
                        color: "rgb(255, 196, 0)",
                        background: "rgba(255, 196, 0, 0.2)",
                        fontSize: ".7rem",
                        border: "1px solid",
                        padding: "0px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      Refunded
                    </p>
                  ) : null}
                  {item.payment_status === "failed" ? (
                    <p
                      style={{
                        color: "red",
                        background: "rgba(255, 0, 0, 0.2)",
                        fontSize: ".7rem",
                        border: "1px solid",
                        padding: "0px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      failed
                    </p>
                  ) : null}
                  {item.payment_status === "cancelled" ? (
                    <p
                      style={{
                        background: "rgba(255, 0, 0, 0.2)",
                        fontSize: ".7rem",
                        color: "red",
                        border: "1px solid",
                        padding: "0px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      cancelled
                    </p>
                  ) : null}
                </div>
                <GetAddress address={item.address}></GetAddress>
                <GetProduct product={item.product_id}></GetProduct>
                <div className="order-footer">
                  <p>
                    <span>Quantity : </span>
                    {item.quantity}
                  </p>
                  <p>
                    <span>Totel : </span>
                    {item.totel_amount}
                  </p>
                </div>
              </div>
            ))
          : null}
        {pending
          ? orders.map((item) => {
              if (item.payment_status === "pending") {
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-header">
                      <h3>
                        <SlHandbag /> OID{item.id}
                      </h3>
                      {item.payment_status === "pending" ? (
                        <p
                          style={{
                            color: "blue",
                            background: "rgba(0, 0, 255, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          pending
                        </p>
                      ) : null}
                      {item.payment_status === "accepted" ? (
                        <p
                          style={{
                            color: "green",
                            background: "rgba(0, 128, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Accepted
                        </p>
                      ) : null}
                      {item.payment_status === "refunded" ? (
                        <p
                          style={{
                            color: "rgb(255, 196, 0)",
                            background: "rgba(255, 196, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Refunded
                        </p>
                      ) : null}
                      {item.payment_status === "failed" ? (
                        <p
                          style={{
                            color: "red",
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          failed
                        </p>
                      ) : null}
                      {item.payment_status === "cancelled" ? (
                        <p
                          style={{
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            color: "red",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          cancelled
                        </p>
                      ) : null}
                    </div>
                    <GetAddress address={item.address}></GetAddress>
                    <GetProduct product={item.product_id}></GetProduct>
                    <div className="order-footer">
                      <p>
                        <span>Quantity : </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span>Totel : </span>
                        {item.totel_amount}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
        {accepted
          ? orders.map((item) => {
              if (item.payment_status === "accepted") {
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-header">
                      <h3>
                        <SlHandbag /> OID{item.id}
                      </h3>
                      {item.payment_status === "pending" ? (
                        <p
                          style={{
                            color: "blue",
                            background: "rgba(0, 0, 255, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          pending
                        </p>
                      ) : null}
                      {item.payment_status === "accepted" ? (
                        <p
                          style={{
                            color: "green",
                            background: "rgba(0, 128, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Accepted
                        </p>
                      ) : null}
                      {item.payment_status === "refunded" ? (
                        <p
                          style={{
                            color: "rgb(255, 196, 0)",
                            background: "rgba(255, 196, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Refunded
                        </p>
                      ) : null}
                      {item.payment_status === "failed" ? (
                        <p
                          style={{
                            color: "red",
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          failed
                        </p>
                      ) : null}
                      {item.payment_status === "cancelled" ? (
                        <p
                          style={{
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            color: "red",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          cancelled
                        </p>
                      ) : null}
                    </div>
                    <GetAddress address={item.address}></GetAddress>
                    <GetProduct product={item.product_id}></GetProduct>
                    <div className="order-footer">
                      <p>
                        <span>Quantity : </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span>Totel : </span>
                        {item.totel_amount}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
        {failed
          ? orders.map((item) => {
              if (item.payment_status === "failed") {
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-header">
                      <h3>
                        <SlHandbag /> OID{item.id}
                      </h3>
                      {item.payment_status === "pending" ? (
                        <p
                          style={{
                            color: "blue",
                            background: "rgba(0, 0, 255, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          pending
                        </p>
                      ) : null}
                      {item.payment_status === "accepted" ? (
                        <p
                          style={{
                            color: "green",
                            background: "rgba(0, 128, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Accepted
                        </p>
                      ) : null}
                      {item.payment_status === "refunded" ? (
                        <p
                          style={{
                            color: "rgb(255, 196, 0)",
                            background: "rgba(255, 196, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Refunded
                        </p>
                      ) : null}
                      {item.payment_status === "failed" ? (
                        <p
                          style={{
                            color: "red",
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          failed
                        </p>
                      ) : null}
                      {item.payment_status === "cancelled" ? (
                        <p
                          style={{
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            color: "red",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          cancelled
                        </p>
                      ) : null}
                    </div>
                    <GetAddress address={item.address}></GetAddress>
                    <GetProduct product={item.product_id}></GetProduct>
                    <div className="order-footer">
                      <p>
                        <span>Quantity : </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span>Totel : </span>
                        {item.totel_amount}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
        {refunded
          ? orders.map((item) => {
              if (item.payment_status === "refunded") {
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-header">
                      <h3>
                        <SlHandbag /> OID{item.id}
                      </h3>
                      {item.payment_status === "pending" ? (
                        <p
                          style={{
                            color: "blue",
                            background: "rgba(0, 0, 255, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          pending
                        </p>
                      ) : null}
                      {item.payment_status === "accepted" ? (
                        <p
                          style={{
                            color: "green",
                            background: "rgba(0, 128, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Accepted
                        </p>
                      ) : null}
                      {item.payment_status === "refunded" ? (
                        <p
                          style={{
                            color: "rgb(255, 196, 0)",
                            background: "rgba(255, 196, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Refunded
                        </p>
                      ) : null}
                      {item.payment_status === "failed" ? (
                        <p
                          style={{
                            color: "red",
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          failed
                        </p>
                      ) : null}
                      {item.payment_status === "cancelled" ? (
                        <p
                          style={{
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            color: "red",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          cancelled
                        </p>
                      ) : null}
                    </div>
                    <GetAddress address={item.address}></GetAddress>
                    <GetProduct product={item.product_id}></GetProduct>
                    <div className="order-footer">
                      <p>
                        <span>Quantity : </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span>Totel : </span>
                        {item.totel_amount}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
        {cancelled
          ? orders.map((item) => {
              if (item.payment_status === "cancelled") {
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-header">
                      <h3>
                        <SlHandbag /> OID{item.id}
                      </h3>
                      {item.payment_status === "pending" ? (
                        <p
                          style={{
                            color: "blue",
                            background: "rgba(0, 0, 255, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          pending
                        </p>
                      ) : null}
                      {item.payment_status === "accepted" ? (
                        <p
                          style={{
                            color: "green",
                            background: "rgba(0, 128, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Accepted
                        </p>
                      ) : null}
                      {item.payment_status === "refunded" ? (
                        <p
                          style={{
                            color: "rgb(255, 196, 0)",
                            background: "rgba(255, 196, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          Refunded
                        </p>
                      ) : null}
                      {item.payment_status === "failed" ? (
                        <p
                          style={{
                            color: "red",
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          failed
                        </p>
                      ) : null}
                      {item.payment_status === "cancelled" ? (
                        <p
                          style={{
                            background: "rgba(255, 0, 0, 0.2)",
                            fontSize: ".7rem",
                            color: "red",
                            border: "1px solid",
                            padding: "0px 20px",
                            borderRadius: "10px",
                          }}
                        >
                          cancelled
                        </p>
                      ) : null}
                    </div>
                    <GetAddress address={item.address}></GetAddress>
                    <GetProduct product={item.product_id}></GetProduct>
                    <div className="order-footer">
                      <p>
                        <span>Quantity : </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span>Totel : </span>
                        {item.totel_amount}
                      </p>
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default MyOrders;
