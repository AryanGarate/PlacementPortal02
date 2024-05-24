import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import PopularCompaines from "./PopularCompaines";
import { Context } from "../..";
import PreviousBatch from "./PreviousBatch";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section>
        <HeroSection />
        <PopularCompaines />
        <PreviousBatch />
      </section>
    </>
  );
};

export default Home;
