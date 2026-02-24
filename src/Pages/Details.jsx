import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import "../css/Details.css";
import Message from "../Components/Message";
function Details() {
  const [Product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  async function setCart() {
    try {
      const res = await api.post("/products/setcart/", {
        item_id: Product.id,
        item_title: Product.title,
        item_color: Product.color,
        item_image: Product.image,
        item_price: Product.price,
      });
      if (res.status === 201) {
        setMessage("added to cart");
      }
    } catch (err) {
      setMessage(err.statusText);
    }
  }

  function buy() {
    navigate(`/payment/${Product.id}`);
  }

  async function getProduct() {
    try {
      const res = await api.get(`/products/getProduct/${params.id}/`);
      setProduct(res.data);
    } catch (err) {
      navigate("/notfound");
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="details-page">
      {message != "" ? <Message msg={message}></Message> : null}

      <Navbar></Navbar>
      <div className="details-container">
        <div className="img">
          <img src={Product.image} alt="error" width={"100px"} />
        </div>
        <div className="meta-data">
          <h1>{Product.title}</h1>
          <h3>{Product.brand}</h3>
          <div className="ratting-stars">
            {[...Array(5)].map((item, i) => (
              <FaStar
                className={Math.floor(Product.ratting) > i ? "star" : "star-no"}
                key={i}
              />
            ))}
            <p>({Product.ratting})</p>
          </div>
          <div className="product-color">
            <p>Product color :</p>
            <div
              style={{
                background: Product.color,
                width: "20px",
                height: "20px",
                border: "0.5px solid",
              }}
            ></div>
          </div>
          <div className="avilable-stock">
            <p>Avilable stock :</p>
            <p>{Product.stock}</p>
          </div>
          <div className="current-price">
            <p>price</p>
            <h2 style={{ display: "flex", alignItems: "end" }}>
              {Math.floor(
                Product.price - (Product.descount / 100) * Product.price,
              )}
              <span>{Product.currency}</span> /
              <p className="actual-price">{Product.price}</p>
            </h2>
          </div>
          <div className="buttons">
            <button className="details-cart" onClick={setCart}>
              Cart
            </button>
            <button className="details-buy" onClick={buy}>
              Buy
            </button>
          </div>
          <div className="details-description">
            <h1 style={{ fontSize: "1.2rem" }}>Description</h1>
            <p>{Product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
