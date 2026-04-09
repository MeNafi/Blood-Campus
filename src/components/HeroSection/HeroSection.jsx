import React from 'react';
import { useNavigate, Link } from 'react-router'; 
import bgImage from "../../assets/main_big_pic.png";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat relative font-sans"
            // background image
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* 1. Transparent Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                
                {/* 2. Content: Fully responsive for all device sizes */}
                <div className="text-center w-full max-w-5xl z-20">
                    
                    {/* 3. Heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tighter mb-8">
                        Find <span className="text-[#E53935]">Blood Donors</span> Instantly <br/>
                        On Your <span className="text-[#E53935]">Campus</span>
                    </h1>

                    {/* 4. Buttons: Stacked on mobile, side-by-side on desktop */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        
                        {/* Find Blood Button */}
                        <button 
                            onClick={() => navigate('/find-blood')}
                            className="w-full sm:w-auto px-7 py-3 bg-[#DB4437] text-white rounded-lg text-lg font-bold hover:bg-red-700 transition-transform active:scale-95 shadow-md"
                        >
                            Find Blood Now
                        </button>
                        
                        {/* Register Link  */}
                        <Link 
                            to={'/donor-register'} 
                            className="w-full sm:w-auto px-7 py-3 bg-[#DB4437] text-white rounded-lg text-lg font-bold hover:bg-red-700 transition-transform active:scale-95 shadow-md text-center"
                        >
                            Register as Donor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;