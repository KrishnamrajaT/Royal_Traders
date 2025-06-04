import React, { useState } from "react";
import Layout from "./Pages/Layout";
import AutoCarousel from "./Pages/Carousel";
import Cards from "./Pages/cards";
import MentorshipCard from "./Pages/MentorshipCard";
import Chatbox from "./ChatBox";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewPage from "./Pages/ReviewPage";
import LocationComponent from "./Pages/GetUserLocation";
function App() {


    return (
    <Router>
      <Routes>
        {/* Index route - displays all components within Layout */}
        <Route path="/" element={
          <Layout>
            <AutoCarousel />
            <Chatbox />
            <MentorshipCard />
            <Cards />
            <LocationComponent/>
          </Layout>
        } />
        
        {/* Review page route - also within Layout */}
        <Route path="/review" element={
          <Layout>
            <ReviewPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
