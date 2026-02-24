import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import ComponentProtect from "./ComponentProtect";
import { Link } from "react-router-dom";
import api from "../api";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function NavProfile() {
  const [profilePic, setProfilePic] = useState([
    {
      auther: null,
      bio: "",
      profile: "/unknown.jpeg",
    },
  ]);
  const [userData, setUserData] = useState({});
  const [userImg, setUserImg] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProfilePic() {
    try {
      setLoading(true);
      const res_user = await api.get(`/api/getuser/`);
      const res = await api.get(`/api/getProfile/`);
      console.log(res);
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
    <div className="icons">
      <div className="profile">
        <Link to={"/cart"} className="icon">
          <FaCartShopping />
        </Link>
        {/* <Link to={"/profile"}>
              <img
                src={profilePic.map((item) => item.profile)}
                className="profile-pic"
                alt="img  "
              />
            </Link> */}
        <button popoverTarget="popup" className="profile-button">
          {profilePic.length == 0 ? (
            <img src="/unknown.jpeg" className="profile-pic" alt="img" />
          ) : (
            <img
              src={profilePic.map((item) => item.profile)}
              className="profile-pic"
              alt="img"
            />
          )}
        </button>
      </div>
      <div className="popup-profle" popover="auto" id="popup">
        {loading ? (
          <div className="profile-loading"></div>
        ) : (
          <div className="profile-content">
            {userImg.length == 0 ? (
              <img src="/unknown.jpeg" alt="error" width={"100px"} />
            ) : (
              <img
                src={userImg.map((item) => item.profile)}
                alt="error"
                width={"100px"}
              />
            )}
            <div className="profile-names">
              <h4>
                {userData.first_name} {userData.last_name}
              </h4>
              <p>{userData.username}</p>
            </div>
          </div>
        )}
        <Link to={"/myorders"} className="profile-list">
          Orders
          <span>
            <MdOutlineKeyboardArrowRight />
          </span>
        </Link>
        <Link to={"/myaddress"} className="profile-list">
          My address
          <span>
            <MdOutlineKeyboardArrowRight />
          </span>
        </Link>
        <Link to={"/logout"} className="profile-list">
          Log out
          <span>
            <IoMdLogOut />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NavProfile;
