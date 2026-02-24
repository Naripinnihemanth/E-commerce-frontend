import React, { useState } from "react";
import "../css/HistoryProduct.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { MdDelete } from "react-icons/md";
function HistoryProduct({
  id,
  productId,
  title,
  price,
  image,
  category,
  reload,
}) {
  const navigate = useNavigate();
  async function setHistory() {
    try {
      const res = await api.post(`/api/sethistory/`, {
        product_id: productId,
        title: title,
        category: category,
        price: price,
        image: image,
      });

      if (res.status === 201) {
        navigate(`/details/${productId}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteHistory() {
    try {
      const res = await api.delete(`/api/deletehistory/${id}/`);
      if (res.status === 204) {
        reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="history-product-card">
        <button onClick={deleteHistory} className="delet-btn">
          <MdDelete />
        </button>
        <img
          src={image}
          alt="error"
          width={"100px"}
          height={"100px"}
          className="history-product-img"
          onClick={() => setHistory()}
        />
        <div className="history-title-container">
          <h5 className="history-product-title">{title}</h5>
        </div>
      </div>
    </>
  );
}

export default HistoryProduct;
