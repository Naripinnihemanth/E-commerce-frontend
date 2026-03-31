import React, { useState } from "react";
import "../css/ProductCard.css";
import { FaStar } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Message from "./Message";
import { FaHeart } from "react-icons/fa";
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
      {message !== "" ? <Message msg={message}></Message> : null}

      <div className="product-card">
        {views > 1000 && <span className="badge">Best Seller</span>}
        <button className="wishlist">
          <FaHeart />
        </button>
        <div className="image-container" onClick={() => setHistory()}>
          <img src={image} alt={title} />
        </div>

        <div className="product-info">
          <h4 className="title">{title}</h4>

          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < ratting ? "star filled" : "star"}
              />
            ))}
          </div>

          <div className="price-section">
            <span className="discount-price">
              {currency === "inr" ? <BiRupee /> : "$"}
              {Math.floor(price - (descount / 100) * price)}
            </span>

            <span className="actual-price">
              {currency === "inr" ? <BiRupee /> : "$"}
              {price}
            </span>
            <span className="discount-badge">{descount}% OFF</span>
          </div>

          <div className="buttons">
            <button className="cart-btn" onClick={setCart}>
              Add to Cart
            </button>

            <Link to={`/payment/${id}`} className="buy-btn">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
