import React from "react";
import "../css/ProductCard.css";
import { FaStar } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
function ProductCard({ title, price, ratting, currency, image }) {
  return (
    <div className="product-card">
      <img
        src={image}
        alt="error"
        width={"100px"}
        height={"100px"}
        className="product-img"
      />
      <h5 className="product-title">{title}</h5>
      <div className="product-ratting">
        <FaStar />
        <p>{ratting}</p>
      </div>
      <div className="product-price">
        <p className="currency-icon">{currency === "inr" ? <BiRupee /> : "$"}</p>
        <p>{price}</p>
      </div>
      <button className="product-cart">Cart</button>
      <button className="product-Buy">Buy</button>
    </div>
  );
}

export default ProductCard;
