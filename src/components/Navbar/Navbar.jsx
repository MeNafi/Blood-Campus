import React from 'react';
import { Link, useNavigate } from 'react-router';
import { IoSettingsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// Replace this with your actual logo path
import logo from "../../assets/logo_Grp.png"; 

const Navbar = () => {
    const navigate = useNavigate();

    // Navigation links array
    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'My Profile', path: '/profile' },
        { name: 'Request', path: '/request' },
        { name: 'About', path: '/about' },
    ];

    const handleLogout = () => {
        // Add your logout logic here (clear tokens, etc.)
        console.log("Logged out");
        navigate('/login');
    };

    return (
        <nav className="bg-[#e53935] px-6 py-3 md:px-12 flex items-center justify-between shadow-md">
            
            {/* Left: Logo and Brand Name */}
            <div className="flex items-center gap-3">
                <img 
                    src={logo} 
                    alt="BloodCampus Logo" 
                    className="h-10" // Using filters to make logo white like the screenshot
                />
               
            </div>

            {/* Middle: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="text-white text-base font-semibold hover:opacity-80 transition-opacity"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right: Icons and Logout */}
            <div className="flex items-center gap-5">
                {/* Settings Icon */}
                <button className="text-white text-2xl hover:scale-110 transition-transform">
                    <IoSettingsOutline />
                </button>

                {/* Profile Icon */}
                <button className="text-white text-3xl hover:scale-110 transition-transform">
                    <IoPersonCircleOutline />
                </button>

                {/* Logout Button */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white text-[#e53935] px-5 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-gray-100 transition-colors"
                >
                    <MdLogout className="text-lg" />
                    Logout
                </button>
            </div>

        </nav>
    );
};

export default Navbar;