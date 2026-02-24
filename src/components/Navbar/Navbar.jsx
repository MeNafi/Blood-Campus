
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-[#FF2C2C] w-full">
      {/* Container with extra wide padding (lg:px-24) to match the Hero/Filter alignment in your pics */}
      <div className="max-w-360 mx-auto px-6 sm:px-12 md:px-16 lg:px-24 py-4">
        
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="BloodCampus Logo"
              className="h-8 sm:h-10 md:h-12 object-contain"
            />
           
          </Link>

          {/* Buttons Section */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/signin"
              className="bg-white text-[#FF2C2C] font-bold px-5 sm:px-7 md:px-9 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              style={{ borderRadius: "10px" }} 
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="bg-white text-[#FF2C2C] font-bold px-5 sm:px-7 md:px-9 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              style={{ borderRadius: "12px" }} // Specific 12px radius as requested
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;