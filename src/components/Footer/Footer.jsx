import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGooglePlusG } from 'react-icons/fa';
import logo from "../../assets/logo_Grp.png"; // Use your actual logo path

const Footer = () => {
    return (
        <footer className="bg-[#E53935] text-white py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Column 1: Brand & About */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-12" 
                        />
                    </div>
                    <p className="text-sm leading-relaxed opacity-90 text-justify">
                        Blood Campus is a university-based platform that enables students, teachers, and staff to instantly find blood donors during emergencies. Users register with verified university emails, set their blood group and availability, and connect securely through a privacy-controlled contact system creating a trusted campus donor network.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="lg:ml-10">
                    <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-sm opacity-90">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Dashboard</a></li>
                        <li><a href="#" className="hover:underline">How it works</a></li>
                        <li><a href="#" className="hover:underline">About us</a></li>
                        <li><a href="#" className="hover:underline">Contract</a></li>
                    </ul>
                </div>

                {/* Column 3: Support Center */}
                <div>
                    <h3 className="text-xl font-bold mb-6">Support Center</h3>
                    <ul className="space-y-4 text-sm opacity-90">
                        <li><a href="#" className="hover:underline">Any Help</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">Privacy & Policy</a></li>
                        <li><a href="#" className="hover:underline">FAQS</a></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter & Socials */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold">NewsLetter</h3>
                    <p className="text-sm opacity-90">
                        Stay connected with campus donor updates.
                    </p>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Your mail" 
                            className="w-full py-3 px-4 rounded-lg text-gray-800 outline-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">Keep In Touch</h4>
                        <div className="flex gap-3">
                            {/* Social Icons with colored backgrounds matching your screenshot */}
                            <a href="#" className="w-10 h-10 bg-[#3b5998] flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#0077b5] flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                                <FaLinkedinIn />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#55acee] flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 bg-[#dd4b39] flex items-center justify-center rounded hover:opacity-80 transition-opacity">
                                <FaGooglePlusG className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Optional Copyright line */}
            <div className="mt-16 pt-8 border-t border-white/20 text-center text-xs opacity-70">
                © {new Date().getFullYear()} BloodCampus DIU. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;