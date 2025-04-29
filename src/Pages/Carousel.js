import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Carousel.css"; // Create this CSS file

const bullImage = "https://cdn.magicdecor.in/com/2024/03/01154734/The-Raging-Bull-Stock-Market-Wallpaper-for-Traders.jpg";
const bullBear = "https://www.wallpaperuse.com/wallp/21-213194_m.jpg";

const cards = [
  { id: 1, bg: bullImage, title: "Assisting 5K+ Traders & counting" },
  { id: 4, bg: bullImage, title: "Learn Trading from Basics to Advance" },
  { id: 3, bg: bullImage, title: "Weekly Sessions" },
  { id: 2, bg: bullBear, title: "Make Analysis like a Pro" },
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
    <div className="carousel-container">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentIndex === index ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
          className="carousel-card"
          style={{ backgroundImage: `url(${card.bg})` }}
        >
          <div className="card-content">
            <h2>{card.title}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}