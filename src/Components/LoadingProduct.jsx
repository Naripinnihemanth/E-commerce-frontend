import React from "react";
import "../css/LoadingProduct.css";
function LoadingProduct() {
  return <div className="loading-product">
    <div className="loading-img"></div>
    <div className="loading-title"></div>
    <div className="loading-ratting"></div>
    <div className="loading-price"></div>
  </div>;
}

export default LoadingProduct;
