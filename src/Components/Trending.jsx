import React, { useEffect, useState } from "react";
import "../css/Trending.css";
import api from "../api";
import LoadingProduct from "./LoadingProduct";
import ProductCard from "./ProductCard";
function Trending() {
  const [trending, setTrending] = useState([]);
  async function getTrending() {
    try {
      const res = await api.get("/products/trending/");
      console.log(res);
      setTrending(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTrending().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div className="tending-container">
      <h1>Trending products</h1>
      <div className="trending-product-container">
        {trending.map((item) => (
          <ProductCard
            title={item.title}
            price={item.price}
            ratting={item.ratting}
            currency={item.currency}
            image={item.image}
            key={item.id}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default Trending;
