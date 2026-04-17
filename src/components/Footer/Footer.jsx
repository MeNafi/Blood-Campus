import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo_Grp.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="BloodCampus Logo" className="h-10 w-auto" />
            <p className="mt-4 text-sm text-white/90">
              Blood Campus is a university-based platform for finding trusted donors during emergencies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/donor-list">Dashboard</Link></li>
              <li><Link to="/donor-register">How it works</Link></li>
              <li><Link to="/">About us</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support Center</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li><a href="/">Any Help</a></li>
              <li><a href="/">Terms & Conditions</a></li>
              <li><a href="/">Privacy & Policy</a></li>
              <li><a href="/">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">NewsLetter</h3>
            <p className="mt-2 text-sm text-white/90">Stay connected with campus donor updates.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your mail"
                className="w-full rounded-l-lg border-none bg-white px-3 py-2 text-sm text-gray-700 outline-none"
              />
              {/* The Separator Line */}
  
             <button className="bg-primary border border-white/20 rounded-r-2xl px-6 py-2 text-sm font-bold text-white transition-all hover:bg-red-600 hover:border-white/40 active:scale-95 shrink-0">
  Join
</button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href="/" className="rounded bg-white/20 p-2"><FaFacebookF size={14} /></a>
              <a href="/" className="rounded bg-white/20 p-2"><FaLinkedinIn size={14} /></a>
              <a href="/" className="rounded bg-white/20 p-2"><FaTwitter size={14} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm text-white/90">
          <p>2026 All rights reserved.</p>
          <p className="mt-1">
            Develop By{" "}
            <a className="underline" href="https://github.com/ahsanrafi501" target="_blank" rel="noreferrer">
              Ahsan Habib
            </a>{" "}
            and{" "}
            <a className="underline" href="https://github.com/MeNafi" target="_blank" rel="noreferrer">
              MeNafi
            </a>{" "}
            | Design by{" "}
            <a className="underline" href="https://www.behance.net/NayeefsarkerNafi" target="_blank" rel="noreferrer">
              N A F I
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
