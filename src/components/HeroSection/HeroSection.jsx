import React from 'react';
// These imports are correct, now we actually use them!
import logo from "../../assets/logo_Grp.png";
import bgImage from "../../assets/main_big_pic.png";

const HeroSection = () => {
    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat relative font-sans"
            // FIXED: Use the 'bgImage' variable from your import here
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* 2. Frosted Glass Overlay (Glassmorphism) */}
            {/* Added inset-0 to ensure it covers the whole background */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[6px] z-10 flex items-center justify-center">
                
                {/* 3. Text & CTA Section */}
                <div className="text-center px-6 md:px-0 max-w-5xl space-y-8 z-20">
                    
                    <h1 className="text-4xl md:text-7xl font-black text-gray-950 leading-[1.1] tracking-tight">
                        Find <span className="text-red-600">Blood Donors</span> Instantly<br />
                        On Your <span className="text-red-600">Campus</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto font-medium leading-relaxed">
                        A centralized network for the Daffodil International University community. 
                        Connect with verified student donors in minutes.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
                        <button className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white rounded-2xl text-sm font-black uppercase tracking-[2px] shadow-[0_10px_25px_-5px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            Find Blood Now
                        </button>
                        
                        <button className="w-full sm:w-auto px-10 py-5 bg-gray-950 text-white rounded-2xl text-sm font-black uppercase tracking-[2px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-black transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            Register as Donor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;