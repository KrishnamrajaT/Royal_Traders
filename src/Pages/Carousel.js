import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bullImage =
  "https://cdn.magicdecor.in/com/2024/03/01154734/The-Raging-Bull-Stock-Market-Wallpaper-for-Traders.jpg";
const bullBear = "https://www.wallpaperuse.com/wallp/21-213194_m.jpg";

const cards = [
  { id: 1, bg: bullImage, title: "Learn Trading" },
  { id: 2, bg: bullBear, title: "Daily Analysis" },
  { id: 3, bg: bullImage, title: "Zoom Sessions" },
  { id: 4, bg: bullBear, title: "Risk Management" },
];

export default function AutoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="carousel-container"
      style={{
        width: "100%",
        height: "400px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="carousel-card"
          style={{
            backgroundImage: `url(${card.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          <div className="card-content">
            <h2>{card.title}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
