import React from 'react';
import HeroSection from '../../../components/HeroSection/HeroSection';
import Navbar from '../../../components/Navbar/Navbar';
import HomeCard from '../../../components/HomeCard/HomeCard';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <HomeCard></HomeCard>
        </div>
    );
};

export default Home;