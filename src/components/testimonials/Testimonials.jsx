import React, { useEffect, useRef, useState } from "react";
import "./Testimonials.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import testimonialsData from "../../assets/data/testimonials";

function Testimonials() {
  const testimonialsListRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // 👈 track expanded review
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200 });
  }, []);

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  const startScrolling = () => {
    stopScrolling();
    scrollIntervalRef.current = setInterval(() => {
      if (testimonialsListRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          testimonialsListRef.current;
        testimonialsListRef.current.scrollLeft += 1;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          testimonialsListRef.current.scrollLeft = 0;
        }
      }
    }, 20);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleReadMore = (index) => {
    setExpandedIndex((prev) => {
      const isCollapsing = prev === index;
      if (isCollapsing) {
        startScrolling(); // Restart scrolling when collapsing
      }
      return isCollapsing ? null : index;
    });
  };

  return (
    <div className="testimonials-main-container">
      <div className="testimonials-content">
        <h4>Our Testimonails</h4>
        <h1>
          Good Reviews By <span>Clients</span>
        </h1>
        <p>
          See what satisfied travelers are saying! Our users trust us to provide
          accurate, up-to-date, and inspiring information for their journeys
          across India. Read genuine reviews to see how our guides helped them
          discover the best of the subcontinent.
        </p>
      </div>

      <div className="testimonials-cards" ref={testimonialsListRef}>
        {testimonialsData.map((data, index) => (
          <div
            key={index}
            className="testimonials-card"
            onMouseEnter={stopScrolling}
            onMouseLeave={startScrolling}
          >
            <div className="testimonials-image">
              <img src={data.image} alt="" />
            </div>
            <h3>{data.name}</h3>
            <p>
              {expandedIndex === index ? (
                <>
                  {" "}
                  <FaQuoteLeft />
                  {data.review}
                  <FaQuoteRight />
                  <span
                    onClick={() => handleReadMore(index)}
                    className="testimonials-read-less"
                  >
                    <br />
                    Read less
                  </span>
                </>
              ) : (
                <>
                  {data.subReview}
                  <span
                    onClick={() => handleReadMore(index)}
                    className="testimonials-read-more"
                  >
                    <br /> Read more
                  </span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
