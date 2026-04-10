import { useEffect, useRef, useState } from "react";
import './Sections.css';

const features = [
    {
      title: "Centralized System",
      description:
        "Nexus brings all lost-and-found items across the school into one organized platform. No more checking multiple offices, as everything is in one place.",
      icon: "src/assets/centralsystem.svg",
    },
    {
      title: "Sort & Filter",
      description:
        "Quickly search and filter items by category, location, and status. Find what you're looking for in seconds without unnecessary scrolling.",
      icon: "src/assets/sort.svg",
    },
    {
      title: "Secure Claim Process",
      description:
        "Items are returned to their rightful owners through a simple verification process, helping prevent false claims and ensuring security.",
      icon: "src/assets/secure.svg",
    },
    {
      title: "Built for Students",
      description:
        "Designed specifically for a school environment, Nexus makes reporting and finding items simple, accessible, and efficient.",
      icon: "src/assets/student.svg",
    },
];

function Section2() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dividerHeight, setDividerHeight] = useState(5);

  useEffect(() => {
    const updateDividerHeight = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight * 0.85);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const nextHeight = 5 + progress * 25;

      setDividerHeight((current) => {
        if (Math.abs(current - nextHeight) < 0.5) {
          return current;
        }

        return nextHeight;
      });
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateDividerHeight();
        ticking = false;
      });
    };

    updateDividerHeight();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div id="section2" ref={ref} className="section2 custom-shape-divider-top-1775339317 custom-shape-divider-bottom-1775357375">
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ height: `${dividerHeight}px` }}
        >
            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
        </svg>
        <div className="blur-circle circle1"></div>
        <h1>
            The Benefits
        </h1>
        <div className="blur-circle circle2"></div>
        <section className="why-section">
            <div className="why-container">
                {features.map((feature, index) => (
                <div className="why-card" key={index}>
                    <div className="icon-box">
                    <img src={feature.icon} alt="icon" />
                    </div>
                    <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" className="shape-fill"></path>
        </svg>
    </div>
  );
}

export default Section2;
