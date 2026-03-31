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
    <div className="history-card">
      <div className="history-img-wrapper">
        <img
          src={image}
          alt={title}
          className="history-img"
          onClick={setHistory}
        />

        <div className="overlay">
          <h5>{title}</h5>
        </div>

        <button className="delete-btn" onClick={deleteHistory}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default HistoryProduct;
