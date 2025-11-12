import { useState, useEffect } from "react";
import "./Places.css";
import { Star } from "lucide-react";
import indianStates from "../../assets/data/allStates";

function Places() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredStates, setFilteredStates] = useState([]);

  // Filter options with icons
  const filters = [
    { id: "all", label: "All", icon: "🔵" },
    { id: "spiritual", label: "Spiritual", icon: "🪷" },
    { id: "mountain", label: "Mountain", icon: "⛰️" },
    { id: "nature", label: "Nature", icon: "🌿" },
    { id: "beach", label: "Beach", icon: "☀️" },
    { id: "desert", label: "Desert", icon: "🌵" },
    { id: "city", label: "City", icon: "🏛️" },
    { id: "culture", label: "Culture", icon: "🎭" },
    { id: "heritage", label: "Heritage", icon: "🏛️" },
    { id: "wildlife", label: "Wildlife", icon: "🦁" },
  ];

  useEffect(() => {
    let filtered = indianStates;

    if (searchTerm) {
      filtered = filtered.filter(
        (state) =>
          state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          state.popularPlace.toLowerCase().includes(searchTerm.toLowerCase()) ||
          state.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter((state) => state.category === selectedFilter);
    }

    setFilteredStates(filtered);
  }, [searchTerm, selectedFilter]);

  const handleStateClick = (stateId) => {
    window.location.href = `/state/${stateId}`;
  };

  return (
    <div className="places-container">
      <div className="places-header">
        <h2>Popular Destinations</h2>
        <p>
          {filteredStates.length} of {indianStates.length} Indian states
        </p>
      </div>

      {/* Enhanced Category Filter with Icons */}
      <div className="places-filter-container">
        <div className="places-filter-wrapper">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`places-filter-button ${
                selectedFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              <span className="places-filter-icon">{filter.icon}</span>
              <span className="places-filter-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="places-states-container">
        {filteredStates.map((state, index) => (
          <div
            key={state.id}
            className="places-state-card"
            onClick={() => handleStateClick(state.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="places-card-image">
              <img src={state.image} alt={state.popularPlace} />
              <div className="places-card-overlay">
                <div className="places-rating">
                  <Star className="places-star-icon" size={14} />
                  <span>{state.rating}</span>
                </div>
              </div>
            </div>
            <div className="places-card-content">
              <h3 className="places-state-name">{state.name}</h3>
              <p className="places-popular-place">{state.popularPlace}</p>
              <p className="places-description">{state.description}</p>
              <div className="places-card-footer">
                <span className={`places-category-tag ${state.category}`}>
                  {state.category}
                </span>
                <span className="places-explore-text">Explore →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="places-no-results">
          <h3>No states found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default Places;
