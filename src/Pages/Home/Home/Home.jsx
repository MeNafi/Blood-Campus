import React from "react";
import HeroSection from "../../../components/HeroSection/HeroSection";
import HomeCard from "../../../components/HomeCard/HomeCard";
import BloodFilter from "../../../components/BloodFilter/BloodFilter";
import DonorCardWide from "../../../components/DonorCardWide/DonorCardWide";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <BloodFilter></BloodFilter>
      <HomeCard></HomeCard>
      <DonorCardWide></DonorCardWide>
    </div>
  );
};

export default Home;
