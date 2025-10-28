import React, { useRef } from "react";
import "./TopDestinations.css";

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
      name: "Scotland",
      description:
        "Experience the mystical Highlands under twilight skies and misty lochs.",
      img: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop",
    },
    {
      name: "Norway",
      description:
        "Chase the Northern Lights under star-lit skies along scenic fjord roads.",
      img: "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop",
    },
    {
      name: "New Zealand",
      description:
        "Wander dramatic, mist-laden mountain paths that feel straight out of a dream.",
      img: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop",
    },
    {
      name: "Japan",
      description:
        "Discover serene mountain temples shrouded in dusk and ancient forest trails.",
      img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop",
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore.
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
                <div className="td-des">{slide.description}</div>
                <a
                  className="td-seeMore"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>See More</button>
                </a>
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
