import React, { useRef } from "react";
import "./TopDestinations.css";
import Goa from "../../assets/images/goa.jpg";
import Jaipur from "../../assets/images/jaipur.jpg";
import Kashmir from "../../assets/images/kashmir.jpg";
import TajMahal from "../../assets/images/taj-mahal.jpg";

const TopDestinations = () => {
  const slideRef = useRef(null);

  const handleNext = () => {
    const slide = slideRef.current;
    const items = slide.querySelectorAll(".td-item");
    slide.appendChild(items[0]);
  };

  const handlePrev = () => {
    const slide = slideRef.current;
    const items = slide.querySelectorAll(".td-item");
    slide.prepend(items[items.length - 1]);
  };

  const slides = [
    {
      name: "Taj Mahal",
      tagLine: "An Eternal Symbol of Love",
      img: TajMahal,
    },
    {
      name: "Jaipur",
      tagLine: "The Pink City of Royal Heritage",
      img: Jaipur,
    },
    {
      name: "Kashmir",
      tagLine:
        "The Paradise on Earth: Serene Lakes and Majestic Snow-Capped Peaks",
      img: Kashmir,
    },
    {
      name: "Goa",
      tagLine: "Sun-Kissed Shores and Spirited Culture: India's Coastal Gem",
      img: Goa,
    },
  ];

  return (
    <div className="td-container">
      <div className="td-header">
        <h4>Top Destinations</h4>
        <h1>
          Explore <span>Top Destinations</span>
        </h1>
        <p>
          India is a land of unmatched beauty and profound history. Dive into
          our hand-picked collection of the nation's most-visited and culturally
          significant locations. From the iconic architectural wonders and
          bustling metropolitan hubs to the tranquil Himalayan retreats, explore
          in-depth guides, historical context, and essential visitor details for
          every must-see place.
        </p>
      </div>

      <div className="td-card">
        <div className="td-slide" ref={slideRef}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="td-item"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="td-content">
                <div className="td-name">{slide.name}</div>
                <div className="td-des">{slide.tagLine}</div>
                {/* <a
                  className="td-seeMore"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>See More</button>
                </a> */}
              </div>
            </div>
          ))}
        </div>

        <div className="td-button">
          <button className="prev" onClick={handlePrev}>
            ◁
          </button>
          <button className="next" onClick={handleNext}>
            ▷
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDestinations;
