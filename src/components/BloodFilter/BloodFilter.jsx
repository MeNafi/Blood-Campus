
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BloodFilter = ({ onFilterChange, onSearchChange }) => {
    const [activeGroup, setActiveGroup] = useState('A+');
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    
    const handleGroupClick = (group) => {
        setActiveGroup(group);
        if (onFilterChange) onFilterChange(group);
    };

    
    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            {/* Top Row: Title and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#E53935]">
                    Blood Group Filter
                </h2>

                {/* Search Bar Container */}
                <div className="relative w-full md:w-96 group">
                    <input
                        type="text"
                        placeholder="Search Blood......"
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="w-full h-10 pl-4 pr-12 rounded-full border border-[#E53935] text-sm outline-none focus:ring-2 focus:ring-red-100 transition-all"
                    />
                    <button className="absolute right-0 top-0 h-full w-12 bg-[#E53935] rounded-r-full flex items-center justify-center text-white hover:bg-[#C62828] transition-colors">
                        <FaSearch className="text-sm" />
                    </button>
                </div>
            </div>

            {/* Bottom Row: Blood Group Tags */}
            <div className="flex flex-wrap items-center gap-3">
                {bloodGroups.map((group) => (
                    <button
                        key={group}
                        onClick={() => handleGroupClick(group)}
                        className={`
                            px-6 py-2 rounded-xl font-bold text-lg transition-all duration-300 border
                            ${activeGroup === group 
                                ? 'bg-[#E53935] text-white border-[#E53935] shadow-md scale-105' 
                                : 'bg-white text-gray-700 border-[#E53935] hover:bg-red-50'
                            }
                        `}
                    >
                        {group}
                    </button>
                ))}
            </div>
        </div>
    );

};

export default BloodFilter;