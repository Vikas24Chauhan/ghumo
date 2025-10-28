import React from "react";
import "./Header.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../../assets/images/banner1.jpg";
import Image2 from "../../assets/images/banner2.jpg";
import Image3 from "../../assets/images/banner3.jpg";

function Header() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
  };

  const [text] = useTypewriter({
    words: [
      "Start Planning Your Dream Trip",
      "Make Your Trip Fun & Noted",
      "Begin your adventure with us",
    ],
    loop: {},
  });

  return (
    <div className="header-container">
      <div className="header-banner">
        <Slider {...settings}>
          <img src={Image1} alt="Banner1" />
          <img src={Image2} alt="Banner2" />
          <img src={Image3} alt="Banner3" />
        </Slider>
        <div className="header-banner-content">
          <h1>Discover India’s Hidden Treasures</h1>
          <p>
            Explore breathtaking destinations, vibrant cultures, and timeless
            heritage from all 28 Indian states — your journey begins here.
          </p>
          <h5 className="header-typeWriter">
            {text}
            <Cursor />
          </h5>
          <br />
          {/* <button className="header-btn" type="button">
            Get Connected
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
