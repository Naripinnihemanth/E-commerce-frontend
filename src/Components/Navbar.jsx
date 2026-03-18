import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { HiMenu } from "react-icons/hi";
import ComponentProtect from "./ComponentProtect";
import api from "../api";
import NavProfile from "./NavProfile";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  async function getData() {
    try {
      const res_categories = await api.get(`/products/getcategory/`);
      console.log(res_categories);
      setCategories(res_categories.data);
    } catch (err) {
      console.log(err);
    }
  }
  function categoryNavigate(id) {
    navigate(`/category/${id}`);
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
        <select className="side-item category-slide" onChange={(e)=>categoryNavigate(e.target.value)}>
          <option>Categories</option>
          {categories.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.title}
            </option>
          ))}
        </select>
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
          <Link key={item.id} to={`/category/${item.id}`}>
            {item.title}
          </Link>
        ))}
      </div>
      <ComponentProtect>
        <NavProfile></NavProfile>
      </ComponentProtect>
    </div>
  );
}

export default Navbar;
