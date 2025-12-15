import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

function AnimateOnScroll({ targetSelector }) {
  useEffect(() => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    target.classList.add("react-animate-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add("react-animate-show");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetSelector]);

  return null;
}

const animations = [
  { mount: "react-animate-hero", target: ".card" },
  { mount: "react-animate-carousel", target: "#carouselExampleCaptions" },
  { mount: "react-animate-about", target: "#about-us" },
];

animations.forEach(({ mount, target }) => {
  const el = document.getElementById(mount);
  if (el) {
    createRoot(el).render(<AnimateOnScroll targetSelector={target} />);
  }
});
