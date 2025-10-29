import React from "react";
import "./TopCategories.css";
import UpperImage from "../../assets/images/upper-shape-pat.png";
import LowerImage from "../../assets/images/lower-shape-pat.png";
import Safari from "../../assets/images/safari.png";
import Cycling from "../../assets/images/cycling.png";
import CampingTent from "../../assets/images/camping-tent.png";
import Surf from "../../assets/images/surf.png";
import Sunbed from "../../assets/images/sunbed.png";
import Hiking1 from "../../assets/images/hiking-1.png";
import Hiking2 from "../../assets/images/hiking-2.png";

function TopCategories() {
  const categories = [
    { image: Safari, title: "Safari" },
    { image: Cycling, title: "Cycling" },
    { image: CampingTent, title: "Camping" },
    { image: Surf, title: "Surf" },
    { image: Sunbed, title: "Sunbed" },
    { image: Hiking1, title: "Hiking" },
    { image: Hiking2, title: "Hiking" },
  ];

  return (
    <div className="tc-container">
      <img className="tc-upper-image" src={UpperImage} alt="" />
      <div className="tc-inner-div">
        <h1>Top Categories</h1>
        <div className="tc-images-container">
          <div className="tc-images-scroll">
            {/* Original images */}
            {categories.map((category, index) => (
              <div className="tc-image-card" key={`original-${index}`}>
                <img src={category.image} alt={category.title} />
                <h2>{category.title}</h2>
              </div>
            ))}
            {/* Duplicate images for seamless scrolling */}
            {categories.map((category, index) => (
              <div className="tc-image-card" key={`duplicate-${index}`}>
                <img src={category.image} alt={category.title} />
                <h2>{category.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img className="tc-lower-image" src={LowerImage} alt="" />
    </div>
  );
}

export default TopCategories;
