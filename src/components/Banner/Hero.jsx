import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/mainbg.png";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Content Container */}
      {/* max-w-300 ensures it aligns with your Navbar/Footer */}
      <div className="relative w-full max-w-300 mx-auto px-6 sm:px-12 md:px-16 lg:px-24 py-12">
        <div className="max-w-4xl text-left">
          
          {/* Heading - Increased mobile sizes from 2xl to 4xl/5xl */}
          <h1 className="text-black font-bold leading-[1.1] text-4xl sm:text-5xl md:text-6xl lg:text-[60px]">
            <span className="lg:whitespace-nowrap">
              Find <span className="text-[#FF2C2C]">Blood</span> Donors{" "}
              <span className="text-[#FF2C2C]">Instantly</span>
            </span>
            <br />
            On Your <span className="text-[#FF2C2C]">Campus</span>
          </h1>

          {/* Buttons - Stack on mobile, side-by-side on sm screens */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/find-blood"
              className="bg-[#FF2C2C] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-md text-center"
            >
              Find Blood Now
            </Link>

            <Link
              to="/register"
              className="bg-[#FF2C2C] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-md text-center"
            >
              Register as Donor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;