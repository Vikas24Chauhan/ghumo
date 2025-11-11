import React, { useEffect, useRef } from "react";
import "./ScrollStack.css";

const ScrollStack = () => {
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
      title: "Get To Know Us",
      subTitle: "Explore All Tour of the world with us.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!",
      image:
        "https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100",
    },
    {
      id: 2,
      title: "Love Where Your're Going",
      subTitle: "Explore Your Life, Travel Where You Want!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!",
      image:
        "https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100",
    },
    {
      id: 3,
      title: "Explore The World",
      subTitle: "Start Planning Your Dream Trip Today!",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dicta error nam eaque. Eum fuga laborum quos expedita iste saepe similique, unde possimus quia at magnam sed cupiditate? Reprehenderit, harum!",
      image:
        "https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=100",
    },
  ];

  return (
    <div className="ss-container">
      <h1>Exploring new adventures and discoveries</h1>

      <div className="ss-cards" ref={cardsContainerRef}>
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className="ss-card"
            data-index={index}
            ref={(el) => addToCardsRef(el, index)}
          >
            <div className="ss-card__inner">
              <div className="ss-card__image-container">
                <img
                  className="ss-card__image"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <div className="ss-card__content">
                <h1 className="ss-card__title">{card.title}</h1>
                <p className="ss-card__description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ss-space-bottom" />
    </div>
  );
};

export default ScrollStack;
