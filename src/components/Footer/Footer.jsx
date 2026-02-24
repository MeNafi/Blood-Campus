import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-[#FF2C2C] text-white pt-10 pb-6">
      <div className="max-w-250 mx-auto px-4">
        
        {/* Main Grid: items-start aligns all headers to the same top level */}
        {/* gap-x-16 provides that wider space between the middle columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-10 items-start mb-12">

          {/* Column 1 — Logo + Context */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="BloodCampus" className="h-10 w-auto" />
          
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              A university-based platform enabling students and staff to 
              instantly find blood donors during emergencies through a 
              trusted campus network.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/" className="hover:opacity-75">Home</Link></li>
              <li><Link to="/dashboard" className="hover:opacity-75">Dashboard</Link></li>
              <li><Link to="/how-it-works" className="hover:opacity-75">How it works</Link></li>
              <li><Link to="/about" className="hover:opacity-75">About us</Link></li>
              <li><Link to="/contract" className="hover:opacity-75">Contract</Link></li>
            </ul>
          </div>

          {/* Column 3 — Support Center */}
          <div>
            <h3 className="text-lg font-bold mb-5">Support Center</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/help" className="hover:opacity-75">Any Help</Link></li>
              <li><Link to="/terms" className="hover:opacity-75">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:opacity-75">Privacy & Policy</Link></li>
              <li><Link to="/faqs" className="hover:opacity-75">FAQS</Link></li>
            </ul>
          </div>

          {/* Column 4 — NewsLetter */}
          <div>
            <h3 className="text-lg font-bold mb-5">NewsLetter</h3>
            <p className="mb-4 text-sm">Stay connected with campus donor updates.</p>
            
            <div className="flex h-10 mb-6">
              <input
                type="email"
                placeholder="Your mail"
                className="w-full bg-white text-black px-3 rounded-l-md outline-none text-sm"
              />
              <button className="bg-white text-[#FF2C2C] font-bold px-4 rounded-r-md border-l border-[#FF2C2C] hover:bg-gray-100 text-sm">
                Join
              </button>
            </div>

            <h4 className="text-sm font-bold mb-3">Keep In Touch</h4>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded hover:bg-white/50 transition-all text-xs">f</button>
              <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded hover:bg-white/50 transition-all text-xs">in</button>
              <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded hover:bg-white/50 transition-all text-xs">t</button>
              <button className="w-8 h-8 flex items-center justify-center bg-white/30 rounded hover:bg-white/50 transition-all text-xs font-bold">G+</button>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-xs opacity-90">
            &copy; Copyright Reserved 2026. Made by <span className="font-semibold underline">@ahsanhabib</span> and <span className="font-semibold underline">@nafi</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;