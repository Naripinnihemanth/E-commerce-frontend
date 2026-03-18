import React, { useEffect } from "react";
import "../css/CategoryProducts.css";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
function CategoryProducts() {
  const param = useParams();
  const [products, setProducts] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState({
    min: 0,
    max: 99999,
  });
  const [ratingRange, setRatingRange] = React.useState({
    min: 0,
    max: 5,
  });
  const [brand, setBrand] = React.useState("");

  const filteredProducts = products.filter((product) => {
    const priceOk =
      product.price >= priceRange.min && product.price <= priceRange.max;

    const ratingOk =
      (product.ratting || 0) >= ratingRange.min &&
      (product.ratting || 0) <= ratingRange.max;

    const brandOk = brand === "" || product.brand === brand;

    return priceOk && ratingOk && brandOk;
  });

  async function fetchCategoryProducts() {
    try {
      const response = await api.get(`/products/categoryproducts/${param.id}/`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handlePriceChange(e) {
    const value = e.target.value;
    if (value === "price") {
      setPriceRange({ min: 0, max: 99999 });
    } else {
      const [min, max] = value.split("-").map(Number);
      setPriceRange({ min, max });
    }
  }
  function handleRatingChange(e) {
    const value = e.target.value;
    if (value === "rating") {
      setRatingRange({ min: 0, max: 5 });
    } else {
      const [min, max] = value.split("-").map(Number);
      setRatingRange({ min, max });
    }
  }
  useEffect(() => {
    fetchCategoryProducts();
  }, []);
  useEffect(() => {
    products.map((product) => {
      if (!brands.includes(product.brand)) {
        setBrands((prevBrands) => [...prevBrands, product.brand]);
      }
    });
  }, [products]);
  useEffect(() => {}, [brand, priceRange, ratingRange]);

  return (
    <div className="category-products">
      <Navbar></Navbar>
      <div className="filters">
        <select name="price" id="price" onChange={handlePriceChange}>
          <option value="price">price</option>
          <option value="500-1000">500 - 1000</option>
          <option value="1000-2000">1000 - 2000</option>
          <option value="2000-5000">2000 - 5000</option>
        </select>
        <select name="rating" id="rating" onChange={handleRatingChange}>
          <option value="rating">rating</option>
          <option value="3-4">3 - 4</option>
          <option value="4-5">4 - 5</option>
        </select>
        <select
          name="brands"
          id="brands"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">brands</option>
          {brands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <div className="filterd-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
