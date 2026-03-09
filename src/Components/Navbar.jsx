import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { HiMenu } from "react-icons/hi";
import ComponentProtect from "./ComponentProtect";
import api from "../api";
import NavProfile from "./NavProfile";
function Navbar() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  async function getData() {
    try {
      const res_categories = await api.get(`/products/getcategory/`);
      console.log(res_categories);
      setCategories(res_categories.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="navbar">
      <button popoverTarget="side" className="menu">
        <HiMenu />
      </button>
      <div className="side" popover="auto" id="side">
        <a href="#recomended" className="side-item">
          Recommended
        </a>
        <a href="#trending" className="side-item">
          Trending
        </a>
        <a href="#history" className="side-item">
          History
        </a>
        <button className="side-item">Categories</button>
      </div>

      <h1>TrendX</h1>
      <div className="category">
        <a href="#recomended" className="category-item">
          Recommended
        </a>
        <a href="#trending" className="category-item">
          Trending
        </a>
        <button className="category-item cate-btn" popoverTarget="cat">
          Categories
        </button>
        <a href="#history" className="category-item">
          History
        </a>
      </div>
      <div className="categoriess" popover="auto" id="cat">
        {categories.map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
      <ComponentProtect>
        <NavProfile></NavProfile>
      </ComponentProtect>
    </div>
  );
}

export default Navbar;
