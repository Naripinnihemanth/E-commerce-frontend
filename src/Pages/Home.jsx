import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../index.css";
import IntroCard from "../Components/IntroCard";
import Trending from "../Components/Trending";
function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>
      <IntroCard></IntroCard>
      <Trending></Trending>
    </div>
  );
}

export default Home;
