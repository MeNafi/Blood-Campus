import React from 'react';
import DonorCardWide from './DonorCardWide'; // Importing your wide card design

const DonorLayout = ({ donors, bloodGroup = "A+" }) => {
    return (
        <section className="bg-[#FFF8F8] min-h-screen py-10 px-4 md:px-10 lg:px-20">
            <div className="max-w-5xl mx-auto">
                
                {/* 1. Header Section with Badge */}
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#E53935]">
                        {bloodGroup} List
                    </h2>
                    <span className="bg-[#66BB6A] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        available
                    </span>
                </div>

                {/* 2. Vertical List of Wide Cards */}
                <div className="flex flex-col gap-4">
                    {donors?.map((donor, index) => (
                        <DonorCardWide 
                            key={donor._id || index} 
                            donor={donor} 
                        />
                    ))}
                </div>

                {/* 3. Load More Action */}
                <div className="mt-12 flex justify-center">
                    <button className="bg-[#E53935] text-white px-10 py-3 rounded-xl font-bold text-lg hover:bg-[#C62828] transition-all shadow-md active:scale-95">
                        Load more
                    </button>
                </div>

            </div>
        </section>
    );
};

export default DonorLayout;