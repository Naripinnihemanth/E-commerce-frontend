import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../index.css";
import Message from "../Components/Message";
import IntroCard from "../Components/IntroCard";
import Trending from "../Components/Trending";
import Recomendations from "../Components/Recomendations";
import ComponentProtect1 from "../Components/ComponentProtect1";
import Footer from "../Components/Footer";
import History from "../Components/History";
function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>
      <IntroCard></IntroCard>
      <ComponentProtect1>
        <Recomendations></Recomendations>
      </ComponentProtect1>
      <Trending></Trending>
      <ComponentProtect1>
        <History></History>
      </ComponentProtect1>
      <Footer></Footer>
    </div>
  );
}

export default Home;
