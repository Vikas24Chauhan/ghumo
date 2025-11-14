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
          Perspective Zoom Effect
          <br />
          on Scroll
        </h1>
        <div className="about-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/eugene-chystiakov-W6FESrD-M50-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/hendo-wang-DsGeUBaJPwc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/taylor-sondgeroth-ltsKOg_q_Gc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/shayna-douglas-w2tG22s8hEc-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/samantha-fortney-o8CA1Kj8TJU-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/jakub-dziubak-wvXG_7ebZ18-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-3.png"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-2.png"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/golden-retriever-1.png"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="3">
          <img
            src="https://assets.codepen.io/204808/richard-brutyo-Sg3XwuEpybU.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="2">
          <img
            src="https://assets.codepen.io/204808/berkay-gumustekin-ngqyo2AYYnE.jpg"
            alt=""
          />
        </div>
        <div className="about-item" data-layer="1">
          <img
            src="https://assets.codepen.io/204808/zach-shup-R6SdnJnLJEg.jpg"
            alt=""
          />
        </div>
      </div>
      <section className="about-section-stick">
        <p className="about-opacity-reveal">
          If you're lucky, a Golden Retriever will come into your life, steal
          your heart, and change everything.
        </p>
      </section>
    </main>
  );
};

export default About;
