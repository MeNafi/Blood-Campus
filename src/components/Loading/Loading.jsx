import React from "react";
import logo from "../../assets/logo_Grp.png";

const Loading = () => {

  return (

    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center font-sans">
      <div className="relative w-24 h-24 mb-8 flex items-end justify-center">
        <div className="absolute w-16 h-16 bg-[#e53935] rounded-full opacity-20"></div>
        <div className="w-16 h-16 bg-[#e53935] rounded-full rounded-t-[5px] animate-pulse-drop shadow-lg shadow-red-200">
          <div className="absolute top-4 left-6 w-5 h-5 border-t-4 border-l-4 border-white/40 rounded-full"></div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <img src={logo} alt="BloodCampus Logo" className="mx-auto h-11 w-auto" />

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
