import { useEffect, useRef, useState } from "react";

type Pixel = {
  x: number;
  y: number;
  finalColor?: string;
};

const pixels: Pixel[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 3, y: 0 },
  { x: 1, y: 1, finalColor: "#f28c28" },
  { x: 2, y: 2 },
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 0, y: 4 },
  { x: 2, y: 4, finalColor: "#2c6bdff7" },
];

const getPixelFill = (progress: number, pixel: Pixel) => {
  const activationPoint = -0.22 + pixel.y * 0.09 + pixel.x * 0.04;
  const stageValue = (progress - activationPoint) / 0.08;

  if (stageValue >= 3) {
    return pixel.finalColor ?? "#000000";
  }

  if (stageValue >= 2) {
    return "#555555";
  }

  if (stageValue >= 1) {
    return "#bdbdbd";
  }

  return "#f5f5f5";
};

export default function PixelDivider() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight - 35;
      const end = -rect.height - 40;
      const rawProgress = (start - rect.top) / (start - end);
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress((current) => {
        if (Math.abs(current - nextProgress) < 0.01) {
          return current;
        }

        return nextProgress;
      });
    };

    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        overflow: "hidden",
        padding: "0",
        lineHeight: 0,
        backgroundColor: "#f5f5f5",
      }}
    >
      <svg
        viewBox="0 0 5 5"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          height: "100px",
        }}
      >
        {pixels.map((pixel, index) => (
          <rect
            key={`${pixel.x}-${pixel.y}-${index}`}
            x={pixel.x}
            y={pixel.y}
            width="1.001"
            height="1.001"
            fill={getPixelFill(scrollProgress, pixel)}
          />
        ))}
      </svg>
    </div>
  );
}
