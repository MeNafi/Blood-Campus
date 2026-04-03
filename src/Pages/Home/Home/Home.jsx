import React from 'react';
import HeroSection from '../../../components/HeroSection/HeroSection';
import Navbar from '../../../components/Navbar/Navbar';
import HomeCard from '../../../components/HomeCard/HomeCard';
import BloodFilter from '../../../components/BloodFilter/BloodFilter';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <BloodFilter></BloodFilter>
            <HomeCard></HomeCard>
        </div>
    );
};

export default Home;