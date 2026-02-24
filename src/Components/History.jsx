import React, { useEffect, useState } from "react";
import api from "../api";
import "../css/History.css";
import ProductCard from "./ProductCard";
import HistoryProduct from "./HistoryProduct";
function History() {
  const [history, setHistory] = useState([]);
  async function getHistory() {
    try {
      setHistory([]);
      const res = await api.get("/api/gethistory/");
      setHistory(res.data);
      setHistory((prev) => [...prev].reverse());
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="history-container" id="history">
      <h1>History</h1>
      <div className="card-wrapper">
        {history.map((item) => (
          <HistoryProduct
            id={item.id}
            productId={item.product_id}
            title={item.title}
            price={item.price}
            image={item.image}
            key={item.id}
            category={item.category}
            reload={getHistory}
          ></HistoryProduct>
        ))}
      </div>
    </div>
  );
}

export default History;
