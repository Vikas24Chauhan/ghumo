import React from "react";
import "./CoreFeatures.css";
import { FaMapSigns } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";

function CoreFeatures() {
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
    <div className="core-features-container">
      <div className="core-features-header">
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
        {coreData.map((data) => {
          const IconComponent = data.icon;
          return (
            <div key={data.id} className="core-features-card">
              <IconComponent className="core-features-icon" />
              <h4>{data.title}</h4>
              <p>{data.desp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoreFeatures;
