import React from "react";
import Hero from "./Components/Hero";
import Banner from "./Components/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts";
import NewsTeller from "../../Components/NewsTeller";

const Main = () => {
  return (
    <>
      <Hero />
      <Banner />
      <FeaturedProducts Heading={"NEW COLLECTION"} />
      <NewsTeller />
    </>
  );
};

export default Main;
