import React from "react";
import HeroSection from "../../../components/HeroSection/HeroSection";
import HomeCard from "../../../components/HomeCard/HomeCard";
import BloodFilter from "../../../components/BloodFilter/BloodFilter";
import FeatureSlider from "../../../components/FeatureSlider/FeatureSlider";
import UseAuth from "../../../Hook/UseAuth";
import Swal from "sweetalert2";

const Home = () => {
  const { user } = UseAuth();


  React.useEffect(() => {
    if (user) return;
    const timer = setTimeout(() => {

      Swal.fire({
        icon: "info",
        title: "Login to find blood",
        text: "Sign in with university email to contact donors instantly.",
        confirmButtonColor: "#FF2C2C",
      });
    }, 6500);

    return () => clearTimeout(timer);
  }, [user]);


  return (
    <>
      <HeroSection />
      <BloodFilter />
      <FeatureSlider />
      <HomeCard />
    </>
  );
};


export default Home;
