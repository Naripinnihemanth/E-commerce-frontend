import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
function NavProfile() {
  return (
    <div className="icons">
      <div className="profile">
        <Link to={"/cart"} className="icon">
          <FaCartShopping />
        </Link>
        <button popoverTarget="popup" className="profile-button">
          <FaUserAlt />
        </button>
      </div>
      <div className="popup-profle" popover="auto" id="popup">
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
