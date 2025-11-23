import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Places.css";
import { Star } from "lucide-react";
import indianStates from "../../assets/data/allStates";

function Places() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

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
    // Flatten all places from all states with state information
    let allPlaces = [];
    indianStates.forEach((state) => {
      state.places.forEach((place) => {
        allPlaces.push({
          ...place,
          stateName: state.name,
          stateId: state.id,
        });
      });
    });

    let filtered = allPlaces;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (place) =>
          place.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((place) => place.category === selectedFilter);
    }

    setFilteredPlaces(filtered);
  }, [searchTerm, selectedFilter]);

  const handlePlaceClick = (stateId, placeName) => {
    // Navigate to place details page with place name
    navigate(`/place/${encodeURIComponent(placeName)}`);
  };

  return (
    <div className="places-container">
      <div className="places-header">
        <h2>Popular Destinations</h2>
        <p>
          {filteredPlaces.length} destinations across {indianStates.length}{" "}
          Indian states
        </p>
      </div>

      {/* Search Bar */}
      <div className="places-search-container">
        <input
          type="text"
          className="places-search-input"
          placeholder="Search by state, place, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
        {filteredPlaces.map((place, index) => (
          <div
            key={`${place.stateId}-${place.name}`}
            className="places-state-card"
            onClick={() => handlePlaceClick(place.stateId, place.name)}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="places-card-image">
              <img src={place.image} alt={place.name} />
              <div className="places-card-overlay">
                <div className="places-rating">
                  <Star className="places-star-icon" size={14} />
                  <span>{place.rating}</span>
                </div>
              </div>
            </div>
            <div className="places-card-content">
              <h3 className="places-state-name">{place.stateName}</h3>
              <p className="places-popular-place">{place.name}</p>
              <p className="places-description">{place.description}</p>
              <div className="places-card-footer">
                <span className={`places-category-tag ${place.category}`}>
                  {place.category}
                </span>
                <span className="places-explore-text">Explore →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="places-no-results">
          <h3>No destinations found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default Places;
