import Hero from "../components/Banner/Hero";
import BloodFilter from "../components/Banner/BloodFilter";
import EmergencyBanner from "../components/Banner/EmergencyBanner";

const Home = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <BloodFilter />
      <EmergencyBanner />
    </div>
  );
};

export default Home;