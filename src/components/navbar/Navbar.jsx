import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleButtonToggle = () => {
    setShowNav(!showNav);
  };

  const handleCloseNav = () => {
    setShowNav(false);
  };

  return (
    <header className="nav-container">
      <div className="nav-logo">
        <h1>LOGO</h1>
        {/* <img src={Logo} alt="website logo" /> */}
      </div>
      <nav className={showNav ? "mobile-nav" : "web-nav"}>
        <NavLink to="/" onClick={handleCloseNav}>
          Home
        </NavLink>
        <NavLink to="/places" onClick={handleCloseNav}>
          Places
        </NavLink>
        <NavLink to="/about-us" onClick={handleCloseNav}>
          AboutUs
        </NavLink>
        <NavLink to="/contact-us" onClick={handleCloseNav}>
          ContactUs
        </NavLink>
      </nav>

      <div className="hamburger">
        <button onClick={handleButtonToggle}>
          <RxHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
