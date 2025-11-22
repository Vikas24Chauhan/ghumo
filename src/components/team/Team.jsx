import React, { useState, useEffect, useRef } from "react";
import "./Team.css";
import { NavLink } from "react-router-dom";
import Member1 from "../../assets/images/member-1.webp";
import Member2 from "../../assets/images/member-2.webp";
import Member3 from "../../assets/images/member-3.webp";
import Member4 from "../../assets/images/member-4.webp";
import Member5 from "../../assets/images/member-5.webp";

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const team = [
    {
      id: 1,
      name: "Member 1",
      title: "Head Officer",
      image: Member3,
      description: "",
    },
    {
      id: 2,
      name: "Member 2",
      title: "Senior Agent",
      image: Member2,
      description: "",
    },
    {
      id: 3,
      name: "Member 3",
      title: "Founder",
      image: Member1,
      description: "",
    },
    {
      id: 4,
      name: "Member 4",
      title: "Supervisor",
      image: Member4,
      description: "",
    },
    {
      id: 5,
      name: "Member 5",
      title: "Quality Assurance",
      image: Member5,
      description: "",
    },
  ];

  const moveToSlide = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const cardMargin = parseInt(window.getComputedStyle(card).marginRight) * 2;

    const amountToMove = targetIndex * (cardWidth + cardMargin);
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = cardWidth / 2;
    const targetTranslateX = containerCenter - cardCenter - amountToMove;

    track.style.transform = `translateX(${targetTranslateX - 25}px)`;
    setCurrentIndex(targetIndex);

    // Flash effect
    const flashEffect = document.createElement("div");
    flashEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(56, 189, 248, 0.1);
      z-index: 30;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    container.appendChild(flashEffect);

    setTimeout(() => {
      flashEffect.style.opacity = "0.3";
      setTimeout(() => {
        flashEffect.style.opacity = "0";
        setTimeout(() => {
          if (container.contains(flashEffect)) {
            container.removeChild(flashEffect);
          }
        }, 200);
      }, 100);
    }, 10);
  };

  const handleNext = () => {
    if (currentIndex < team.length - 1) {
      moveToSlide(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    const pos = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    setStartPos(pos);

    const track = trackRef.current;
    const transformMatrix = window
      .getComputedStyle(track)
      .getPropertyValue("transform");
    const translate =
      transformMatrix !== "none" ? parseInt(transformMatrix.split(",")[4]) : 0;

    setCurrentTranslate(translate);
    setPrevTranslate(translate);
    track.style.transition = "none";
    track.style.cursor = "grabbing";
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const currentPosition = e.type.includes("mouse")
      ? e.pageX
      : e.touches[0].clientX;
    const moveX = currentPosition - startPos;
    const newTranslate = prevTranslate + moveX;
    setCurrentTranslate(newTranslate);

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const track = trackRef.current;
    if (!track) return;

    track.style.transition =
      "transform 0.75s cubic-bezier(0.21, 0.61, 0.35, 1)";
    track.style.cursor = "grab";

    const movedBy = currentTranslate - prevTranslate;
    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const threshold = cardWidth / 3.5;

    if (movedBy < -threshold && currentIndex < team.length - 1) {
      moveToSlide(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else {
      moveToSlide(currentIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      }
    };

    const handleResize = () => {
      moveToSlide(currentIndex);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  useEffect(() => {
    // Initialize carousel position
    setTimeout(() => {
      moveToSlide(currentIndex);
    }, 100);
  }, []);

  const getCardClass = (index) => {
    if (index === currentIndex) return "team-carousel-card team-is-active";
    if (index === currentIndex - 1) return "team-carousel-card team-is-prev";
    if (index === currentIndex + 1) return "team-carousel-card team-is-next";
    if (index < currentIndex - 1) return "team-carousel-card team-is-far-prev";
    if (index > currentIndex + 1) return "team-carousel-card team-is-far-next";
    return "team-carousel-card";
  };

  return (
    <div className="team-container">
      <div className="team-header">
        <h4>Tour Guides</h4>
        <h1>
          Meet Our <span>Excellent Guides</span>
        </h1>
        <p>
          We believe the heart of an unforgettable journey lies with the people
          who lead it. Our guides are not just escorts; they are licensed
          historians, cultural interpreters, and passionate local storytellers
          who breathe life into every destination. They are the reason our
          guests don't just see India, they feel it.
        </p>
      </div>

      <div className="team-main" ref={containerRef}>
        <div
          className="team-carousel-track"
          ref={trackRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
        >
          {team.map((data, index) => (
            <div key={data.id} className={getCardClass(index)}>
              <div className="team-card-image-container">
                <img
                  src={data.image}
                  alt={data.title}
                  className="team-card-image"
                />
              </div>
              <div className="team-card-content">
                <h2 className="team-card-name">{data.name}</h2>
                <h3 className="team-card-title" data-text={data.title}>
                  {data.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button className="team-carousel-button team-prev" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="team-carousel-button team-next" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div className="team-carousel-indicators">
          {team.map((_, index) => (
            <div
              key={index}
              className={`team-indicator ${
                index === currentIndex ? "team-active" : ""
              }`}
              onClick={() => moveToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
