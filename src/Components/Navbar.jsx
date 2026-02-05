import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { FaCartShopping } from "react-icons/fa6";
import Protected from "./Protected";
import { HiMenu } from "react-icons/hi";
import ComponentProtect from "./ComponentProtect";
import { Link } from "react-router-dom";
import api from "../api";
function Navbar() {
  const [profilePic, setProfilePic] = useState([
    {
      auther: null,
      bio: "",
      profile: "https://placehold.co/20",
    },
  ]);

  async function getProfilePic() {
    try {
      const res = await api.get(`/api/getProfile/`);
      console.log(res.data);
      setProfilePic(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <div className="navbar">
      <HiMenu className="menu" />
      <h1>E-COMMERCE</h1>
      <div className="category"></div>
      <div className="icons">
        <ComponentProtect>
          <div className="profile">
            <FaCartShopping className="icon" />
            <Link to={"/profile"}>
              <img
                src={profilePic.map((item) => item.profile)}
                className="profile-pic"
                alt="img  "
              />
            </Link>
          </div>
        </ComponentProtect>
      </div>
    </div>
  );
}

export default Navbar;
