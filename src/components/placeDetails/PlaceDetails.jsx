import React, { useState } from "react";
import "./PlaceDetails.css";
import placeData from "../../assets/data/placeDetailsData";

const PlaceDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="place-details-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{placeData.name}</h1>
          <p className="hero-subtitle">{placeData.tagline}</p>
          <div className="hero-badges">
            {placeData.badges.map((badge, index) => (
              <span key={index} className="badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`tab ${activeTab === "visit" ? "active" : ""}`}
          onClick={() => setActiveTab("visit")}
        >
          Visit Info
        </button>
        <button
          className={`tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {activeTab === "about" && (
          <div className="about-content fade-in">
            <div className="content-grid">
              <div className="text-content">
                <h2 className="section-title">About {placeData.name}</h2>
                {placeData.about.description.map((paragraph, index) => (
                  <p key={index} className="description">
                    {paragraph}
                  </p>
                ))}

                <h3 className="subsection-title">Key Highlights</h3>
                <ul className="highlights-list">
                  {placeData.about.highlights.map((highlight, index) => (
                    <li key={index} className="highlight-item">
                      <span className="highlight-icon">✨</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="best-time-card">
                <h3 className="card-title">{placeData.bestTime.title}</h3>
                <div className="time-info">
                  {placeData.bestTime.seasons.map((season, index) => (
                    <div
                      key={index}
                      className={
                        season.type === "avoid" ? "avoid-season" : "season"
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
          <div className="visit-content fade-in">
            <h2 className="section-title">Visiting Information</h2>
            <div className="info-grid">
              {placeData.visitingInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p>{info.detail}</p>
                </div>
              ))}
            </div>

            <div className="location-section">
              <h3 className="subsection-title">{placeData.howToReach.title}</h3>
              <div className="location-grid">
                {placeData.howToReach.methods.map((method, index) => (
                  <div key={index} className="location-card">
                    <h4>{method.mode}</h4>
                    <p>{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tips-section">
              <h3 className="subsection-title">{placeData.travelTips.title}</h3>
              <ul className="tips-list">
                {placeData.travelTips.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="gallery-content fade-in">
            <h2 className="section-title">Photo Gallery</h2>
            <div className="gallery-grid">
              {placeData.gallery.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.caption} />
                  <div className="gallery-overlay">
                    <p>{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage.url} alt={selectedImage.caption} />
            <p className="modal-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>{placeData.footer.message}</p>
        <p className="footer-note">{placeData.footer.note}</p>
      </footer>
    </div>
  );
};

export default PlaceDetails;
