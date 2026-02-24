import React from "react";
import "../css/Footer.css";
import { FaRegCopyright } from "react-icons/fa6";
function Footer() {
  return (
    <div className="footer-container">
      <div className="content">
        <div className="footer-logo">
          <h1>E-commerce</h1>
          <p>helping you find the right product faster, every time</p>
        </div>
        <div className="categories">
          <p>Company</p>
          <p>Blog</p>
          <p>Careers</p>
          <p>News</p>
        </div>
        <div className="categories">
          <p>Recommended</p>
          <p>Trending</p>
          <p>Categories</p>
          <p>History</p>
        </div>
        <div className="social-media">
          <p>LinkedIn</p>
          <p>Instagram</p>
          <p>Email</p>
          <p>Facebook</p>
        </div>
        <div className="list">
          <p>Terms of Servics</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
        </div>
      </div>
      <div className="copy-rights">
        <p>
          <FaRegCopyright /> 2026 E-commerce inc. All rights reserved.
        </p>
        <div className="list">
          <p>Terms of Servics</p>
          <p>Privacy Policy</p>
          <p>Cookies</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
