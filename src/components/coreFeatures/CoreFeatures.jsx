import React, { useEffect, useRef } from "react";
import "./CoreFeatures.css";
import { FaMapSigns } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import ShapeImage from "../../assets/images/shape-up.png";

function CoreFeatures() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            if (headerRef.current) {
              headerRef.current.classList.add("animate");
            }

            // Animate cards with delay
            cardRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add("animate");
                }, index * 150);
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const coreData = [
    {
      id: 1,
      icon: FaFlag,
      title: "Tell Us What You want To Do",
      desp: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
    {
      id: 2,
      icon: FaMapMarkerAlt,
      title: "Share Your Travel Locations",
      desp: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
    {
      id: 3,
      icon: FaMapSigns,
      title: "Share Your Travel Preference",
      desp: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
    {
      id: 4,
      icon: FaGlobe,
      title: "Here 100% Trusted Tour Agency",
      desp: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    },
  ];

  return (
    <div className="core-features-container" ref={sectionRef}>
      <div className="core-features-header" ref={headerRef}>
        <h4>Core Features</h4>
        <h1>
          Find <span>Travel Perfection</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore.
        </p>
      </div>

      <div className="core-features-cards">
        {coreData.map((data, index) => {
          const IconComponent = data.icon;
          return (
            <div
              key={data.id}
              className="core-features-card"
              ref={addToCardRefs}
            >
              <IconComponent className="core-features-icon" />
              <h4>{data.title}</h4>
              <p>{data.desp}</p>
            </div>
          );
        })}
      </div>

      <img className="core-features-image" src={ShapeImage} alt="" />
    </div>
  );
}

export default CoreFeatures;
