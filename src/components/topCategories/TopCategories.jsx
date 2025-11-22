import React from "react";
import { gsap } from "gsap";
import "./TopCategories.css";
import Safari from "../../assets/images/safari.jpg";
import Cycling from "../../assets/images/cycling.jpg";
import Camping from "../../assets/images/camping.jpg";
import Hiking from "../../assets/images/hiking.jpg";

function TopCategories() {
  const demoItems = [
    {
      link: "#",
      text: "Safari",
      image: Safari,
    },
    {
      link: "#",
      text: "Cycling",
      image: Cycling,
    },
    {
      link: "#",
      text: "Camping",
      image: Camping,
    },
    // {
    //   link: "#",
    //   text: "Surf",
    //   image: "https://picsum.photos/600/400?random=4",
    // },
    // {
    //   link: "#",
    //   text: "Sunbed",
    //   image: "https://picsum.photos/600/400?random=1",
    // },
    {
      link: "#",
      text: "Hiking",
      image: Hiking,
    },
  ];

  return (
    <div className="tc-menu-wrap">
      <h4>Top Categories</h4>
      <h1>
        Explore Your Life, <span>Travel Where You Want!</span>
      </h1>
      <nav className="tc-menu">
        {demoItems.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div
        className="tc-marquee__img"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div className="tc-menu__item" ref={itemRef}>
      <a
        className="tc-menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="tc-marquee" ref={marqueeRef}>
        <div className="tc-marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="tc-marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCategories;
