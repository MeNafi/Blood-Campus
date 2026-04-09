import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center font-sans">
            
            {/* 1. Blood Drop Animation Container */}
            <div className="relative w-24 h-24 mb-8 flex items-end justify-center">
                
                {/* The Main Red Drop Shape (Static) */}
                <div className="absolute w-16 h-16 bg-[#e53935] rounded-full opacity-20"></div>
                
                {/* The Animating Filling Drop (Matches screenshot shape) */}
                <div className="w-16 h-16 bg-[#e53935] rounded-full rounded-t-[5px] animate-pulse-drop shadow-lg shadow-red-200">
                    
                    {/* Optional shining highlight (Small curve) */}
                    <div className="absolute top-4 left-6 w-5 h-5 border-t-4 border-l-4 border-white/40 rounded-full"></div>
                </div>
                
            </div>

            {/* 2. Text Content */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-gray-950 tracking-tight">
                    Blood<span className="text-[#e53935]">Campus</span>
                </h1>
                
                <p className="text-sm font-bold text-gray-500 uppercase tracking-[2px]">
                    Connecting Donors
                </p>
                
                <div className="flex gap-1 justify-center pt-3">
                    <div className="w-2 h-2 rounded-full bg-[#e53935] animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-[#e53935] animate-bounce delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-[#e53935] animate-bounce delay-300"></div>
                </div>
            </div>

        </div>
    );
};

export default Loading;