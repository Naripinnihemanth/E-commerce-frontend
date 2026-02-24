import React, { useEffect, useState } from "react";
import "../css/GetProduct.css";
import api from "../api";
function GetProduct({ product }) {
  const [orderProduct, setOrderProduct] = useState({});
  async function getProduct() {
    try {
      const product_res = await api.get(`/products/getProduct/${product}/`);
      setOrderProduct(product_res.data);
      console.log(product_res);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="order-product">
      <div
        style={{
          backgroundImage: `url(${orderProduct.image})`,
          backgroundSize: "65px",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
          objectFit: "contain",
          borderRadius: "10px",
        }}
      ></div>
      <div className="order-product-details">
        <h3>{orderProduct.title}</h3>
        <p>
          <span>Price : </span>
          {orderProduct.price}
        </p>
      </div>
    </div>
  );
}

export default GetProduct;
