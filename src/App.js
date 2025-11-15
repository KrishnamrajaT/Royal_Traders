import React, { useState, useEffect } from "react";
import Layout from "./Pages/Layout";
import AutoCarousel from "./Pages/Carousel";
import Cards from "./Pages/cards";
import MentorshipCard from "./Pages/MentorshipCard";
import Chatbox from "./ChatBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReviewPage from "./Pages/Reviews/ReviewPage";
function App() {
  const [priceValues, setPriceValues] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
let API_URL = "https://royal-traders-5euy.vercel.app/pricelabel";
  useEffect(() => {
    const fetchPrice = async () => {
      setLoadingPrice(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        // API returns an array; take first element if present
        setPriceValues(Array.isArray(data) && data.length ? data[0] : data);
      } catch (err) {
        console.error("Failed to fetch price label:", err);
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPrice();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Index route - displays all components within Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <AutoCarousel />
              <Chatbox />
              <MentorshipCard priceValues={priceValues} loadingPrice={loadingPrice} />
              <Cards />
            </Layout>
          }
        />

        {/* Review page route - also within Layout */}
        <Route
          path="/review"
          element={
            <Layout>
              <ReviewPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
