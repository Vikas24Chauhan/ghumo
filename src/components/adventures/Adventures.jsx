import React, { useEffect, useRef } from "react";
import "./Adventures.css";
import Image1 from "../../assets/images/adventures-1.jpg";
import Image2 from "../../assets/images/adventures-2.jpg";
import Image3 from "../../assets/images/adventures-3.jpg";
import ShapeDown from "../../assets/images/shape-down.png";

const Adventures = () => {
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const initializeScrollEffects = () => {
      const cardsContainer = cardsContainerRef.current;
      const cards = cardsRef.current;

      if (!cardsContainer || cards.length === 0) return;

      // Set CSS variables
      cardsContainer.style.setProperty(
        "--cards-count",
        cards.length.toString()
      );
      cardsContainer.style.setProperty(
        "--card-height",
        `${cards[0].clientHeight}px`
      );

      // Set padding and scroll observers for each card
      cards.forEach((card, index) => {
        if (!card) return;

        const offsetTop = 20 + index * 20;
        card.style.paddingTop = `${offsetTop}px`;

        // Skip the last card
        if (index === cards.length - 1) return;

        const toScale = 1 - (cards.length - 1 - index) * 0.1;
        const nextCard = cards[index + 1];
        const cardInner = card.querySelector(".card__inner");

        if (!nextCard || !cardInner) return;

        const handleScroll = () => {
          const nextCardRect = nextCard.getBoundingClientRect();
          const containerRect = cardsContainer.getBoundingClientRect();

          const cardHeight = card.clientHeight;
          const windowHeight = window.innerHeight;

          const offsetTopPx = offsetTop;
          const offsetBottom = windowHeight - cardHeight;

          const elementTop = nextCardRect.top - containerRect.top;
          const elementBottom = nextCardRect.bottom - containerRect.top;

          const start = offsetTopPx;
          const end = offsetBottom;

          let percentageY = 0;

          if (elementTop <= start) {
            percentageY = 100;
          } else if (elementBottom >= end) {
            percentageY = 0;
          } else {
            percentageY =
              ((start - elementTop) /
                (end - start - elementTop + elementBottom)) *
              100;
            percentageY = Math.max(0, Math.min(100, percentageY));
          }

          // Calculate scale and brightness values
          const scale = valueAtPercentage({
            from: 1,
            to: toScale,
            percentage: percentageY,
          });

          const brightness = valueAtPercentage({
            from: 1,
            to: 0.6,
            percentage: percentageY,
          });

          cardInner.style.transform = `scale(${scale})`;
          cardInner.style.filter = `brightness(${brightness})`;
        };

        // Initial call
        handleScroll();

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        // Cleanup function
        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
        };
      });
    };

    // Helper function to calculate value at percentage
    const valueAtPercentage = ({ from, to, percentage }) => {
      return from + (to - from) * (percentage / 100);
    };

    // Initialize when component mounts
    const cleanupFunctions = initializeScrollEffects();

    // Cleanup on unmount
    return () => {
      if (cleanupFunctions) {
        cleanupFunctions.forEach((cleanup) => cleanup && cleanup());
      }
    };
  }, []);

  // Add card to ref array
  const addToCardsRef = (el, index) => {
    cardsRef.current[index] = el;
  };

  const cardData = [
    {
      id: 1,
      image: Image1,
      title: "Get To Know Us",
      subTitle: "Explore All Tour of the world with us.",
      description:
        "your trusted guide to the most incredible destinations. While our passion began with uncovering the diverse beauty and rich heritage of India—from the serene backwaters of Kerala to the majestic Himalayas—our vision extends globally. We are a team of avid travelers, local experts, and storytelling enthusiasts dedicated to crafting journeys that are not just trips, but transformative experiences.",
    },
    {
      id: 2,
      image: Image2,
      title: "Love Where Your're Going",
      subTitle: "Explore Your Life, Travel Where You Want!",
      description:
        "Travel is more than just crossing destinations off a list; it’s about rediscovering yourself. It's about that moment when the sun rises over the Himalayas, the aroma of spices hits you in a bustling market, or you finally stand before a monument you've only seen in books. We understand that the perfect trip isn't just about the place—it's about how that place makes you feel.",
    },
    {
      id: 3,
      image: Image3,
      title: "Explore The World",
      subTitle: "Start Planning Your Dream Trip Today!",
      description:
        "India is a continent of experiences, and the world is waiting! We've simplified the planning process so you can focus on the excitement of your upcoming adventure, not the stress of logistics. Your dream trip, whether to the ancient temples of South India or the glaciers of the North, is just three steps away.",
    },
  ];

  return (
    <div className="adventures-container">
      <img className="adventures-shape-image" src={ShapeDown} alt="" />
      <div className="adventures-header">
        <h4>About Us</h4>
        <h1>
          Exploring New <span>Adventures And Discoveries</span>
        </h1>
      </div>

      <div className="adventures-cards" ref={cardsContainerRef}>
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className="adventures-card"
            data-index={index}
            ref={(el) => addToCardsRef(el, index)}
          >
            <div className="adventures-card__inner">
              <div className="adventures-card__image-container">
                <img
                  className="adventures-card__image"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <div className="adventures-card__content">
                <h1 className="adventures-card__title">{card.title}</h1>
                <h2 className="adventures-card__sub_title">{card.subTitle}</h2>
                <p className="adventures-card__description">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="adventures-space-bottom" />
    </div>
  );
};

export default Adventures;
