import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import ComponentProtect from "./ComponentProtect";
import { Link } from "react-router-dom";
import api from "../api";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NavProfile from "./NavProfile";
function Navbar() {
  const [profilePic, setProfilePic] = useState([
    {
      auther: null,
      bio: "",
      profile: "https://placehold.co/20",
    },
  ]);
  const [userData, setUserData] = useState({});
  const [userImg, setUserImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  async function getProfilePic() {
    try {
      setLoading(true);
      const res_user = await api.get(`/api/getuser/`);
      const res = await api.get(`/api/getProfile/`);
      setUserData(res_user.data[0]);
      setProfilePic(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function getData() {
    try {
      setUserImg([]);
      const res_data = await api.get(`/api/getProfile/`);
      const res_user = await api.get(`/api/getuser/`);
      const res_categories = await api.get(`/products/getcategory/`);
      console.log(res_categories);
      setCategories(res_categories.data);
      setUserData(res_user.data[0]);
      setUserImg(res_data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
    getProfilePic();
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

      <h1>E-COMMERCE</h1>
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
