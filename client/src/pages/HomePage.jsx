import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import ShowProduct from "../components/ShowProduct";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Home />
      <ShowProduct />
    </div>
  );
}

export default HomePage;
