import React, { useState } from "react";
import "../css/ProductCard.css";
import { FaStar } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Message from "./Message";
function ProductCard({
  id,
  title,
  price,
  ratting,
  currency,
  image,
  category,
  color,
  views,
  descount,
}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  async function setHistory() {
    try {
      const res = await api.post(`/api/sethistory/`, {
        product_id: id,
        title: title,
        category: category,
        price: price,
        image: image,
      });
      const upd = await api.patch(`/products/viewsincreas/${id}/`, {
        views: views + 1,
      });

      if (res.status === 201) {
        navigate(`/details/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function setCart() {
    try {
      const res = await api.post("/products/setcart/", {
        item_id: id,
        item_title: title,
        item_color: color,
        item_image: image,
        item_price: price,
        item_descount: descount,
      });
      if (res.status === 201) {
        setMessage("added to cart");
      }
    } catch (err) {
      setMessage(err.statusText);
    }
  }

  return (
    <>
      {message != "" ? <Message msg={message}></Message> : null}
      <div className="product-card">
        {views > 1000 ? <p className="trending-logo">Best Seller</p> : null}
        <img
          src={image}
          alt="error"
          width={"100px"}
          height={"100px"}
          className="product-img"
          onClick={() => setHistory()}
        />
        <h5 className="product-title">{title}</h5>
        <div className="product-ratting">
          <FaStar className="star" />
          <p>{ratting}</p>
        </div>
        <div className="product-price">
          <p className="actual-price">{price}</p>
          <p className="currency-icon">
            {currency === "inr" ? <BiRupee /> : "$"}
          </p>
          <p>{Math.floor(price - (descount / 100) * price)}</p>
        </div>
        <button className="product-cart" onClick={setCart}>
          Cart
        </button>
        <Link to={`/payment/${id}`} className="product-Buy">
          Buy
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
