import React, { useEffect, useState } from "react";
import api from "../api";
import "../css/Recomendations.css";
import ProductCard from "./ProductCard";
import LoadingProduct from "./LoadingProduct";
function Recomendations() {
  const [recomended, setRecomended] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getRecomend() {
    try {
      setLoading(true);
      const res = await api.get("/api/recomendations/");
      setRecomended(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRecomend();
  }, []);
  return (
    <div className="recomendations-container" id="recomended">
      <h1>Recomended For You</h1>
      <div className="recomended-items-container">
        {loading ? (
          <>
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
          </>
        ) : (
          recomended.map((item) => (
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
              descount={item.descount}
              views={item.views}
            ></ProductCard>
          ))
        )}
      </div>
    </div>
  );
}

export default Recomendations;
