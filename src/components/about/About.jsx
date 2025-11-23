import React, { useEffect, useRef } from "react";
import "./About.css";

const About = () => {
  const mainRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let scrollPos = 0;
    let targetScrollPos = 0;
    let animationFrameId = null;
    let isScrolling = false;

    const handleScroll = (e) => {
      e.preventDefault();
      targetScrollPos += e.deltaY;
      targetScrollPos = Math.max(0, Math.min(targetScrollPos, 5000));

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const animate = () => {
      const diff = targetScrollPos - scrollPos;

      if (Math.abs(diff) > 0.1) {
        scrollPos += diff * 0.08;
      } else {
        scrollPos = targetScrollPos;
        isScrolling = false;
        return;
      }

      const container = scrollContainerRef.current;
      if (!container) return;

      // First section zoom animation (0-2500)
      const zoomProgress = Math.min(scrollPos / 2500, 1);

      // Second section text animation (2500-5000)
      const textProgress = Math.max(0, Math.min((scrollPos - 2500) / 2500, 1));

      // Zoom items animations
      const layer3Items = container.querySelectorAll(
        '.about-item[data-layer="3"]'
      );
      const layer2Items = container.querySelectorAll(
        '.about-item[data-layer="2"]'
      );
      const layer1Items = container.querySelectorAll(
        '.about-item[data-layer="1"]'
      );
      const heading = container.querySelector(".about-heading");

      layer3Items.forEach((item) => {
        const z = -2000 + 2800 * zoomProgress;
        const opacity = 0.6 + 0.4 * zoomProgress;
        item.style.transform = `translate3d(-50%, -50%, ${z}px)`;
        item.style.opacity = opacity;
      });

      layer2Items.forEach((item) => {
        const z = -2000 + 2600 * zoomProgress;
        const opacity = 0.4 + 0.6 * zoomProgress;
        item.style.transform = `translate3d(-50%, -50%, ${z}px)`;
        item.style.opacity = opacity;
      });

      layer1Items.forEach((item) => {
        const z = -2000 + 2400 * zoomProgress;
        const opacity = 0.2 + 0.8 * zoomProgress;
        item.style.transform = `translate3d(-50%, -50%, ${z}px)`;
        item.style.opacity = opacity;
      });

      if (heading) {
        const z = -2000 + 2050 * zoomProgress;
        const opacity = 0.1 + 0.9 * zoomProgress;
        heading.style.transform = `translate3d(-50%, -50%, ${z}px)`;
        heading.style.opacity = opacity;
      }

      // Hide zoom container and show text section based on scroll
      if (zoomProgress >= 1) {
        container.style.opacity = Math.max(0, 1 - textProgress * 2);
      } else {
        container.style.opacity = 1;
      }

      // Text reveal animation
      const textSection = document.querySelector(".about-section-stick");
      const textEl = document.querySelector(".about-opacity-reveal");

      if (textSection && textEl) {
        // Show text section when zoom is complete
        if (scrollPos > 2500) {
          textSection.style.opacity = 1;
          textSection.style.pointerEvents = "all";

          if (!textEl.dataset.split) {
            const text = textEl.textContent;
            const chars = text.split("");
            textEl.innerHTML = chars
              .map(
                (char) =>
                  `<span style="opacity: 0.2">${
                    char === " " ? "&nbsp;" : char
                  }</span>`
              )
              .join("");
            textEl.dataset.split = "true";
          }

          const spans = textEl.querySelectorAll("span");
          const totalChars = spans.length;

          spans.forEach((span, i) => {
            const charProgress = Math.max(
              0,
              Math.min(1, (textProgress * totalChars - i) / 2)
            );
            span.style.opacity = 0.2 + 0.8 * charProgress;
          });

          // Fade out at the end
          if (textProgress > 0.8) {
            const fadeOut = Math.min(1, (textProgress - 0.8) / 0.2);
            textEl.style.opacity = 1 - fadeOut;
            textEl.style.transform = `scale(${1 + fadeOut * 0.2})`;
          } else {
            textEl.style.opacity = 1;
            textEl.style.transform = "scale(1)";
          }
        } else {
          textSection.style.opacity = 0;
          textSection.style.pointerEvents = "none";
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const container = mainRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <main className="about-main" ref={mainRef}>
      <div className="about-container" ref={scrollContainerRef}>
        <h1 className="about-heading">
          Beyond the Brochure
          <br />
          Why Choose Our Guides?
        </h1>

        {/* --- Layer 2 Images (Middle Ground) --- */}
        <div className="about-item" data-layer="2">
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="The Taj Mahal, Agra"
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Varanasi Ghats on the Ganges"
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Kerala Backwaters Houseboat"
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://images.unsplash.com/photo-1595328768079-4475f947e178?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Red Fort architecture, Delhi"
          />
        </div>

        {/* --- Layer 1 Images (Background - Furthest away) --- */}
        <div className="about-item" data-layer="1">
          <img
            src="https://images.unsplash.com/photo-1589875768796-42eb4a4fb2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Pangong Tso Lake, Ladakh Himalayas"
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://images.unsplash.com/photo-1583142936987-b26010d753ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Mysore Palace illuminated at dusk"
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://images.unsplash.com/photo-1620766165457-a8085a048139?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Stone Chariot at Hampi"
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://images.unsplash.com/photo-1582504331506-6e643393517c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Colorful Gopuram of Meenakshi Temple, Madurai"
          />
        </div>

        {/* --- Layer 3 Images (Foreground - Closest) --- */}
        <div className="about-item" data-layer="3">
          <img
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Hawa Mahal windows, Jaipur"
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://images.unsplash.com/photo-1587474260584-1f5042c53b72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Golden Temple (Harmandir Sahib), Amritsar"
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://images.unsplash.com/photo-1570168007204-dfc528389003?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Gateway of India, Mumbai"
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Goa beach with palm trees"
          />
        </div>
      </div>

      <section className="about-section-stick">
        <p className="about-opacity-reveal">
          We are not a travel agency; we are your dedicated resource for
          everything India. Our mission is simple: to inspire and equip every
          traveler with the most accurate, up-to-date, and insightful
          information about India's diverse and magnificent destinations. From
          the ancient history of the Golden Triangle to the serene beauty of the
          Kerala backwaters, we exist to help you move from dream to detailed
          plan.
        </p>
      </section>
    </main>
  );
};

export default About;
