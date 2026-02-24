import React, { useEffect, useState } from "react";
import "../css/Trending.css";
import apiPublic from "../apiPublic";
import LoadingProduct from "./LoadingProduct";
import ProductCard from "./ProductCard";
function Trending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getTrending() {
    setLoading(true);
    try {
      const res = await apiPublic.get("/products/trending/");
      setTrending(res.data);
      setLoading(false);
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
    <div className="tending-container" id="trending">
      <h1>Trending products</h1>
      <div className="trending-product-container">
        {loading
          ? [...Array(10)].map((item, i) => (
              <LoadingProduct key={i}></LoadingProduct>
            ))
          : trending.map((item) => (
              <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                ratting={item.ratting}
                currency={item.currency}
                image={item.image}
                key={item.id}
                category={item.category}
                color={item.color}
                views={item.views}
                descount={item.descount}
              ></ProductCard>
            ))}
      </div>
    </div>
  );
}

export default Trending;
