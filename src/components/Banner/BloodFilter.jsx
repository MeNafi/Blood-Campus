import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const BloodFilter = () => {
  const [activeGroup, setActiveGroup] = useState("A+");
  
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <section className="bg-[#FFF4F4] py-10 sm:py-16">
      {/* Container with responsive horizontal padding to match the Hero and Footer */}
      <div className="max-w-300 mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        
        {/* Header Section: Title and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <h2 className="text-[#FF2C2C] text-2xl sm:text-3xl font-bold">
            Blood Group Filter
          </h2>

          {/* Search Bar Container - Pill shaped with red accent */}
          <div className="relative w-full md:w-112.5">
            <input
              type="text"
              placeholder="Search Blood....."
              className="w-full pl-6 pr-14 py-3 bg-white border border-[#FF2C2C] rounded-full outline-none transition-all italic text-sm text-gray-400 placeholder:text-gray-300"
            />
            <button className="absolute right-0 top-0 h-full w-16 bg-[#FF2C2C] text-white flex items-center justify-center rounded-r-full hover:bg-red-700 transition-colors">
              <FiSearch size={22} />
            </button>
          </div>
        </div>

        {/* Blood Groups Grid */}
        {/* Mobile: 4 columns | Tablet/Desktop: 8 columns to match the row in your pic */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {bloodGroups.map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`
                py-2 sm:py-3 rounded-lg font-bold text-lg transition-all border
                ${
                  activeGroup === group
                    ? "bg-[#FF2C2C] text-white border-[#FF2C2C] shadow-md"
                    : "bg-white text-gray-700 border-[#FF2C2C] hover:bg-red-50"
                }
              `}
            >
              {group}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BloodFilter;