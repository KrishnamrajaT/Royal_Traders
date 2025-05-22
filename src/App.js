import React, { useState } from "react";
import Layout from "./Pages/Layout";
import AutoCarousel from "./Pages/Carousel";
import Cards from "./Pages/cards";
import MentorshipCard from "./Pages/MentorshipCard";
import Chatbox from "./ChatBox";
function App() {


  return (
    <Layout>
      <AutoCarousel />
      <Chatbox/>
      <MentorshipCard />
      <Cards />
    </Layout>
  );
}

export default App;
