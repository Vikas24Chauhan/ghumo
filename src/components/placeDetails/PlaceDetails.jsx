import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./PlaceDetails.css";
import { getPlaceData } from "../../assets/data/placeDetailsData";

const PlaceDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedImage, setSelectedImage] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { placeName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get place name from URL params or query string
    const searchParams = new URLSearchParams(location.search);
    const placeFromQuery = searchParams.get("place");
    const currentPlaceName = placeName || placeFromQuery;

    console.log("Looking for place:", currentPlaceName); // Debug log

    // Get the place data
    const data = getPlaceData(currentPlaceName);

    if (data) {
      setPlaceData(data);
      setNotFound(false);
    } else {
      setNotFound(true);
      setPlaceData(null);
    }
  }, [placeName, location]);

  if (notFound) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏛️</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Place Details Not Available
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "2rem" }}>
          Sorry, we don't have detailed information for "
          <strong>{placeName}</strong>" yet.
          <br />
          We're working on adding more destinations!
        </p>
        <button
          onClick={() => navigate("/places")}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back to All Places
        </button>
      </div>
    );
  }

  if (!placeData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="place-details-container">
      {/* Hero Section */}
      <div className="place-details-hero-section">
        <div className="place-details-hero-overlay" />
        <div className="place-details-hero-content">
          <h1 className="place-details-hero-title">{placeData.name}</h1>
          <p className="place-details-hero-subtitle">{placeData.tagline}</p>
          <div className="place-details-hero-badges">
            {placeData.badges.map((badge, index) => (
              <span key={index} className="place-details-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="place-details-tabs-container">
        <div className="place-details-tabs-wrapper">
          <button
            className={`place-details-tab ${
              activeTab === "about" ? "active" : ""
            }`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`place-details-tab ${
              activeTab === "visit" ? "active" : ""
            }`}
            onClick={() => setActiveTab("visit")}
          >
            Visit Info
          </button>
          <button
            className={`place-details-tab ${
              activeTab === "gallery" ? "active" : ""
            }`}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="place-details-content-section">
        {activeTab === "about" && (
          <div className="place-details-about-content place-details-fade-in">
            <div className="place-details-content-grid">
              <div className="place-details-text-content">
                <h2 className="place-details-section-title">
                  About {placeData.name}
                </h2>
                {placeData.about.description.map((paragraph, index) => (
                  <p key={index} className="place-details-description">
                    {paragraph}
                  </p>
                ))}

                <h3 className="place-details-subsection-title">
                  Key Highlights
                </h3>
                <ul className="place-details-highlights-list">
                  {placeData.about.highlights.map((highlight, index) => (
                    <li key={index} className="place-details-highlight-item">
                      <span className="place-details-highlight-icon">✨</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="place-details-best-time-card">
                <h3 className="place-details-card-title">
                  {placeData.bestTime.title}
                </h3>
                <div className="place-details-time-info">
                  {placeData.bestTime.seasons.map((season, index) => (
                    <div
                      key={index}
                      className={
                        season.type === "avoid"
                          ? "place-details-avoid-season"
                          : "place-details-season"
                      }
                    >
                      <h4>{season.title}</h4>
                      <p>{season.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "visit" && (
          <div className="place-details-visit-content place-details-fade-in">
            <h2 className="place-details-section-title">
              Visiting Information
            </h2>
            <div className="place-details-info-grid">
              {placeData.visitingInfo.map((info, index) => (
                <div key={index} className="place-details-info-card">
                  <div className="place-details-info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p>{info.detail}</p>
                </div>
              ))}
            </div>

            <div className="place-details-location-section">
              <h3 className="place-details-subsection-title">
                {placeData.howToReach.title}
              </h3>
              <div className="place-details-location-grid">
                {placeData.howToReach.methods.map((method, index) => (
                  <div key={index} className="place-details-location-card">
                    <h4>{method.mode}</h4>
                    <p>{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="place-details-tips-section">
              <h3 className="place-details-subsection-title">
                {placeData.travelTips.title}
              </h3>
              <ul className="place-details-tips-list">
                {placeData.travelTips.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="place-details-gallery-content place-details-fade-in">
            <h2 className="place-details-section-title">Photo Gallery</h2>
            <div className="place-details-gallery-grid">
              {placeData.gallery.map((image) => (
                <div
                  key={image.id}
                  className="place-details-gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.caption} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="place-details-footer">
        <p>{placeData.footer.message}</p>
        <p className="place-details-footer-note">{placeData.footer.note}</p>
      </footer>
    </div>
  );
};

export default PlaceDetails;
