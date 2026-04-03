import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import HomeCard from './HomeCard'; 

const DonorListLayoutHome = ({ donors }) => {
    return (
        <section className="bg-[#fcfcfc] py-16 px-6 md:px-12 lg:px-20 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* 1. Section Heading */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                        Donor List
                    </h2>
                </div>

                {/* 2. Grid and Navigation Container */}
                <div className="flex items-center gap-2 md:gap-6">
                    
                    {/* 3. The Responsive Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
                        {/* We map through the donors and pass data to your HomeCard */}
                        {donors?.map((donor) => (
                            <HomeCard 
                                key={donor._id || donor.studentId} 
                                donor={donor} 
                            />
                        ))}
                    </div>

                    {/* 4. Side Navigation Arrow */}
                    <div className="hidden lg:flex items-center justify-center cursor-pointer group">
                        <FiChevronRight className="text-5xl text-[#E53935] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonorListLayoutHome;