import React from "react";
import "./Footer.css";
import { FiHome, FiSettings, FiBook, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <NavLink to="/" className="footer-icon-wrapper">
        <FiHome className="footer-icons" />
        <span className="footer-icon-tooltip">Home</span>
      </NavLink>

      <NavLink to="/places" className="footer-icon-wrapper">
        <FiBook className="footer-icons" />
        <span className="footer-icon-tooltip">Blog</span>
      </NavLink>

      <NavLink className="footer-icon-wrapper">
        <FiUser className="footer-icons" />
        <span className="footer-icon-tooltip">About</span>
      </NavLink>

      <NavLink className="footer-icon-wrapper">
        <FiSettings className="footer-icons" />
        <span className="footer-icon-tooltip">Settings</span>
      </NavLink>
    </div>
  );
}

export default Footer;
