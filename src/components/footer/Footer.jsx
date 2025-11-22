import React from "react";
import "./Footer.css";
import { FiHome, FiMapPin, FiInfo, FiMail } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <NavLink to="/" className="footer-icon-wrapper">
        <FiHome className="footer-icons" />
        <span className="footer-icon-tooltip">Home</span>
      </NavLink>

      <NavLink to="/places" className="footer-icon-wrapper">
        <FiMapPin className="footer-icons" />
        <span className="footer-icon-tooltip">Places</span>
      </NavLink>

      <NavLink to="/about" className="footer-icon-wrapper">
        <FiInfo className="footer-icons" />
        <span className="footer-icon-tooltip">About Us</span>
      </NavLink>

      <NavLink to="/contact" className="footer-icon-wrapper">
        <FiMail className="footer-icons" />
        <span className="footer-icon-tooltip">Contact Us</span>
      </NavLink>
    </div>
  );
}

export default Footer;
